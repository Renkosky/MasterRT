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
