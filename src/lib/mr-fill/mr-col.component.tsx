import * as React from 'react';
import MrServices from '../mr-common/mr.services';
import * as mu from 'mzmu';

export interface MrColProps {
    className?: string;
    style?: React.CSSProperties;

    /**
     * 单元格宽度占比值
     *
     * - 单元格宽度占比值 并不是 antd(24), bootstrap(12) 或其他栅格 有个满值概念
     * - 单元格宽度占比值 + width 合起来才是 100%
     *
     * 当 span 为字符串时，那么该值为宽度（width）
     */
    span?: number | string;

    /**
     * 根据样式，显示位置
     */
    order?: number;

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
        const {children, order, scroll = false, onClick} = this.props;
        const {className = '', contentClassName = '', style = {}, h100 = true} = this.props;
        const {_gene = {}} = this.props;
        let {span} = this.props;
        let width;
        let cls = {
            'mr-col': true,
        };

        if(typeof span === 'number') {
            cls[`mr-col-${span}`] = true;
        } else if (typeof span === 'string' ) {
            width = +span === parseFloat(span) ? span + 'px' : span;
            style['width'] = width;
        }

        const classString = MrServices.cls(cls, className);
        const contentClsString = MrServices.cls({
            'mr-col-content': true,
            'mr-col-scroll': scroll,
            'h-100-i': h100
        }, contentClassName);

        mu.run(_gene['_gutter'], (_gutter) => {
            style['paddingLeft'] = _gutter / 2;
            style['paddingRight'] = _gutter / 2;
        });

        mu.run(order, () => {
            style['order'] = order;
        });

        return (<div style={style} className={classString} onClick={onClick}>
            <div className={contentClsString}>
                {children}
            </div>
        </div>);
    }
}

export default MrCol;
