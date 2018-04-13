import * as React from 'react';
import MrServices from '../common/mr.services';
import * as mu from 'mzmu';

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

    componentWillMount() {
        this.getResult(this.props);
    }

    componentWillReceiveProps(prop: MrIfProps) {
        this.getResult(this.props);
    }

    render() {
        return this._result ? this.props.children : null;
    }
}