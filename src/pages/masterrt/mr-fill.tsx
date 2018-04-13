import * as  React from 'react';
import {MrFill, MrCol, MrIcon} from 'masterrt';
import './masterrt.less';
import MrsHTML from '../../components/MrsHTML';

import MrsCode from '../../components/MrsCode';

import renderHTML from 'react-render-html';
import JsxParser from 'react-jsx-parser';

interface MrsMrFillProps {
}

export default class MrsMrFill extends React.Component<MrsMrFillProps, {}> {

    code: string = `
        <section>
            <MrFill gutter={8} style={{height: 100}}>
                <MrCol span={4}>
                    <div className="content">
                        4
                    </div>
                </MrCol>
                <MrCol span={2}>
                    <div className="content">
                        2
                    </div>
                </MrCol>
                <MrCol span={8}>
                    <div className="content">
                        8
                    </div>
                </MrCol>
            </MrFill>

            <MrFill gutter={8} style={{height: 100, marginTop: 8}}>
                <MrCol span={1}>
                    <div className="content">
                        1
                    </div>
                </MrCol>
                <MrCol span={3}>
                    <div className="content">
                        3
                    </div>
                </MrCol>
                <MrCol>
                    <div className="content">
                        7
                    </div>
                </MrCol>
                <MrCol>
                    <div className="content">
                        12
                    </div>
                </MrCol>
            </MrFill>

            <MrFill gutter={8} style={{height: 100, marginTop: 8}}>
                <MrCol>
                    <div className="content">
                        1
                    </div>
                </MrCol>
            </MrFill>
        </section>
    `;

    render() {
        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrFill <small>满格化布局</small></header>
                <ins>区别于栅格化布局，其特色为不管有多少子模块，其宽度总和为100%</ins>
                <main>
                    <JsxParser
                        components={{MrFill, MrCol}}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={(this.code)}></MrsCode>
                </details>

                <aside className="mt-16">
                    <h5>MrFill</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>gutter?: number</td>
                                <td>格子间隔</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5 className="mt-8">MrCol</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>span?: number</td>
                                <td>格子占位值 （v / total）</td>
                            </tr>
                            <tr>
                                <td>scroll?: boolean  =  false</td>
                                <td>MrCol 默认 overflow: hidden, scroll = true 的时候 overflow: auto </td>
                            </tr>
                            <tr>
                                <td>order?: number</td>
                                <td>MrCol 排序 </td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </article>
        );
    }
}
