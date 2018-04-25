import * as  React from 'react';
import {MrPanel, MrIcon} from '../../lib';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';

import MrComponent from '../../lib/mr-component/mr-component.component';


interface MrsMrIconProps {
}

export default class MrsMrIcon extends React.Component<MrsMrIconProps, {}> {

    code: string = `
        <section>
            <MrIcon type="xiazai" /> 
            <MrIcon type="table" /> 
            <MrIcon type="rotate" /> 
            <MrIcon type="bar" /> 
        </section>
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

                    <MrComponent component={MrIcon} type={'bar'}>abcdef</MrComponent>

                    <MrComponent component={MrPanel} title={'MrComponent::component'}>abcdef</MrComponent>

                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={(this.code)}></MrsCode>
                </details>

                <aside className="mt-16">
                    <table>
                        <tbody>
                            <tr>
                                <td>type: string</td>
                                <td>相应图标的class name</td>
                            </tr>
                            <tr>
                                <td>fontFamily?: string</td>
                                <td>
                                    使用自定义图标库 <br />

                                    <small>css 相关配置</small>
                                    <MrsCode code={`
.mricon {
    font-family: "mricon", serif !important;
}

.mricon:before {
    font-family: "mricon", serif !important;
}
                                    `}></MrsCode>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </article>
        );

    }
}
