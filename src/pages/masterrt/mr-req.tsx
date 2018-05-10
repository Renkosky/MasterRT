import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {MrResource, MrAutoBind, MrEcharts, MrPanel, MrIf, MrFill, MrIcon, MrReq, MrPurRender} from '../../lib';
import {Button} from 'antd';
import {$pool} from 'src/';

import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';


import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';
import Test from '../../components/test';

interface MrsReqProps {
    a: number;
}

// @MrPurRender
@immutableRenderDecorator
@MrAutoBind
export default class MrsReq extends React.Component<MrsReqProps, {}> {
    // default props
    static defaultProps = {
        a: 1111111
    };


    req: any = {
        pie: {
            resource: $pool.pie,
            method: 'get'
        },

        line: {
            resource: $pool.line,
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
        }
    };

    chartTypes: any = {
        pie: 'pie::ring::rose',
        line: 'line',
    };

    result(data) {
        this.setState({data});
    }

    changeReq(type: string) {
        let req = this.req[type];
        let chartTypes = this.chartTypes[type];
        this.setState({req, chartTypes});
    }

    state: any = {
        data: [],
        req: this.req['pie'],
        chartTypes: this.chartTypes['pie']
    };

    componentWillMount() {
    }

    shouldComponentUpdate(nextProps, nextStates) {
        // console.debug( _.cloneDeep(nextStates), _.cloneDeep(this.state) )
        // console.debug(shallowEqualImmutable(this.state, nextStates), _.isEqual(nextStates, this.state));
        return !_.isEqual(nextStates, this.state);
        // return true;
    }

    componentWillUnmount() {
        this.setState = () => void 0;
    }

    code: string = `
        <Button type={'primary'} onClick={changeReqPie}> Pie </Button>
        <Button type={'primary'} onClick={changeReqLine} className="ml-8"> Line </Button>

        <MrPanel title="回调::通过setState进行重新渲染" bodyStyle={{height: 300}} className="mt-16">
            <MrReq req={req} h100={true} result={result}>
                <MrEcharts
                    data={data}
                    chartTypes={chartTypes}
                ></MrEcharts>
            </MrReq>
        </MrPanel>
        
        {/*// 典型的基因传递调用方案*/}
        {/*// 其中MrReq通过transmit向子组件MrEcharts传递基因data片段*/}
        {/*// 而MrEcharts无需做任何配置，自然而然的获得父组件的遗传的基因片段信息*/}
        <MrPanel title="传递::通过transmit传递数据，无渲染" bodyStyle={{height: 300}} className="mt-16">
            <MrReq req={req} h100={true} transmit="data">
                <MrIf condition={true}>
                    <MrEcharts
                        chartTypes={chartTypes}
                    ></MrEcharts>
                </MrIf>
            </MrReq>
        </MrPanel>
    `;

    render() {

        let {data = {}, req, chartTypes} = this.state;
        let {changeReq, result} = this;

        let reqs = [this.req['pie']];

        return (
            <article className="mrs-article">

                <header>MrReq <small>一个可以异步请求的组件</small></header>
                <ins>使用Resource Pool进行异步请求</ins>
                <main>
                    {/*<JsxParser*/}
                        {/*bindings={{*/}
                            {/*data,*/}
                            {/*req,*/}
                            {/*chartTypes,*/}
                            {/*result,*/}
                            {/*changeReqPie: () => changeReq('pie'),*/}
                            {/*changeReqLine: () => changeReq('line')*/}
                        {/*}}*/}

                        {/*blacklistedAttrs={[]}*/}
                        {/*components={{Button, MrEcharts, MrPanel, MrIf, MrFill, MrIcon, MrReq}}*/}
                        {/*jsx={this.code}*/}
                        {/*onError={(err) => console.debug(err)}*/}
                    {/*></JsxParser>*/}
                </main>

                <MrReq req={reqs} transmit="data">
                    <MrEcharts style={{height: 300}}
                        chartTypes={chartTypes}
                    ></MrEcharts>
                </MrReq>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={(this.code)}></MrsCode>
                </details>

                <aside className="mt-16">

                    <MrPanel title="MrReq">
                        <table>
                            <tbody>
                                <tr>
                                    <td>req: iMrReq</td>
                                    <td>异步请求配置信息，详见 @iMrReq</td>
                                </tr>

                                <tr>
                                    <td>result?: function(data: any)</td>
                                    <td>
                                        异步请求返回结果, data结果由_.get(response, req.dataPath || 'data') 决定返回数据
                                        <br /> 其 data 也作为@transmit传递的基因值
                                    </td>
                                </tr>

                                <tr>
                                    <td>pool?: Resource</td>
                                    <td>Resource Pool，可以由MrService.setResourcePool全局配置</td>
                                </tr>

                                <tr>
                                    <td>h100?: true</td>
                                    <td>style.height: 100% !important</td>
                                </tr>

                                <tr>
                                    <td>transmit?: string</td>
                                    <td>
                                        MrReq会向子元素传递基因值data, 由transmit决定子元素接收基因key匹配的props属性值
                                        <br /> 即 child.props[transmit] = result.data;
                                        <br /><small>示例中的"传递"，是典型的基因传递</small>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>

                    <MrPanel title="iMrReq:: interface">
                        <table>
                            <tbody>
                                <tr>
                                    <td>resource?: Pool{'<respource>'}</td>
                                    <td>@ResourcePool 与 api 二者择其一</td>
                                </tr>

                                <tr>
                                    <td>api?: string</td>
                                    <td>Pool[api] === resource</td>
                                </tr>

                                <tr>
                                    <td>method: string = 'get'</td>
                                    <td>@ResourcePool 调用的方法</td>
                                </tr>

                                <tr>
                                    <td>payload: any</td>
                                    <td>Request PayLoad, resource 默认为json提交数据</td>
                                </tr>

                                <tr>
                                    <td>search: any</td>
                                    <td>Url请求参数</td>
                                </tr>

                                <tr>
                                    <td>transform?: function(data: any) => data</td>
                                    <td>
                                        异步请求返回异步处理

                                    </td>
                                </tr>

                                <tr>
                                    <td>dataPath?:string = 'data'</td>
                                    <td>使用lodash的get方法，请求response数据的属性值，
                                        <br />作为result或transmit的data传递
                                        <br />hack值'::res'返回response本身
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </MrPanel>
                </aside>
            </article>
        );
    }
}
