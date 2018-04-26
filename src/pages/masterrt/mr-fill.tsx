import * as  React from 'react';
import {MrFill, MrCol, MrIcon, MrPanel} from '../../lib';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';

interface MrsMrFillProps {
    location: any;
}

export default class MrsMrFill extends React.Component<MrsMrFillProps, {}> {

    code: string = `
        <section>
            <MrFill gutter={8} style={{height: 100}}>
                <MrCol span={4}>
                    4
                </MrCol>
                <MrCol span={2}>
                    2
                </MrCol>
                <MrCol span={8}>
                    8
                </MrCol>
            </MrFill>

            <MrFill gutter={8} style={{height: 100, marginTop: 8}}>
                <MrCol span={2}>
                    2
                </MrCol>
                <MrCol style={{width: 202}}>
                    width: 202px
                </MrCol>
                <MrCol span={7} h100={false}>
                     7
                </MrCol>
                <MrCol span={12}>
                     12
                </MrCol>
            </MrFill>

            <MrFill gutter={8} style={{height: 100, marginTop: 8}}>
                <MrCol span={1}>
                    静夜思<br />
                    床前明月光<br />
                    疑是地上霜<br />
                    举头望明月<br />
                    低头思故乡<br />
                </MrCol>
                
                <MrCol span={1} scroll={true}>
                    静夜思<br />
                    床前明月光<br />
                    疑是地上霜<br />
                    举头望明月<br />
                    低头思故乡<br />
                </MrCol>
                
                <MrCol span={1}>
                    静夜思<br />
                    <div style={{width: 500}}>
                        床前明月光 
                        疑是地上霜
                        举头望明月
                        低头思故乡
                    </div>
                    
                </MrCol>
                
                <MrCol span={1} scroll={true}>
                    静夜思<br />
                    <div style={{width: 500}}>
                        床前明月光 
                        疑是地上霜
                        举头望明月
                        低头思故乡
                    </div>
                </MrCol>
            </MrFill>
        </section>
    `;



    render() {
        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrFill <small>满格化布局</small></header>
                <ins>区别于栅格化布局，其特色为不管有多少MrCol，其宽度总和为100%</ins>
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

                    <MrPanel title="MrFill" border="none">
                        <table>
                            <tbody>
                                <tr>
                                    <td>gutter?: number</td>
                                    <td>格子间隔</td>
                                </tr>
                                <tr>
                                    <td>h100?: boolean = false</td>
                                    <td>是否设置style.height = 100% !important</td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>

                    <MrPanel title="MrCol::子作为MrFill的子元素出现" border="none">
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
                                <tr>
                                    <td>h100?: boolean = true</td>
                                    <td>是否设置style.height = 100% !important</td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>

                </aside>
            </article>
        );
    }
}
