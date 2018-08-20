import * as React from 'react';

export interface MrComponentProps {
    /**
     * 动态调用component
     */
    component: React.ComponentClass | React.SFC;

    /**
     * 所调用component的props
     */
    [propName: string]: any
}

class MrComponent extends React.Component<MrComponentProps, {}> {

    render() {
        let {component, children, ...props} = this.props;
        return React.createElement(component, {...props}, children);
    }
}

export {MrComponent};
export default MrComponent;