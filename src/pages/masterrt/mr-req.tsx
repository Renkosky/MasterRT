import * as React from 'react';
import  mu from 'mzmu';
import * as _ from 'lodash';
import {MrAutoBind, MrEcharts, MrPanel, MrIf, MrFill, MrIcon, MrReq} from '../../lib';
import {Button} from 'antd';
import {default as $pool} from '../../services/base-resource-pool';

import {immutableRenderDecorator, shallowEqualImmutable} from 'react-immutable-render-mixin';

import './masterrt.less';

import MrCode from '../../lib/mr-code/mr-code.component';

import JsxParser from 'react-jsx-parser';

interface MrsReqProps {
}

// @todo use immutable
// @immutableRenderDecorator

@MrAutoBind
export default class MrsReq extends React.Component<MrsReqProps, {}> {
    req: any = {
        pie: {
            resource: $pool.pie,
            method: 'get'
        },

        nodata: {
            resource: $pool.nodata,
            method: 'get'
        },

        line: {
            resource: $pool.line,
            method: 'get',
            // 数据修改
            transform: (res) => {
                let {data} = res;
                res.data = mu.map(data, (o) => {
                    o.name = o.type;
                    o.x = o.date;
                    o.value = o.volume;
                    return o;
                });
                return res;
            }
        }
    };

    chartTypes: any = {
        pie: 'pie::ring::rose',
        line: 'line',
    };

    result(res) {
        let {data} = res;
        this.setState({data});
    }

    changeReq(type: string) {
        let req = this.req[type];
        let chartTypes = this.chartTypes[type];
        mu.storage('X-TOKEN', +new Date());
        this.setState({
            req,
            chartTypes
        });
    }

    cancel = null;

    state: any = {
        data: [],
        req: this.req['pie'],
        chartTypes: this.chartTypes['pie'],
        nodataReq: this.req['nodata'],
    };

    componentWillMount() {

        let aa = $pool.nodata.get({id: 111}, {}, {
            cancelToken: (c) => (this.cancel = c)
        }).then(() => {
            console.debug('--------->')
        }).catch((error) => {
            console.debug(error);
        });

        // this.cancel();


        // $pool.nores.get({id: 111}).catch((error) => {
        //     error.$message.then((o) => console.debug(o));
        // });

        // $pool.nodata.delete({id: 111}, {});
        // $pool.nodata.patch({id: 111}, {});

        console.debug( this.cancel() );

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
        <Button type="{'primary'}" onClick={changeReqPie}> Pie </Button>
        <Button type="{'primary'}" onClick={changeReqLine} className="ml-8"> Line </Button>
        
        <MrPanel title="回调::通过setState进行重新渲染" bodyStyle="{{height:" 300}} className="mt-16">
            <MrReq req="{req}" result="{result}">
                <MrEcharts
                    data="{data}"
                    chartTypes="{chartTypes}"
                ></MrEcharts>
            </MrReq>
        </MrPanel>

        {/*// 典型的基因传递调用方案*/}
        {/*// 其中MrReq通过transmit向子组件MrEcharts传递基因data片段*/}
        {/*// 而MrEcharts无需做任何配置，自然而然的获得父组件的遗传的基因片段信息*/}
        <MrPanel title="传递::通过transmit传递数据，局部渲染" bodyStyle="{{height:" 300}} className="mt-16">
            <MrReq req="{req}" transmit="data:res.data">
                <MrEcharts
                    chartTypes="{chartTypes}"
                ></MrEcharts>
            </MrReq>
        </MrPanel>
        
        <MrPanel title="函数调用，通过子元素进行函数调用" bodyStyle="{{height:" 300}} className="mt-16">
            <MrReq req="{req}" transmit="data:res.data">{draw}</MrReq>
        </MrPanel>
        
        <MrPanel title="NoData Test" bodyStyle="{{height:" 100}} className="mt-16">
            <MrReq req="{nodataReq}" transmit="data:res.data" style={{height: 300}}></MrReq>
        </MrPanel>
    `;

    render() {

        let {data = {}, req, chartTypes, nodataReq} = this.state;
        let {changeReq, result} = this;

        return (
            <article className="mrs-article">

                <header>MrReq <small>v0.1.24.20180521</small></header>
                <ins>一个可以异步请求的组件, 使用Resource Pool进行异步请求</ins>
                <main>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrCode code={(this.code)}></MrCode>
                </details>

                <aside className="mt-16">
                    <MrPanel title="MrIResource && MrReqProps"> <MrCode code={`
interface MrIResource {

    /**
     * resource: Pool<MrResource>
     * 一个pool的资源
     *
     * resource = pool[api]
     */
    resource?: any;

    /**
     * api?: string
     * resource.name
     */
    api?: string,

    /**
     * method?: string = 'post'
     * resource.method
     * @values post, put, patch, get, delete, mrdown, download
     */
    method?: string,

    /**
     * payload?: object
     * post request payload
     */
    payload?: object,

    /**
     * search?: object
     * get request params
     */
    search?: any,

    /**
     * transform?: function(res)
     * 返回数据处理
     */
    transform?: any,
}

interface MrReqProps {
    /**
     * MrResource
     * 请求接口
     */
    req?: MrIResource | MrIResource[];

    /**
     * pool?: MrResource
     * 连接池
     * @match 就近原则 >> MrServices.getResourcePool()
     */
    pool?: any;

    /**
     * transmit?: string | string[] = ['data:res.data'];
     * 基因遗传方式
     *
     * @values {string}
     * ::=> child.prop:_.get({res}, path)
     * ::=> 要传递给子元素的 prop : 取值路径
     */
    transmit?: string | string[];

    /**
     * transform?: function
     * 数据处理
     * 区别于 req.transform,  req.transform 用于单个请求，而 transform 用于所有请求
     * @v0.1.20.20180515
     */
    transform?: any;

    /**
     * force?: boolean = ifnvl(null, false)
     * 是否解除 MrReq设计req未产生变化阻止渲染的行为
     *
     * @values true ::-> 解除阻止渲染
     * @v0.1.20.20180515
     */
    force?: boolean;

    /**
     * result?: function(res);
     * 返回调用
     *
     * @mark 注意，当只有一个返回值得时候，返回对象 res = res[0]
     */
    result?: any;
}

                        `}></MrCode> </MrPanel>
                </aside>
            </article>
        );
    }
}
