import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
declare var require: any;
require('../assets/styles/mr-fill.less');

interface MrColProps {
    span?: number;
    className?: string;
    style?: React.CSSProperties;
    // 是否可以在区块内滚动，默认不滚动
    scroll?: boolean;
}

export class MrCol extends React.Component<MrColProps, {}> {

    render() {
        const {className = '', children, style, span, scroll } = this.props;

        const classString = classNames({
            'mr-col': true,
            [`mr-col-${span}`]: !!span
        }, className);

        return (<div style={style} className={classString}>
            { scroll ? <div className="mr-col-scroll">{children}</div> : children }
        </div>);
    }
}
