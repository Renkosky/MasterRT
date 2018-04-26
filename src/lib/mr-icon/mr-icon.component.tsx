import * as React from 'react';
import * as _ from 'lodash';
import {MrServices} from '..';

declare var require: any;
require('../assets/styles/mr-icon.less');
import * as mu from 'mzmu';

interface MrIconProps {
    type: string;
    className?: string;
    title?: string;
    onClick?: React.MouseEventHandler<any>;
    spin?: boolean;
    style?: React.CSSProperties;
    shape?: string
    size?: string | number
}

export class MrIcon extends React.Component<MrIconProps, {}> {

    render() {
        const {type, className = '', shape = '', style = {}, size, children, onClick} = this.props;
        const classString = MrServices.cls({
            anticon: true,
            mricon: true,
            [`mr-icon-${type}`]: true,
        }, className);

        mu.run(size, (size) => {
            let _size = size, _fontSize;

            if(typeof size === 'object') {
                [_size, _fontSize] = size;
            }

            if(typeof _size === 'number') {
                _size = _size + 'px';
            }

            style.width = _size;
            style.height = _size;
            style.lineHeight = _size;
            if(_fontSize){
                style.fontSize = _fontSize;
            }
        });

        mu.run(shape === 'circle', (size) => {
            style.borderRadius = '50%';
        });

        return (<i style={style} className={classString} onClick={onClick}>{children}</i>);
    }
}
