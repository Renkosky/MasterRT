import * as  React from 'react';
import {MrIcon, MrPanel, MrEcharts} from 'masterrt';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';

interface MrsMrEchartsProps {
}

export default class MrsMrEcharts extends React.Component<MrsMrEchartsProps, {}> {

    data: any = {
        pie: [
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
        ]
    };

    code: string = `
        <section>
            <div style={{height: 300}}>
                <MrEcharts
                    // 数据源
                    data={pieData}
                    // ? sourceType
                    // 数据源类型 => dataSet, dataSource
                    dataType={'dataSource'}

                    // ? dataModel // 数据处理类型 => group, single
                    dataModel={''}

                    // chartTypes
                    // 图表类型以及衍生类型，
                    // 如 pie::ring(饼图::环形), pie::rose(饼图::南丁格尔)
                    // 如 bar::stack(柱形堆叠图), line:area(线x形::面积图)
                    chartTypes={'pie::ring::rose'}

                    // ? setting
                    // 额外配置项
                    // 可使用options路径直接配置
                    setting={[
                        {'legend.show': true},
                        {'legend.orient': 'vertical'},
                        {'legend.right': '20%'}
                    ]}

                    // ? options 直接调用
                    // 图表的options配置，直接获得图表
                    options={null}

                    // ? theme
                    // 图表的主体配色
                    theme={''}

                    // ? renderType,
                    // 图表绘图类型 'svg', 'canvas'
                    renderType={'svg'}
                ></MrEcharts>
            </div>
        </section>
    `;

    render() {
        let _data = JSON.stringify(this.data.pie).replace(/}\,/g, '},\n');

        return (
            <article className="mrs-article mrs-MrFill">


                <header>MrEcharts <small>echarts集成</small></header>
                <ins>由data直接快速生成echarts图表，并有setting进行精细控制</ins>
                <main>
                    <JsxParser
                        bindings={{
                            pieData: this.data.pie
                        }}
                        components={{
                            MrPanel,
                            MrIcon,
                            MrEcharts
                        }}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={(this.code)}></MrsCode>
                </details>

                <details className="mt-16">
                    <summary>数据源</summary>
                    <MrsCode code={_data}></MrsCode>
                </details>

                <aside className="mt-16">
                    <table>
                        <tbody>
                            <tr>
                                <td>data?: any[]</td>
                                <td>
                                    主数据(dataSource)，基于数组对象[{'{}, {}, {}'}] <br />
                                    data, options 二者存其一，不可同时存在
                                </td>
                            </tr>
                            <tr>
                                <td>dataType?: string</td>
                                <td>数据类型, dataSource, dateSet(echarts 4 support)</td>
                            </tr>
                            <tr>
                                <td>dataModel?: string</td>
                                <td>
                                    数据模型（处理数据方式）<br />
                                    single: 用于简单的二维数据 <br />
                                    group: 需要对数据进行分组解析
                                </td>
                            </tr>
                            <tr>
                                <td>chartTypes?: string</td>
                                <td>
                                    需要显示的图表类型 <br />
                                    chartTypes 由主次图表类型组成，如 pie::rose::ring <br />
                                    其中 pie 表示图表的主类型（echarts type), rose, ring表示pie的辅助显示功能 <br />
                                    rose, ring 其实是一组 setting 配置的集合
                                </td>
                            </tr>
                            <tr>
                                <td>options?: EchartsOptions</td>
                                <td>Echarts 可渲染的 Options</td>
                            </tr>
                            <tr>
                                <td>setting?: object | array</td>
                                <td>
                                    data会通过一系列的机制转为EchartOptions, <br />
                                    而setting设置最后规则对options进行构建，产生最终options <br />
                                    <br />
                                    setting = {`{[key]: value}`} <br />
                                    其中 key 为 options 扁平化key值, 如 aAxis.axisLabel.normal.style
                                    <br />
                                    setting = [{'{}, {}, {}'}] <br />
                                    setting 运行原理是遍历 setting 后者会覆盖前者的值，若setting配置涉及顺序问题，请使用数组配置
                                </td>
                            </tr>
                            <tr>
                                <td>theme?: string</td>
                                <td>echarts 主题风格， 需要载入先关JS文件, 也可以通过MrSerives.setEchartsTheme进行设置</td>
                            </tr>

                            <tr>
                                <td>renderType?: string = 'canvas'</td>
                                <td>echarts渲染引擎 :: svg, canvas</td>
                            </tr>

                            <tr>
                                <td>result?: function(options, result)</td>
                                <td>Echarts 即将渲染前返回数据，包含 options, data, dataView</td>
                            </tr>
                        </tbody>
                    </table>
                </aside>

                <aside className="mt-16">

                    <MrPanel title={'setting配置指南'}>
                        <MrsCode code={`
// setting 有一组 key/value 组成
setting = {
    'grid.top': 10,
    'series[0].axisTick.show': false,
    'series[1].axisLabel.show': false,
    'xAxis[0].splitLine.show': false,
    'tooltip.formatter': (rst) => {
        return rst.name
    },
    '**tooltip.formatter': (options, data) => {
        return ''
    },
    '$$series[*].symbol': 'circle',
    '@@xyExchange': true
}

// 这里的函数为 echart 配置函数
'tooltip.formatter': (rst) => {
    return rst.name
}

// 当 **，则函数则为 callback 函数，其中参数 options为当前options的值，data为当前key的值
'**tooltip.formatter': (options, data) => {
    return ''
}

// 当 $$ + [*] 同时出现 则遍历series所有项配置symbol
'$$series[*].symbol': 'circle'

// 当 @@, 则 xyExchange 为系统默认的处理方法, 其值为改方法函数的参数
'@@xyExchange': true
                        `}></MrsCode>
                    </MrPanel>

                </aside>
            </article>
        );
    }
}
