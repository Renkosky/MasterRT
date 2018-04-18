import * as React from 'react';
import * as mu from 'mzmu';
import MrServices from '../common/mr.services';
import * as _ from 'lodash';
import classNames from 'classNames';

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
    key?: string
}

interface MrReqProps {
    req?: iMrReq;
    result?: any;
    pool?: any;
    h100?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default class MrReq extends React.Component<MrReqProps, {}> {

    state: any = {
        data: []
    };

    getRequest(props) {
        let {req, pool, result} = props;
        mu.run(req, () => {
            pool = pool || MrServices.getResourcePool();

            let {method = 'post', payload = {}, search = {}, transform, key = 'data', resource} = req;

            resource = resource || pool[req.api];

            mu.run(resource, (api) => {
                method = method.toLowerCase();
                let _promise = method === 'post' ? api[method](search, payload) : api[method](search);
                _promise.then((res) => {
                    let data = _.get(res, key);

                    data = transform ? transform(data) : data;
                    this.setState({
                        data
                    });

                    result && result(data);
                });
            });
        });
    }

    componentWillMount() {
        this.getRequest(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getRequest(nextProps);
    }

    render() {
        let {className, h100, style} = this.props;

        const cls = MrServices.cls({
            'mr-req': true,
            'h-100-i': h100
        }, className);

        return (<div className={cls} style={style}>{this.props.children}</div>);
    }
}
