import * as React from 'react';
import MrServices from '../common/mr.services';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import MrElse from './mr-else.component';

export interface MrIfProps {
    condition?: any;
    rules?: string | string[];
    // 父组件传递给条件组件基因信息
    _gene?: any;
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

    // 传递基因信息
    transmit(): any {
        let {children, condition, _gene = {}} = this.props;

        let props: any = _.omit(this.props, 'condition', 'rules', 'children');

        return !children ? null : React.Children.map(children, (child: any) => {
            let type: any, _props: any = {};

            if (!child) {
                return null;
            }

            type = child.type;

            // 如果是MrElse, 继承基因
            // @todo MrElse 不带条件，只能是最后一个元素
            if (type === MrElse) {
                if (mu.isNotExist(child.props.condition)) {
                    _props['condition'] = !condition;
                }

                _props['_gene'] = _gene;

                return React.cloneElement(child, _props);
            }

            // result === true
            else if(this._result) {

                // 若为组件继续基因
                if(typeof type === 'function'){
                    _props['_gene'] = _gene;
                    return React.cloneElement(child, _props);
                } else {
                    return child;
                }

            } else {
                return null;
            }

        });
    }

    componentWillMount() {
        this.getResult(this.props);
    }

    componentWillReceiveProps(nextProps: MrIfProps) {
        this.getResult(nextProps);
    }

    render() {
        let children = this.transmit();
        return <React.Fragment>{children}</React.Fragment>;
    }
}