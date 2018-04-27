import * as React from 'react';
import * as _ from 'lodash';

interface MrElseProps {
    condition?: boolean | any
}

export default class MrElse extends React.Component<MrElseProps, {}> {

    transmit(): any {
        let {children} = this.props;

        let props: any = _.omit(this.props, 'condition', 'children');

        if (React.Children.count(children)) {
            children = React.Children.map(children, (col: any) => {
                return col.props ? React.cloneElement(col, props) : col;
            });

            return children;
        }

        return null;
    }

    render() {
        let {condition} = this.props;
        let children = this.transmit();
        return (condition ? children : null);
    }
}