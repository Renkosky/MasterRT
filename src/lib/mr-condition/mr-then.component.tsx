/**
 * MrThen
 * @creator mizi.lin@v0.1.19.20180514
 */

import * as React from 'react';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {ReactNode} from 'react';

export interface MrThenProps {
    condition?: boolean | any,
    _gene?: any
}

/**
 * MrThen是条件判断中的最后一层
 * 它没有子条件
 */
class MrThen extends React.Component<MrThenProps, {}> {

    transmit(): ReactNode {
        let {children, _gene, condition, ...props} = this.props;
        let _geneCondition = !_gene.condition;
        let _condition = mu.isExist(condition) ? (condition && _geneCondition) : _geneCondition;

        console.debug(_condition);

        if(typeof children === 'function'){
            return _condition ? (children as Function)() : null;
        }

        return _condition ? children : null;
    }

    render(): ReactNode {
        console.debug(11111111111);
        let children = this.transmit();
        return (children);
    }
}

export default MrThen;