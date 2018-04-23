import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';

interface MrComponentProps {
    component: any;
}

export default class MrComponent extends React.Component<any, {}> {

    render() {

        let {component, children, ...props} = this.props;

        return React.createElement(component, {...props}, children);
    }
}
