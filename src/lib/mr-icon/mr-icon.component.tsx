import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
declare var require: any;
require('../assets/styles/mr-icon.less');

interface MrIconProps {
    type: string;
    className?: string;
    title?: string;
    onClick?: React.MouseEventHandler<any>;
    spin?: boolean;
    style?: React.CSSProperties;
}

export class MrIcon extends React.Component<MrIconProps, {}> {

    render() {
        const {type, className = ''} = this.props;
        const classString = classNames({
            anticon: true,
            mricon: true,
            [`mr-icon-${type}`]: true,
        }, className);

        return (<i {..._.omit(this.props, ['type', 'spin', 'className'])} className={classString}></i>);
    }
}
