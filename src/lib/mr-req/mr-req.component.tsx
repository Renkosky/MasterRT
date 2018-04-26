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
    transmit?: string;
}

/**
 * 仅对 MrResource 支持的一种异步加载方式
 */
export default class MrReq extends React.Component<MrReqProps, {}> {

    state: any = {
        data: []
    };

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
                    let data = dataPath === '::res' ? res : _.get(res, dataPath);

                    data = transform ? transform(data) : data;

                    transmit && this.setState({
                        data
                    });

                    result && result(data);
                });
            });
        });
    }

    // 向子元素传递数据
    transmit(data) {
        let {transmit, children} = this.props;
        if(React.Children.count(children)){
            mu.run(transmit, (key) => {
                children = React.Children.map(children, (col: any) => {
                    return (col.props && _.isNil(col.props[key])) ? React.cloneElement(col, {
                        [key]: data
                    }) : col;
                });
            });
            return children;
        }

        return children;
    }

    componentWillMount() {
        this.getRequest(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getRequest(nextProps);
    }

    componentWillUnmount() {
        // this._isMounted = false;

        // 将 setState 设置成空函数
        // 避免 unmounted 的时候 setState
        this.setState = ()=> void 0;
    }

    render() {
        let {className, h100, style} = this.props;
        let {data} = this.state;

        const cls = MrServices.cls({
            'mr-req': true,
            'h-100-i': h100
        }, className);

        let children = this.transmit(data);

        return (<div className={cls} style={style}>{children}</div>);
    }
}
