/**
 * MrRules
 * 权限配置规则
 *
 * @author mizi.lin@v1.20180514
 */

import * as React from 'react';
import {MrIf, MrServices} from './../../lib';
import * as mu from 'mzmu';

interface MrRulesProps extends MrInterface {
    /**
     * keys: string | string[];
     * 权限的规则条件
     *
     * @value {string} 其值为权限对象的key的规则配置 (key || !!key || !!!key ...)
     *        {string[]} 若keys为数组，则匹配值最终以或计算 rules[key0] || rules[key1] || rules[key2] ....
     *
     * @mark 只允许'!'作用在key上
     * exp. keys = 'a.b.c'; keys = ['a.b.c']; key = ['a.b.c', '!a.c.d', '!c']
     */
    keys: string | string[];

    /**
     * rules?: {[key: string]: boolean}[]
     * 权限规则字典
     * @match 就近原则 >> MrServices.setRules(rules: object)
     */
    rules?: object[];

    /**
     * defNoRuleValue?: boolean = true
     * 规则不存在默认规则
     * @match 就近原则 >> MrServices.setRuleValue(val: boolean)
     */
    defNoRuleValue?: boolean;
}

/**
 * MrRules keys=['!a.b.c', '!a.e.f']
 */
export default class MrRules extends React.Component<MrRulesProps, {}> {

    static calc(keys: string | string[], rules: any, defaultValue: boolean): boolean {
        let ruleGroup: boolean[], _rule: boolean = false;

        keys = MrServices.upArray(keys);

        ruleGroup = mu.map(keys, (keyGroup) => {
            let kg: string[] = (keyGroup || '').split('!');
            let key: string = mu.trim(kg.pop());
            let rule = mu.ifnvl(rules[key], defaultValue);
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


    rules: any;
    defaultValue: boolean = true;

    componentWillMount() {
        let {rules, defNoRuleValue} = this.props;

        // 就近原则，props.rules > MrServices._rules
        this.rules = mu.ifnvl(rules, MrServices.getRules());
        // 就近原则，props.defNoRuleValue > MrServices._ruleValue
        this.defaultValue = mu.ifnvl(mu.ifnvl(defNoRuleValue, MrServices.getRuleValue()), true);
    }

    render() {
        let {_gene, keys} = this.props;
        let condition: boolean = MrRules.calc(keys, this.rules, this.defaultValue);
        return (<MrIf condition={condition} _gene={_gene}>{this.props.children}</MrIf>);
    }
}
