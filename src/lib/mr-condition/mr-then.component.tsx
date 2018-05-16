/**
 * MrThen
 * @creator mizi.lin@v0.1.19.20180514
 */

import * as React from 'react';
import * as _ from 'lodash';
import * as mu from 'mzmu';

interface MrThenProps {
    condition?: boolean | any,
    _gene?: any
}

export default class MrThen extends React.Component<MrThenProps, {}> {

    transmit(): any {
        let {children, _gene, ...props} = this.props;

        if(typeof children === 'function'){
            return _gene.condition ? (children as any)(_gene) : null;
        }

        if (React.Children.count(children)) {
            return React.Children.map(children, (col: any) => {
                return _.get(col, 'props') ? React.cloneElement(col, props) : col;
            });
        }

        return null;
    }

    render() {
        let children = this.transmit();
        return (children);
    }
}