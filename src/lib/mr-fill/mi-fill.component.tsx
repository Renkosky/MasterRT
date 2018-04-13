import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {Children, cloneElement} from 'react';
declare var require: any;
require('../assets/styles/mr-fill.less');

interface MrFillProps {
    className?: string;
    style?: React.CSSProperties;
    gutter?: number;
    // 子元素呈现类型 （fill: 100%高度, auto: 自适应高度)
    type?: string;
}

export class MrFill extends React.Component<MrFillProps, {}> {

    render() {
        let {className = '', style, children, gutter, type} = this.props;
        type = mu.ifnvl(type, 'full');

        const classString = classNames({
            'mr-fill': true,
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

                return cloneElement(col, {
                    style: {
                        paddingLeft: _gutter,
                        paddingRight: _gutter,
                        ...col.props['style'],
                    },
                });
            }

            return col;
        });

        return (<div style={style} className={classString}>{cols}</div>);
    }
}
