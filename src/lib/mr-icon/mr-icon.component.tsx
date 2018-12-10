/**
 * MrIcon
 *
 * @creator mizi.lin
 *
 * @update mizi.lin@v0.1.22.20180521 添加simpleicon
 *
 * @update huao@0.2.2.20181010 icon属性theme
 *
 */

import * as React from 'react';
import { Icon } from 'antd';
import  mu from 'mzmu';

import '../assets/styles/mr-icon.less';
import '../assets/styles/mr-simple-line-icon.less';
import { default as MrServices } from '../mr-common/mr.services';

export interface MrIconProps {
    /**
     * type?: string
     * 图标类型
     * @extends <antd> Icon.type
     *
     * 相应图标的class name
     * ${family}-${type}, 如::: anticon-bar | mricon-user
     */
    type?: string;

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
    shape?: string;

    /**
     * size?: string | number
     * 图标大小
     * @values: {string} 带单位长度单位，{number} 如果为数字，默认单位长度为 'px'
     */
    size?: string | number;

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
    family?: string;

    /**
     * Ant Design 3.9 新支持特性
     */
    component?: React.ComponentClass;
    theme?: string;

    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
}

class MrIcon extends React.Component<MrIconProps, {}> {
    render() {
        let { type, className = '', shape = '', size, children, onClick, family, component, theme } = this.props;

        let classString, cls;

        let { style = {} } = this.props;
        let _style: any = {};

        cls = {
            [family]: !!family,
            [`${family}-${type}`]: !!family
        };

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

        classString = MrServices.cls(cls, className);

        const iconProps = {
            className: classString,
            style,
            onClick
        };

        if (type) {
            iconProps['type'] = type;
        }

        if (component) {
            iconProps['component'] = component;
        }

        if (theme) {
            iconProps['theme'] = theme;
        }

        if (family) {
            iconProps.className = 'anticon -mri ' + classString;
            return <i {...iconProps}>{children}</i>;
        } else {
            return <Icon {...iconProps}>{children}</Icon>;
        }
    }
}

export default MrIcon;
