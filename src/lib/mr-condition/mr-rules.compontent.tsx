import * as React from 'react';
import {MrIf, MrServices} from './../../lib';
import * as mu from 'mzmu';

interface MrRulesProps extends MrInterface {
    keys: string | string[];
    rules?: any;
    def?: boolean;
}

/**
 * MrRules keys=['!a.b.c', '!a.e.f']
 */
export default class MrRules extends React.Component<MrRulesProps, {}> {

    rules: any;
    defaultValue: boolean = true;

    calc(): boolean {
        let {keys} = this.props;
        let ruleGroup: boolean[], _rule: boolean = false;

        keys = MrServices.upArray(keys);

        ruleGroup = mu.map(keys, (keyGroup) => {
            let kg: string[] = (keyGroup || '').split('!');
            let key: string = mu.trim(kg.pop());
            let rule = mu.ifnvl(this.rules[key], this.defaultValue);
            if(kg.length) {
                // 多重否定
                mu.each(kg, () => {
                    rule = !rule;
                });
            }

            return rule;
        });

        // 多条件并列，或计算
        mu.each(ruleGroup, (rule) => {
            _rule = _rule || rule;
        });

        return _rule;
    }

    componentWillMount() {
        let {rules, def} = this.props;

        // 就近原则，props.rules > MrServices._rules
        this.rules = mu.ifnvl(rules, MrServices.getRules());
        // 就近原则，props.def > MrServices._ruleValue
        this.defaultValue = mu.ifnvl(mu.ifnvl(def, MrServices.getRuleValue()), true);
    }

    render() {
        let {_gene} = this.props;
        let condition: boolean = this.calc();
        return (<MrIf condition={condition} _gene={_gene}>{this.props.children}</MrIf>);
    }
}
