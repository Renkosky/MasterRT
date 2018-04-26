import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {MrCol, MrFill, MrPanel, MrEchartsPanel} from '../../lib';
import JsxParser from 'react-jsx-parser';
import MrsCode from '../../components/MrsCode';
interface MrsEchartsPanelProps {
}

export default class MrsEchartsPanel extends React.Component<MrsEchartsPanelProps, {}> {

    req: any = {
        api: 'line',
        method: 'get',
        // 数据修改
        transform: (data) => {
            return mu.map(data, (o) => {
                o.name = o.type;
                o.x = o.date;
                o.value = o.volume;
                return o;
            });
        }
    };

    pie: any[] = [
        {
            value: 78499,
            name: 'A0'
        },
        {
            value: 131536,
            name: 'A Entry'
        },
        {
            value: 246050,
            name: 'A Main'
        },
        {
            value: 284390,
            name: 'A Plus'
        },
        {
            value: 394088,
            name: 'B'
        },
        {
            value: 35022,
            name: 'C'
        },
        {
            value: 316762,
            name: 'SUV'
        },
        {
            value: 34069,
            name: 'MPV'
        }
    ];

    code = `
        <MrEchartsPanel
                title="Use Data"
                style={{height: 400}} chartTypes={'pie::ring::rose'} data={pie} />

        <MrEchartsPanel
            title="Use Req"
            style={{height: 400}} chartTypes={'line'} req={req} />
    `;

    render() {
        let {pie, req} = this;
        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrEchartsPanel <small>一个基于MrPanel, MrReq, MrEcharts 集成的显示UI</small></header>
                <ins>支持各种激活Echarts方式，以及使用Tool控制Echarts显示方式</ins>
                <main>
                    <JsxParser
                        bindings={{pie, req}}
                        components={{MrFill, MrCol, MrEchartsPanel}}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={(this.code)}></MrsCode>
                </details>

                <aside className="mt-16">

                    <MrPanel title="MrEchartsPanel" border="none">
                        <table>
                            <tbody>
                                <tr>
                                    <td>title?: string</td>
                                    <td>@MrPanel</td>
                                </tr>
                                <tr>
                                    <td>downloadName?: string = $title + $timestamp  </td>
                                    <td>Echarts DataView 数据下载文件名（需要后缀名）</td>
                                </tr>
                                <tr>
                                    <td>data?: any[{}]</td>
                                    <td>@MrEcharts</td>
                                </tr>
                                <tr>
                                    <td>dataType?: string</td>
                                    <td>@MrEcharts</td>
                                </tr>
                                <tr>
                                    <td>dataModel?: string</td>
                                    <td>@MrEcharts</td>
                                </tr>
                                <tr>
                                    <td>chartTypes?: string</td>
                                    <td>@MrEcharts</td>
                                </tr>
                                <tr>
                                    <td>h100?: boolean = true</td>
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