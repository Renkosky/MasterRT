import * as React from 'react';
import {Children, cloneElement} from 'react';
import MrServices from '../mr-common/mr.services';
import MrCol from './mr-col.component';
import {MrElse, MrIf} from '../';
import * as _ from 'lodash';

declare var require: any;
require('../assets/styles/mr-fill.less');

interface MrFillProps {
    className?: string;
    style?: React.CSSProperties;
    gutter?: number;
    // 子元素呈现类型 （fill: 100%高度, auto: 自适应高度)
    type?: string;
    h100?: boolean;
}

export default class MrFill extends React.Component<MrFillProps, {}> {

    isConditional (type: any) {
        return typeof type === 'function' && (type === MrIf || type === MrElse);
    }

    // 向子组件传递基因信息
    transmit(col, _gutter) {
        let _gene = col.props._gene || {};
        _gene['_gutter'] = _gutter;
        return cloneElement(col, {_gene});
    }

    render() {
        let {className = '', style = {}, children, gutter = 0, h100} = this.props;

        const classString = MrServices.cls({
            'mr-fill': true,
            'h-100-i': h100
        }, className);

        if (gutter > 0) {
            style['marginLeft'] = -gutter / 2;
            style['marginRight'] = -gutter / 2;
        }

        const cols = Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {

            if (!col) {
                return null;
            }

            let type: any = col.type;

            // 子元素不能包裹非组件
            if (typeof type === 'string') {
                console.error('MrFill与MrCol是父子组件，只允许条件组件(MrIf, MrFor等)包裹MrCol', type);
                return null;
            }

            if (typeof type === 'symbol') {
                return col;
            }

            // 子元素不能包裹非MrCol 和 条件组件 MrIf
            if (!(type === MrCol || this.isConditional(type))) {
                console.debug( typeof type );
                console.error('MrFill与MrCol是父子组件，只允许条件组件(MrIf, MrFor等)包裹MrCol');
                return null;
            } else {
                return this.transmit(col, gutter);
            }

        });

        return (<div style={style} className={classString}>{cols}</div>);
    }
}
