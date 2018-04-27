import * as  React from 'react';
import {MrPanel, MrIcon} from '../../lib';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';



interface MrsMrDownloadProps {
}

export default class MrsMrDownload extends React.Component<MrsMrDownloadProps, {}> {

    code: string = `
        <section>
            <MrIcon type="xiazai" /> 
            <MrIcon type="bar" size={64} style={{background: '#ccc', color: '#fff'}} /> 
            <MrIcon type="table" size={48} shape="circle" style={{background: '#ccc', color: '#fff'}} /> 
            <MrIcon type="rotate" size={[48, 24]} shape="circle" style={{background: '#ccc', color: '#fff'}} /> 
            <span>江山如此多娇</span>
        </section>
    `;

    render() {
        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrDownload <small>icon</small></header>
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
                    <table>
                        <tbody>
                            <tr>
                                <td>type: string</td>
                                <td>相应图标的class name</td>
                            </tr>

                            <tr>
                                <td>shape: string = 'square'</td>
                                <td>shape: square, circle</td>
                            </tr>

                            <tr>
                                <td>size: string | number</td>
                                <td>图标大小（正方形或直径）</td>
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
