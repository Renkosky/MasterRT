import * as React from 'react';
import MrServices from '../common/mr.services';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {Children, cloneElement} from 'react';
import {MrCol} from './mr-col.component';
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

export class MrFill extends React.Component<MrFillProps, {}> {

    cloneCol(col, gunter) {
        console.debug(col);
        return cloneElement(col, {
            style: {
                paddingLeft: gunter,
                paddingRight: gunter,
                ...col.props['style'],
            }
        });
    }

    render() {
        let {className = '', style = {}, children, gutter, type} = this.props;
        type = mu.ifnvl(type, 'full');
        style = style || {};

        const classString = MrServices.cls({
            'mr-fill': true,
            'h-100-i': true,
            [`mr-fill-${type}`]: true,
        }, className);

        const cols = Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {
            if (!col) {
                return null;
            }

            if (col.props && gutter > 0) {
                let _gutter = gutter / 2;
                style['marginLeft'] = -_gutter;
                style['marginRight'] = -_gutter;

                if( col.type as any === MrCol ) {
                    return this.cloneCol(col, _gutter);
                } else {
                    const _cols = Children.map(col.props.children, (col: React.ReactElement<HTMLDivElement>) => {
                        return col.props ? this.cloneCol(col, _gutter) : col;
                    });
                    return cloneElement(col, {}, _cols);
                }
            }

            // else {
            //
            //     // 判断是否唯一子元素
            //     // console.debug(React.Children.only(col));
            //
            //
            //     // console.debug(col, col.type.toString(), col);
            //
            //     if( col.type as any === MrIf ) {
            //         console.debug(1111111);
            //     }
            //
            //     let abc: any = {
            //         test: 12345
            //     };
            //
            //     return React.cloneCol(col, abc);
            // }

            return col;
        });

        return (<div style={style} className={classString}>{cols}</div>);
    }
}
