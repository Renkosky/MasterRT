import * as  React from 'react';
import {MrPanel, MrIcon} from '../../lib';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';



interface MrsMrIconProps {
}

export default class MrsMrIcon extends React.Component<MrsMrIconProps, {}> {

    code: string = `
        <section>
            <MrIcon type="xiazai" family="mricon" /> 
            <MrIcon type="chrome" size={64} style={{background: '#ccc', color: '#fff'}} /> 
            <MrIcon type="table" size={48} shape="circle" style={{background: '#ccc', color: '#fff'}} /> 
            <MrIcon type="user" size={128} shape="circle" style={{background: '#ccc', color: '#fff', fontSize: 56}} /> 
            <span>江山如此多娇</span>
        </section>
    `;

    interface: string = `
interface MrIconProps {
    /**
     * type?: string
     * 图标类型
     * @extends <antd> Icon.type
     *
     * 相应图标的class name
     * \${family}-\${type}, 如::: anticon-bar | mricon-user
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
`;

    render() {
        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrIcon <small>icon</small></header>
                <ins>字体文件托管在iconfont, 也可自定义配置自己的icon组件库</ins>
                <main>
                    <JsxParser
                        components={{MrIcon}}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={(this.code)}></MrsCode>
                </details>

                <aside className="mt-16">
                    <MrsCode code={this.interface}></MrsCode>
                </aside>
            </article>
        );

    }
}
