import * as  React from 'react';
import {MrPanel, MrIcon} from '../../lib';
import './masterrt.less';

import JsxParser from 'react-jsx-parser';
import MrCode from '../../lib/mr-code/mr-code.component';
import {Icon} from 'antd';

// @ts-ignore
import BbsSvg from '../../assets/bbs.svg';

console.debug(BbsSvg);

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
     * @mark: 若使用自定义图标库，请加重自定义图标class的权重值来覆盖anticon设定的fontFamily
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
     * @mark: 默认使用 ant-design 的图标库 https://ant.design/components/icon-cn/
     *
     * 同时提供 simpleLineIcon http://simplelineicons.com/
     * < MrIcon type="" family="simpleicon" / >
     */
    family?: string

    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
}  
`;

    render() {
        return (
            <article className="mrs-article mrs-MrFill p-32" style={{paddingLeft: 100}}>
                <header>MrIcon <small>v0.1.22.20180521</small></header>
                <ins>字体文件托管在iconfont, 也可自定义配置自己的icon组件库</ins>
                <main>
                    <JsxParser
                        components={{MrIcon}}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <section>
                    <MrIcon type="user" family="simpleicon" />
                    <MrIcon type="share" family="simpleicon"></MrIcon>
                </section>

                - || <i className="simpleicon simpleicon-user-following"></i>

                <br />

                {/*::: <img src="assets/bbs.svg" />*/}

                <br />

                <Icon component={BbsSvg} />

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrCode code={(this.code)}></MrCode>
                </details>

                <aside className="mt-16">
                    <MrCode code={this.interface}></MrCode>
                </aside>
            </article>
        );

    }
}
