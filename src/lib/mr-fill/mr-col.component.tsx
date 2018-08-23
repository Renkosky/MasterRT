import * as React from 'react';
import MrServices from '../mr-common/mr.services';
import * as mu from 'mzmu';

import '../assets/styles/mr-fill.less';

export interface MrColProps {
    span?: number;
    className?: string;
    style?: React.CSSProperties;
    // 是否可以在区块内滚动，默认不滚动
    scroll?: boolean;
    onClick?: React.MouseEventHandler<any>;
    test?: any;
    contentType?: string;
    contentClassName?: string;
    h100?: boolean;
    _gutter?: number;
    _gene?: number;
}

class MrCol extends React.Component<MrColProps, {}> {

    static DISPLAY_NAME: string = 'MrCol';

    render() {
        const {children, span, scroll = false, onClick} = this.props;
        const {className = '', contentClassName = '', style = {}, h100 = true} = this.props;
        const {_gene = {}} = this.props;

        const classString = MrServices.cls({
            'mr-col': true,
            [`mr-col-span mr-col-${span}`]: !!span
        }, className);

        const contentClsString = MrServices.cls({
            'mr-col-content': true,
            'mr-col-scroll': scroll,
            'h-100-i': h100
        }, contentClassName);

        mu.run(_gene['_gutter'], (_gutter) => {
            style['paddingLeft'] = _gutter / 2;
            style['paddingRight'] = _gutter / 2;
        });

        return (<div style={style} className={classString} onClick={onClick}>
            <div className={contentClsString}>
                {children}
            </div>
        </div>);
    }
}

export default MrCol;
