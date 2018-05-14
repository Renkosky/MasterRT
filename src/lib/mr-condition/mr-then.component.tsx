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

        if(_gene.condition && typeof children === 'function'){
            return (children as any)(_gene);
        }

        if (React.Children.count(children)) {
            children = React.Children.map(children, (col: any) => {
                return col.props ? React.cloneElement(col, props) : col;
            });

            return children;
        }

        return null;
    }

    render() {
        let children = this.transmit();
        return (children);
    }
}