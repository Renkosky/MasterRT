/**
 * MrReq
 *
 * @update mizi.lin@v1.20180426
 * fixed bugs:  Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component.
 * 大概的意思是：只能更新已安装或安装的组件。这通常意味着您在卸载的组件上调用setState、replaceState或forceUpdate。
 * 原因：在parent 重新渲染时，子元素为卸载状态（componentWillUnmount），
 *      而此时 ajax 异步回调执行 setState，重新渲染该component,
 *      但是 该component 已卸载，不能正常渲染，从而报错
 * 解决方案：1. 添加标记 _isMounted，标明component mount状态
 *          2. 设置setState为空函数，避免调用
 *
 * @update mizi.lin@20180508
 *
 * ::=> 添加showComponentUpdate, 对req未产生变化，阻止渲染, 便于数据传递给子组件
 * ::=> 同时添加force模式，若 force = true, 则阻止失效
 *
 *
 *
 * @update mizi.lin@v0.1.20.20180515
 * ::=> 添加对子元素为函数的支持，可以传递更多的对象
 * ::=> 重写transmit获取相应数据方式，从req中移除dataPath属性
 * ::=> 支持多个请求 req: iMrReq | iMrReq[]
 *
 * @update mizi.lin@v0.1.23.20180521
 * ::=> 支持loader && nodata
 * ::=> 添加属性 data
 * ::=> 修改start获得方式
 *
 * @update mizi.lin@v0.1.25.20180524
 * ::=> 修改向MrProcess传递data属性错误的问题
 *
 * @todo immutable 使用持久化数据 加快判断 showComponentUpdate, 进行性能优化
 * @todo 可以分别设置各种method下的headers
 * @todo 梳理支持多req的nodata
 */

import * as React from 'react';
import * as mu from 'mzmu';
import MrServices from '../mr-common/mr.services';
import * as _ from 'lodash';
import MrProcess from '../mr-process/mr-process.component';

interface MrIResource {

    /**
     * resource: Pool<MrResource>
     * 一个pool的资源
     *
     * resource = pool[api]
     */
    resource?: any;

    /**
     * api?: string
     * resource.name
     */
    api?: string,

    /**
     * method?: string = 'post'
     * resource.method
     * @values post, put, patch, get, delete, mrdown, download
     */
    method?: string,

    /**
     * payload?: object
     * post request payload
     */
    payload?: object,

    /**
     * search?: object
     * get request params
     */
    search?: any,

    /**
     * transform?: function(res)
     * 返回数据处理
     */
    transform?: any,
}

interface MrReqProps {
    /**
     * MrResource
     * 请求接口
     *
     * 与data二者存一，若共存 req > data
     */
    req?: MrIResource | MrIResource[];

    /**
     * pool?: MrResource
     * 连接池
     * @match 就近原则 >> MrServices.getResourcePool()
     */
    pool?: any;

    /**
     * data: any
     * 接受直接数据
     *
     * 与req二者存一，若共存 req > data
     */
    data?: any;

    /**
     * transmit?: string | string[] = ['data:res.data'];
     * 基因遗传方式
     *
     * @values {string}
     * ::=> child.prop:_.get({res}, path)
     * ::=> 要传递给子元素的 prop : 取值路径
     */
    transmit?: string | string[];

    /**
     * transform?: function
     * 数据处理
     * 区别于 req.transform,  req.transform 用于单个请求，而 transform 用于所有请求
     * @v0.1.20.20180515
     */
    transform?: any;

    /**
     * force?: boolean = ifnvl(null, false)
     * 是否解除 MrReq设计req未产生变化阻止渲染的行为
     *
     * @values true ::-> 解除阻止渲染
     * @v0.1.20.20180515
     */
    force?: boolean;

    /**
     * result?: function(res);
     * 返回调用
     *
     * @mark 注意，当只有一个返回值得时候，返回对象 res = res[0]
     */
    result?: any;
}

export default class MrReq extends React.Component<MrReqProps, {}> {
    render() {
        let {children, ...props} = this.props;
        /**
         * props clone 方便在MrReqInner进行req比较
         * 阻止 MrReqInner 多次渲染，而造成多次Ajax请求
         */
        props = mu.clone(props);
        return (
            <MrReqInner {...props}>{children}</MrReqInner>
        );
    }
}

/**
 * 仅对 MrResource 支持的一种异步加载方式
 */

export class MrReqInner extends React.Component<MrReqProps, {}> {

    _data: any[];

    _start: number = 0;

    /**
     * 单条Req数据处理
     */
    oneRequest(pool, req): Promise<any> {
        let {method = 'post', payload = {}, search = {}, transform, resource} = req;
        method = method.toLowerCase();

        // 调用距离越近，权限越大
        // prop.resource > pool[api]
        resource = mu.ifempty(resource, pool[req.api]);

        return mu.run(resource, () => {
            let action = resource[method];
            let $promise = action(search, payload);
            return $promise.then((res) => {
                return transform ? transform(res) : res;
            });
        });
    }

    getRequests(props): void {
        /**
         * pool: Resource pool (resources)
         * resource: 单个资源 （single resource)
         */
        let {req, pool, result, transmit, data} = props;
        let $promises: Promise<any>[];

        console.debug(data);

        if(mu.isEmpty(req)){
            this._data = data;
            this._start = 100;
            return void 0;
        } else {
            this._data = void 0;
            this._start = 0;
        }

        pool = pool || MrServices.getResourcePool();

        req = MrServices.upArray(req);

        $promises = mu.map(req, (one) => {
            return this.oneRequest(pool, one);
        });

        Promise.all($promises).then((res) => {
            this._data = req.length == 1 ? res[0] : res;
            this._start = 100;
            result && result(this._data);
            this.transmit();
            this.forceUpdate();
        }).catch((error) => {
            this._gene = null;
            this.forceUpdate();
            result && result(null);
            return Promise.reject(error);
        });
    }

    _transmit: any;

    /**
     * 基因片段路径
     * @return {any}
     */
    transmit(): any {
        let {transmit = ['data:res.data'], req} = this.props;
        let res = this._data;

        let transmits = MrServices.upArray(transmit);

        transmits = mu.map(transmits, (item) => {
            let [name, path = 'res.data'] = item.split(':');
            let data = _.get({res}, path);
            return {
                name,
                path,
                data
            };
        });

        this._transmit = transmits;
    }

    /**
     * 获取基因信息
     */
    _gene: any;
    getGene(res) {
        let wrapper = {res};
        return mu.map(this._transmit, (transmit) => {
            let {name, path} = transmit;
            return {
                __key__: name,
                __val__: _.get(wrapper, path)
            };
        }, {});
    }

        // 暗暗的传给子元素，实现父元素reload
    _childEmitReload: any = mu.bind((fn) => {
        let res = fn();
        if (res === true) {
            this.getRequests(this.props);
        }
    }, this);

    // 基因片段传递
    inheritance(res) {

        // 数据不存在不予传递信息
        if(mu.isNotExist(res)) {
            return null;
        }

        let {children, transform} = this.props;
        res = transform ? transform(res) : res;
        let gene = this.getGene(res);

        // todo 重新梳理gene传递信息值得计算
        this._gene = gene;

        if(mu.isNotExist(children)) {
            return null;
        }

        if (typeof children === 'function') {
            return (children as any)(gene);
        }

        if(!React.Children.count(children)){
            return null;
        }

        return React.Children.map(children, (col: any) => {
            if(!col) {
                return null;
            }

            if(typeof col.type === 'function'){
                let props: any = {};
                props = mu.extend(true, {}, props, gene);
                props._gene = gene;
                props['_mrReqReload'] = this._childEmitReload;
                props = mu.extend(true, props, col.props || {});
                return React.cloneElement(col, props);
            }

            return col;
        });
    }

    state: any = {
    };

    componentWillMount() {
        this.getRequests(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.req, this.props.req)) {
            this.getRequests(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {force} = this.props;
        return force || !_.isEqual(nextProps.req, this.props.req) || !_.isEqual(nextState, this.state);
    }

    componentWillUpdate(props) {
        // console.debug(props);
    }

    componentWillUnmount() {
        // this._isMounted = false;
        // 将 setState 设置成空函数
        // 避免 unmounted 的时候 setState
        this.setState = () => void 0;
        this.forceUpdate = () => void 0;
    }

    render() {
        let children = this.inheritance(this._data) || null;
        let datas = mu.map(this._transmit || [], (o) => o.data);
        let data = this._transmit ? (datas.length === 1 ? datas[0] : datas) : this._data;

        return (<React.Fragment>
            <MrProcess start={this._start} data={data}>
                {children}
            </MrProcess>
        </React.Fragment>);
    }
}
