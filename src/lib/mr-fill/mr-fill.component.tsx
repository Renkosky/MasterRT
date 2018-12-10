import * as React from 'react';
import {Children, cloneElement} from 'react';
import MrServices from '../mr-common/mr.services';
import MrCol from './mr-col.component';
import  mu from 'mzmu';

import '../assets/styles/mr-fill.less';

export interface MrFillProps {
    className?: string;
    style?: React.CSSProperties;

    /**
     * 栅格宽度
     * 单位(px)
     */
    gutter?: number;
    /**
     * 子元素呈现类型
     * @values fill 100%高度, auto 自适应高度
     *
     * @default fill
     */
    type?: string;

    /**
     * 是否基于父元素100%高度
     *
     * @default false
     */
    h100?: boolean;

    // todo 设定子元素为空时，父元素显示规则
    // empty?: string;
}

class MrFill extends React.Component<MrFillProps, {}> {

    isConditional(type: any) {
        return typeof type === 'function' && (mu.or(type['DISPLAY_NAME'], 'MrIf', 'MrElse', 'MrRules'));
    }

    // 向子组件传递基因信息
    transmit(col, _gutter) {
        let _gene = col.props._gene || {};
        _gene['_gutter'] = _gutter;
        return cloneElement(col, {_gene});
    }

    render() {
        let {className = '', style = {}, children, gutter = 0, h100} = this.props;

        let _style = mu.clone(style);

        const classString = MrServices.cls({
            'mr-fill': true,
            'h-100-i': h100
        }, className);

        if (gutter > 0) {
            _style['marginLeft'] = -gutter / 2;
            _style['marginRight'] = -gutter / 2;
        }

        const cols = Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {

            if (!col) {
                return null;
            }

            let type: any = col.type;

            if(!type) {
                return col;
            }

            // 子元素不能包裹非组件
            if (typeof type === 'string') {
                console.error('MrFill与MrCol是父子组件，只允许条件组件(MrIf, MrFor等)包裹MrCol', type);
                return null;
            }

            if (typeof type === 'symbol') {
                return col;
            }

            // 子元素不能包裹非MrCol 和 条件组件 MrIf
            if (!(type['DISPLAY_NAME'] === 'MrCol' || this.isConditional(type))) {
                console.error('MrFill与MrCol是父子组件，只允许条件组件(MrIf, MrFor等)包裹MrCol', type);
                return null;
            } else {
                return this.transmit(col, gutter);
            }

        });

        return (<div style={_style} className={classString}>{cols}</div>);
    }
}

export default MrFill;
