import * as React from 'react';
import {MrServices} from 'masterrt';

declare var require: any;
require('../assets/styles/mr-fill.less');

interface MrColProps {
    span?: number;
    className?: string;
    style?: React.CSSProperties;
    // 是否可以在区块内滚动，默认不滚动
    scroll?: boolean;
    onClick?: React.MouseEventHandler<any>;
    test?: any;
    contentType?: string;
    contentClassName?: string;
}

export class MrCol extends React.Component<MrColProps, {}> {

    render() {
        const {className = '', contentClassName='', children, style = {}, span, scroll = false, onClick} = this.props;

        const classString = MrServices.cls({
            'mr-col': true,
            [`mr-col-span mr-col-${span}`]: !!span
        }, className);

        const contentClsString = MrServices.cls({
            'mr-col-content': true,
            'mr-col-scroll': scroll
        }, contentClassName);

        return (<div style={style} className={classString} onClick={onClick}>
            <div className={contentClsString}>
                {children}
            </div>
        </div>);
    }
}
