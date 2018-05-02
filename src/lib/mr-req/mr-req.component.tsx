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
    req?: iMrReq;
    result?: any;
    className?: string;
    style?: React.CSSProperties;

    // resource pool
    pool?: any;

    // 容器高度 height: 100%
    h100?: boolean;

    // 数据传递到子元素的 props key
    transmit?: string | string[];

    // 是否强制刷新
    force?: boolean
}

/**
 * 仅对 MrResource 支持的一种异步加载方式
 */

export default class MrReq extends React.Component<MrReqProps, {}> {

    state: any = {
        loaded: false
    };

    _data: any[];

    // 标记标明当前 component mount 状态，避免 unmounted 的时候 setState
    _isMounted: boolean = true;

    getRequest(props) {

        /**
         * pool: Resource pool (resources)
         * resource: 单个资源 （single resource)
         */

        let {req, pool, result, transmit} = props;

        mu.run(req, () => {
            pool = pool || MrServices.getResourcePool();

            let {method = 'post', payload = {}, search = {}, transform, dataPath, resource} = req;

            dataPath = mu.ifnvl(dataPath, 'data');

            method = method.toLowerCase();

            // 调用距离越近，权限越大
            // prop.resource > pool[api]
            resource = mu.ifempty(resource, pool[req.api]);

            mu.run(resource, (_resource) => {
                let _promise = _resource[method](search, payload);
                _promise.then((res) => {
                    // 根据 req.dataPath 从数据源中截取数据
                    let data = dataPath === '::res' ? res : _.get(res, dataPath);

                    // 通过Req.transform 处理数据后返回给 transmit && result
                    this._data = transform ? transform(data) : data;

                    // 向子组件传递数据，渲染组件，激活子组件获取数据
                    transmit && this.forceUpdate();

                    // 回调函数，向父组件传递数据
                    result && result(this._data);
                });
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

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.req, this.props.req);
    }

    componentWillMount() {
        this.getRequest(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(nextProps.req, this.props.req)){
            this.getRequest(nextProps);
        }
    }

    componentWillUnmount() {
        // this._isMounted = false;
        // 将 setState 设置成空函数
        // 避免 unmounted 的时候 setState
        this.setState = ()=> void 0;
        this.forceUpdate = ()=> void 0;
    }

    render() {
        let {className, h100, style} = this.props;
        let {data} = this.state;

        const cls = MrServices.cls({
            'mr-req': true,
            'h-100-i': h100
        }, className);

        let children = this.transmit(this._data);
        return (<div className={cls} style={style}>{children}</div>);
    }
}
