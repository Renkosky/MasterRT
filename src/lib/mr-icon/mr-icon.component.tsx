import * as React from 'react';
import {MrServices} from '..';
import {Icon} from 'antd';
import * as mu from 'mzmu';

declare var require: any;
require('../assets/styles/mr-icon.less');

interface MrIconProps {
    /**
     * type?: string
     * 图标类型
     * @extends <antd> Icon.type
     *
     * 相应图标的class name
     * ${family}-${type}, 如::: anticon-bar | mricon-user
     */
    type: string;

    /**
     * spin?: boolean = false
     * 是否有旋转动画
     * @extends <antd> Icon.spin
     */
    spin?: boolean;

    /**
     * shape?: string = ifnvl(null, 'square')
     * icon 形状
     * @values: square, circle
     */
    shape?: string

    /**
     * size?: string | number
     * 图标大小
     * @values: {string} 带单位长度单位，{number} 如果为数字，默认单位长度为 'px'
     */
    size?: string | number,

    /**
     * family?: string = ifnvl(null, 'anticon')
     * 自定义图标框名称
     *
     * @ps: 若使用自定义图标库，请加重自定义图标class的权重值来覆盖anticon设定的fontFamily
     * exp.
     *
     *   body i.mricon {
     *       font-family: "mricon", serif !important;
     *   }
     *
     *   body i.mricon:before {
     *       font-family: "mricon", serif !important;
     *   }
     *
     */
    family?: string

    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
}

export default class MrIcon extends React.Component<MrIconProps, {}> {

    render() {
        const {type, className = '', shape = '', size, children, onClick, family} = this.props;
        const classString = MrServices.cls({
            [family]: !!family,
            [`${family}-${type}`]: !!family,
        }, className);

        let {style = {}} = this.props;
        let _style: any = {};

        _style.verticalAlign = 'middle';

        mu.exist(size, (size) => {
            _style.width = size;
            _style.height = size;

            if (size == +size) {
                _style.lineHeight = size + 'px';
            } else {
                _style.lineHeight = size;
            }
        });

        style = mu.extend(_style, style);

        mu.run(shape === 'circle', (size) => {
            style.borderRadius = '50%';
        });

        const iconProps = {
            type,
            className: classString,
            style,
            onClick
        };

        return (<Icon {...iconProps}>{children}</Icon>);
    }
}
