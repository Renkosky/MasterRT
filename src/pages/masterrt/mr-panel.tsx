import * as  React from 'react';
import {MrPanel, MrIcon} from '../../lib';
import './masterrt.less';

import MrCode from '../../lib/mr-code/mr-code.component';

import JsxParser from 'react-jsx-parser';

interface MrsPanelProps {
}

export default class MrsPanel extends React.Component<MrsPanelProps, {}> {

    code: string = `
        <section>
            <MrPanel title="静夜思::李白" border="title" prepend={<div>我的第一首诗</div>}>
                床前明月光<br />
                疑是地上霜<br />
                举头望明月<br />
                低头思故乡<br />
            </MrPanel>
            
            <MrPanel title="春晓::孟浩然" extra={<MrIcon type="xiazai" />}>
                春眠不觉晓<br />
                处处闻啼鸟<br />
                夜来风雨声<br />
                花落知多少<br />
            </MrPanel>
        </section>
    `;



    render() {
        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrPanel <small>v0.1.21.20180516</small></header>
                <ins>一个集成的盒子, 一个拥有标题，子标题，工具条的容器</ins>
                <main>
                    <JsxParser
                        components={{MrPanel, MrIcon}}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrCode code={(this.code)}></MrCode>
                </details>

                <aside className="mt-16">
                    <MrPanel title="MrPanel" border="none">
                        <table>
                            <tbody>
                                <tr>
                                    <td>title?: string</td>
                                    <td>标题，title::subTitle, 以'::'区分主从标题</td>
                                </tr>
                                <tr>
                                    <td>extra?: ReactDOM</td>
                                    <td>附加栏</td>
                                </tr>
                                <tr>
                                    <td>border?: string</td>
                                    <td>
                                        wrapper: 显示 panel border <br />
                                        title: 显示 title border-bottom <br />
                                        all: 同时显示 wrapper 跟 title 效果 <br />
                                        transparent: borderColor: transparent <br />
                                        none: 无border <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>bodyStyle?: any</td>
                                    <td>负责panel body 样式</td>
                                </tr>
                                <tr>
                                    <td>h100?: boolean = false</td>
                                    <td>style.height = 100% !important</td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>
                </aside>
            </article>
        );

    }
}
