import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {MrCol, MrFill, MrPanel, MrEchartsPanel, MrResource} from '../../lib';
import JsxParser from 'react-jsx-parser';
import MrCode from '../../lib/mr-code/mr-code.component';
interface MrsEchartsPanelProps {
}

export default class MrsEchartsPanel extends React.Component<MrsEchartsPanelProps, {}> {

    req: any = {
        api: 'line',
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
    };

    pie: any[] = [
        {
            value: 78499,
            name: '百日依山郡'
        },
        {
            value: 131536,
            name: '黄河如海浪'
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

    state: any = {
        req: this.req
    };

    code = `
        <MrEchartsPanel
                title="Use Data"
                style={{height: 400}} chartTypes={'pie::ring::ringLabel'} data={pie} 
                transform={[{'@convert': {'value': '$rowRate'}}]} 
                append={<div>在饼图底部插入内容</div>} />

        
    `;

    render() {
        let {pie} = this;
        let {req} = this.state;

        let url = "/services/select-templates/ksi.all_index_list/?apiName=ksi.all_index_list&headers=kol::KOLName,gender::Gender,forcus_platform::KOLPlatform,ksi::KSI,ksiRank::KSIRank,searchIndex::SearchIndex,searchIndexRank::SearchIndexRank,brandIndexAvg::BrandIndex,brandIndexAvgRank::BrandIndexRank,purchaseIntention::PurchaseIntention,purchaseIntentionRank::PurchaseIntentionRank,socialIndex::SocialIndex,weibo_name::WeiboName,wechat_name::WeChatName,red_name::TheRedName,weibo_total_fans::WeiboTotalFans,weibo_fans_quality::WeiboFansQuality,red_fans::TheRedFans"

        let abc = MrResource.pool(url);

        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrEchartsPanel <small>@v0.1.24.20180523</small></header>
                <ins onClick={() => (abc.mrdown({
                    downloadName: 'ksi-1532068145056.xlsx'
                }, {"paramMap":{"date":["2018-04"]},"sample":false}))}>一个基于MrPanel, MrReq, MrEcharts 集成的显示UI，支持各种激活Echarts方式，以及使用Tool控制Echarts显示方式</ins>
                <main>
                    <JsxParser
                        bindings={{pie, req, click: (e) => {
                                console.debug(e);
                            }}}
                        components={{MrFill, MrCol, MrEchartsPanel}}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrCode code={(this.code)}></MrCode>
                </details>

                <MrEchartsPanel
                    title="Use Req"
                    style={{height: 400}}
                    chartTypes={'bar::percent100'}
                    leftSide={<div style={{width: 100}}>aaaa</div>}
                    req={req}
                />

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
                                <tr>
                                    <td>result?: function(options, result)</td>
                                    <td>Echarts 即将渲染前返回数据，包含 options, data, dataView</td>
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
                            </tbody>
                        </table>
                    </MrPanel>
                </aside>
            </article>
        );
    }
}