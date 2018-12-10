/**
 * MrThen
 * @creator mizi.lin@v0.1.19.20180514
 */

import * as React from 'react';
import * as _ from 'lodash';
import  mu from 'mzmu';
import {ReactNode} from 'react';

export interface MrThenProps {
    _gene?: any
}

/**
 * MrThen是条件判断中的最后一层
 * 它没有子条件
 */
class MrThen extends React.Component<MrThenProps, {}> {

    static DISPLAY_NAME = 'MrThen';

    transmit(): ReactNode {
        let {children, _gene} = this.props;

        if(mu.isEmpty(_gene)){
            console.error('MrThen不能单独使用 或 它只能保护在MrIf里');
            return null;
        }

        let condition = _gene.condition;

        if(typeof children === 'function'){
            return condition ? (children as Function)() : null;
        }

        return condition ? children : null;
    }

    render(): ReactNode {
        let children = this.transmit();
        return (children);
    }
}

export default MrThen;