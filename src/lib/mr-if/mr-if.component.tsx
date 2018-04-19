import * as React from 'react';
import MrServices from '../common/mr.services';
import * as mu from 'mzmu';
import * as _ from 'lodash';

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
        let {children} = this.props;

        let props = _.omit(this.props, 'condition', 'rules', 'children');

        children = React.Children.map(children, (col: any) => {
            return col.props ? React.cloneElement(col, props) : col;
        });

        return children;
    }

    componentWillMount() {
        this.getResult(this.props);
    }

    componentWillReceiveProps(nextProps: MrIfProps) {
        this.getResult(nextProps);
    }

    render() {
        let children = this.transmit();
        return this._result ? children : null;
    }
}