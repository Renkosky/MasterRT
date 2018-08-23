import * as React from 'react';
import MrServices from '../mr-common/mr.services';
import * as mu from 'mzmu';

import '../assets/styles/mr-fill.less';

export interface MrColProps {
    className?: string;
    style?: React.CSSProperties;

    /**
     * 单元格宽度占比值
     *
     * - 单元格宽度占比值 并不是 antd(24), bootstrap(12) 或其他栅格 有个满值概念
     * - 单元格宽度占比值 + width 合起来才是 100%
     */
    span?: number;

    /**
     * 是否可以再区块内滚动
     *
     * @default false
     */
    scroll?: boolean;
    onClick?: React.MouseEventHandler<any>;
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
