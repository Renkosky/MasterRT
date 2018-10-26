/**
 * MrRules
 * 按权限规则判断显示
 * @creator mizi.lin@v0.1.21.20180515
 */

import {MrServices} from "..";
import * as mu from 'mzmu';
import MrRules from './mr-rules.compontent';

/**
 * 根据权限对象判断key
 * @param {string | string[]} keys
 * @param rules
 * @param {boolean} defaultValue
 * @return {{then: (jsx) => (any | null)}}
 */
export default function (keys: string | string[], rules?: any, defaultValue?: boolean) {
    keys = MrServices.upArray(keys) as string[];
    rules = mu.ifnvl(rules, MrServices.getRules());
    defaultValue = mu.ifnvl(defaultValue, MrServices.getRuleValue());

    let condition = MrRules.calc(keys, rules, defaultValue);

    return {
        then: (jsx) => {
            let rst;

            if(condition && typeof jsx === 'function'){
                return jsx();
            } else {
                return condition ? jsx : null;
            }
        }
    }
}