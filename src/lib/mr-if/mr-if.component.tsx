import * as React from 'react';
import MrServices from '../common/mr.services';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import MrElse from './mr-else.component';

export interface MrIfProps {
    condition?: any;
    rules?: string | string[];
}

export class MrIf extends React.Component<MrIfProps, {}> {

    _result: boolean = true;

    _rules: any = (MrServices.getRules() || {});

    getResult(props: MrIfProps) {
        mu.exist(props.condition, (condition) => {
            this._result = !!condition;
        });

        mu.exist(props.rules, (rules) => {

            let _rst = false;

            if (typeof rules === 'string') {
                rules = [rules];
            }

            mu.each(rules, (key) => {
                _rst = _rst || mu.ifnvl(this._rules[key], true);
            });

            this._result = this._result && _rst;
        });
    }

    transmit(): any {
        let {children, condition} = this.props;

        let props: any = _.omit(this.props, 'condition', 'rules', 'children');

        if(React.Children.count(children)){
            children = React.Children.map(children, (col: any) => {
                let _props = mu.clone(props);

                if(col.type as any === MrElse) {
                    if(mu.isNotExist(_.get(col, 'props.condition'))) {
                        _props['condition'] = !condition;
                    }

                    return  React.cloneElement(col, _props);
                } else if(this._result) {
                    if(col.props) {
                        return React.cloneElement(col, _props);
                    } else {
                        return col;
                    }
                } else {
                    return null;
                }
            });

            return children;
        }

        return null;
    }

    componentWillMount() {
        this.getResult(this.props);
    }

    componentWillReceiveProps(nextProps: MrIfProps) {
        this.getResult(nextProps);
    }

    render() {
        let children = this.transmit();
        return (children);
    }
}