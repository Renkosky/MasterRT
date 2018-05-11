/**
 * MrReq
 *
 * @update mizi.lin@20180426
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
 * 添加showComponentUpdate, 对req未产生变化，阻止渲染, 便于数据传递给子组件
 * 同时添加force模式，若 force = true, 则阻止失效
 *
 *
 *
 * @todo immutable 使用持久化数据 加快判断 showComponentUpdate, 进行性能优化
 */

import * as React from 'react';
import * as mu from 'mzmu';
import MrServices from '../common/mr.services';
import * as _ from 'lodash';

interface iMrReq {
    // resource
    resource?: any;
    // map
    api?: string,
    // default 'post'
    method?: string,
    // post payload
    payload?: any,
    // url search
    search?: any,
    // 数据处理
    transform?: any,
    // data key, default 'data'
    dataPath?: string
}

interface MrReqProps {
    req?: iMrReq | iMrReq[];
    result?: any;

    // resource pool
    pool?: any;

    // 数据传递到子元素的 props key
    transmit?: string | string[];

    /**
     * force?: boolean = ifnvl(null, false)
     * 是否解除 MrReq设计req未产生变化阻止渲染的行为
     *
     * @values true ::-> 解除阻止渲染
     */
    force?: boolean
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

    // 标记标明当前 component mount 状态，避免 unmounted 的时候 setState
    _isMounted: boolean = true;

    getRequest(props): void {

        /**
         * pool: Resource pool (resources)
         * resource: 单个资源 （single resource)
         */

        let {req, pool, result, transmit} = props;
        let promises: any[];
        pool = pool || MrServices.getResourcePool();

        if(!req) {
            return void 0;
        }

        req = mu.isObject(req) ? [req] : req;
        promises = mu.map(req, (one) => {
            return this.oneReq(pool, one);
        });

        Promise.all(promises).then((res) => {
            this._data = res.length === 1 ? res[0] : res;
            transmit && this.forceUpdate();
            result && result(this._data);
        });
    }

    /**
     * 单条Req数据处理
     */
    oneReq(pool, req) {

        let {method = 'post', payload = {}, search = {}, transform, dataPath, resource} = req;
        dataPath = mu.ifnvl(dataPath, 'data');
        method = method.toLowerCase();

        // 调用距离越近，权限越大
        // prop.resource > pool[api]
        resource = mu.ifempty(resource, pool[req.api]);

        return mu.run(resource, (_resource) => {
            let _promise = _resource[method](search, payload);
            return _promise.then((res) => {
                // 根据 req.dataPath 从数据源中截取数据
                let data = dataPath === '::res' ? res : _.get(res, dataPath);
                data = transform ? transform(data) : data;
                return data;
            });
        });

    }

    // 暗暗的传给子元素，实现父元素reload
    _childEmitReload: any = mu.bind((fn) => {
        let res = fn();
        if(res === true){
            this.getRequest(this.props);
        }
    }, this);

    // _reload(fn) {
    //     let vm = this;
    //     console.log(':::::::', 'children bind fn', arguments);
    //
    //     let res = fn();
    //
    //     console.debug(vm);
    //
    //     // this.getRequest(vm);
    // }

    // 向子元素传递数据
    transmit(data) {
        let {transmit, children} = this.props;
        if(React.Children.count(children)){
            mu.run(transmit, (key) => {
                children = React.Children.map(children, (col: any) => {
                    if(col && typeof col.type === 'function') {
                        let _props = {};
                        // todo 条件组件判断
                        _.set(_props, `_gene.${key}`, mu.ifnvl(_.get(col, `props._gene.${key}`), data));
                        _.set(_props, key, mu.ifnvl(_.get(col, `props.${key}`), data));
                        _.set(_props, '_mrReqReload', this._childEmitReload);

                        return React.cloneElement(col, _props);
                    } else {
                        return col;
                    }
                });
            });
            return children;
        }

        return children;
    }

    state: any = {
        loaded: false
    };


    componentWillMount() {
        this.getRequest(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(nextProps.req, this.props.req)){
            this.getRequest(nextProps);
        }
    }

    shouldComponentUpdate(nextProps) {
        let {force} = this.props;
        return force || !_.isEqual(nextProps.req, this.props.req);
    }

    componentWillUpdate(props){
        // console.debug(props);
    }

    componentWillUnmount() {
        // this._isMounted = false;
        // 将 setState 设置成空函数
        // 避免 unmounted 的时候 setState
        this.setState = ()=> void 0;
        this.forceUpdate = ()=> void 0;
    }

    render() {
        let children = this.transmit(this._data) || null;
        return (<React.Fragment>{children}</React.Fragment>);
    }
}
