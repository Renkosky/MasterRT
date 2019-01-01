import * as React from 'react';
import * as _ from 'lodash';
import { MrCol, MrFill, MrPanel, MrEchartsPanel, MrResource } from '../../lib';
import JsxParser from 'react-jsx-parser';
import MrCode from '../../lib/mr-code/mr-code.component';
import { Button } from 'antd';
import { quantile, sum, product } from 'simple-statistics';
import $mrDataSet, { MrDataSet } from 'src/lib/mr-data-set/mr-data-set';
import mu from 'mzmu';
import mzm from 'mzm';

interface MrsEchartsPanelProps {}

export default class MrsEchartsPanel extends React.Component<MrsEchartsPanelProps, {}> {
    req: any = {
        api: 'line',
        method: 'get',
        // 数据修改
        transform: (res) => {
            let { data } = res;
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
            value1: 7849,
            name: '百日依山郡'
        },
        {
            value: 131536,
            value1: 13153,
            name: '黄河如海浪'
        },
        {
            value: 246050,
            value1: 24605,
            name: 'A Main'
        },
        {
            value: 284390,
            value1: 28439,
            name: 'A Plus'
        },
        {
            value: 394088,
            value1: 39408,
            name: 'B'
        },
        {
            value: 35022,
            value1: 3502,
            name: 'C'
        },
        {
            value: 316762,
            value1: 31676,
            name: 'SUV'
        },
        {
            value: 34069,
            value1: 406,
            name: 'MPV'
        }
    ];

    line = [
        {
            date: '2018-04-11',
            type: 'Wechat',
            volume: 696
        },
        {
            date: '2018-04-11',
            type: 'News',
            volume: 598
        },
        {
            date: '2018-04-11',
            type: 'BBS',
            volume: 806
        },
        {
            date: '2018-04-11',
            type: 'Weibo',
            volume: 861
        },
        {
            date: '2018-04-11',
            type: 'Blog',
            volume: 23
        },
        {
            date: '2018-04-11',
            type: 'Share',
            volume: 7
        },
        {
            date: '2018-04-11',
            type: 'Q&A',
            volume: 16
        },
        {
            date: '2018-04-11',
            type: 'EC',
            volume: 1
        },
        {
            date: '2018-04-11',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-12',
            type: 'Wechat',
            volume: 583
        },
        {
            date: '2018-04-12',
            type: 'News',
            volume: 382
        },
        {
            date: '2018-04-12',
            type: 'BBS',
            volume: 301
        },
        {
            date: '2018-04-12',
            type: 'Weibo',
            volume: 175
        },
        {
            date: '2018-04-12',
            type: 'Blog',
            volume: 11
        },
        {
            date: '2018-04-12',
            type: 'Share',
            volume: 4
        },
        {
            date: '2018-04-12',
            type: 'Q&A',
            volume: 8
        },
        {
            date: '2018-04-12',
            type: 'EC',
            volume: 1
        },
        {
            date: '2018-04-12',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-13',
            type: 'Wechat',
            volume: 588
        },
        {
            date: '2018-04-13',
            type: 'News',
            volume: 538
        },
        {
            date: '2018-04-13',
            type: 'BBS',
            volume: 255
        },
        {
            date: '2018-04-13',
            type: 'Weibo',
            volume: 126
        },
        {
            date: '2018-04-13',
            type: 'Blog',
            volume: 16
        },
        {
            date: '2018-04-13',
            type: 'Share',
            volume: 9
        },
        {
            date: '2018-04-13',
            type: 'Q&A',
            volume: 7
        },
        {
            date: '2018-04-13',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-13',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-14',
            type: 'Wechat',
            volume: 515
        },
        {
            date: '2018-04-14',
            type: 'News',
            volume: 378
        },
        {
            date: '2018-04-14',
            type: 'BBS',
            volume: 238
        },
        {
            date: '2018-04-14',
            type: 'Weibo',
            volume: 179
        },
        {
            date: '2018-04-14',
            type: 'Blog',
            volume: 13
        },
        {
            date: '2018-04-14',
            type: 'Share',
            volume: 5
        },
        {
            date: '2018-04-14',
            type: 'Q&A',
            volume: 5
        },
        {
            date: '2018-04-14',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-14',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-15',
            type: 'Wechat',
            volume: 391
        },
        {
            date: '2018-04-15',
            type: 'News',
            volume: 284
        },
        {
            date: '2018-04-15',
            type: 'BBS',
            volume: 239
        },
        {
            date: '2018-04-15',
            type: 'Weibo',
            volume: 219
        },
        {
            date: '2018-04-15',
            type: 'Blog',
            volume: 8
        },
        {
            date: '2018-04-15',
            type: 'Share',
            volume: 4
        },
        {
            date: '2018-04-15',
            type: 'Q&A',
            volume: 3
        },
        {
            date: '2018-04-15',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-15',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-16',
            type: 'Wechat',
            volume: 496
        },
        {
            date: '2018-04-16',
            type: 'News',
            volume: 295
        },
        {
            date: '2018-04-16',
            type: 'BBS',
            volume: 197
        },
        {
            date: '2018-04-16',
            type: 'Weibo',
            volume: 142
        },
        {
            date: '2018-04-16',
            type: 'Blog',
            volume: 7
        },
        {
            date: '2018-04-16',
            type: 'Share',
            volume: 11
        },
        {
            date: '2018-04-16',
            type: 'Q&A',
            volume: 6
        },
        {
            date: '2018-04-16',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-16',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-17',
            type: 'Wechat',
            volume: 565
        },
        {
            date: '2018-04-17',
            type: 'News',
            volume: 364
        },
        {
            date: '2018-04-17',
            type: 'BBS',
            volume: 248
        },
        {
            date: '2018-04-17',
            type: 'Weibo',
            volume: 177
        },
        {
            date: '2018-04-17',
            type: 'Blog',
            volume: 21
        },
        {
            date: '2018-04-17',
            type: 'Share',
            volume: 7
        },
        {
            date: '2018-04-17',
            type: 'Q&A',
            volume: 3
        },
        {
            date: '2018-04-17',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-17',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-18',
            type: 'Wechat',
            volume: 435
        },
        {
            date: '2018-04-18',
            type: 'News',
            volume: 405
        },
        {
            date: '2018-04-18',
            type: 'BBS',
            volume: 269
        },
        {
            date: '2018-04-18',
            type: 'Weibo',
            volume: 198
        },
        {
            date: '2018-04-18',
            type: 'Blog',
            volume: 14
        },
        {
            date: '2018-04-18',
            type: 'Share',
            volume: 6
        },
        {
            date: '2018-04-18',
            type: 'Q&A',
            volume: 0
        },
        {
            date: '2018-04-18',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-18',
            type: 'MovieComment',
            volume: 0
        }
    ];

    line2 = [
        {
            date: '2018-04-11',
            type: 'Wechat',
            volume: 696
        },

        {
            date: '2018-04-11',
            type: 'BBS',
            volume: 806
        },
        {
            date: '2018-04-11',
            type: 'Weibo',
            volume: 861
        },
        {
            date: '2018-04-11',
            type: 'Blog',
            volume: 23
        },
        {
            date: '2018-04-11',
            type: 'Share',
            volume: 7
        },
        {
            date: '2018-04-11',
            type: 'Q&A',
            volume: 16
        },
        {
            date: '2018-04-11',
            type: 'EC',
            volume: 1
        },

        {
            date: '2018-04-12',
            type: 'Wechat',
            volume: 583
        },
        {
            date: '2018-04-12',
            type: 'News',
            volume: 382
        },
        {
            date: '2018-04-12',
            type: 'BBS',
            volume: 301
        },
        {
            date: '2018-04-12',
            type: 'Weibo',
            volume: 175
        },
        {
            date: '2018-04-12',
            type: 'Blog',
            volume: 11
        },

        {
            date: '2018-04-12',
            type: 'EC',
            volume: 1
        },
        {
            date: '2018-04-12',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-13',
            type: 'Wechat',
            volume: 588
        },
        {
            date: '2018-04-13',
            type: 'News',
            volume: 538
        },
        {
            date: '2018-04-13',
            type: 'BBS',
            volume: 255
        },
        {
            date: '2018-04-13',
            type: 'Weibo',
            volume: 126
        },
        {
            date: '2018-04-13',
            type: 'Blog',
            volume: 16
        },
        {
            date: '2018-04-13',
            type: 'Share',
            volume: 9
        },
        {
            date: '2018-04-13',
            type: 'Q&A',
            volume: 7
        },
        {
            date: '2018-04-13',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-13',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-14',
            type: 'Wechat',
            volume: 515
        },
        {
            date: '2018-04-14',
            type: 'News',
            volume: 378
        },
        {
            date: '2018-04-14',
            type: 'BBS',
            volume: 238
        },
        {
            date: '2018-04-14',
            type: 'Weibo',
            volume: 13
        },
        {
            date: '2018-04-14',
            type: 'Blog',
            volume: 13
        },
        {
            date: '2018-04-14',
            type: 'Share',
            volume: 5
        },

        {
            date: '2018-04-15',
            type: 'Wechat',
            volume: 391
        },
        {
            date: '2018-04-15',
            type: 'News',
            volume: 284
        },
        {
            date: '2018-04-15',
            type: 'BBS',
            volume: 239
        },
        {
            date: '2018-04-15',
            type: 'Weibo',
            volume: 219
        },

        {
            date: '2018-04-15',
            type: 'Share',
            volume: 4
        },
        {
            date: '2018-04-15',
            type: 'Q&A',
            volume: 3
        },
        {
            date: '2018-04-15',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-15',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-16',
            type: 'Wechat',
            volume: 496
        },
        {
            date: '2018-04-16',
            type: 'News',
            volume: 295
        },
        {
            date: '2018-04-16',
            type: 'BBS',
            volume: 197
        },
        {
            date: '2018-04-16',
            type: 'Weibo',
            volume: 142
        },
        {
            date: '2018-04-16',
            type: 'Blog',
            volume: 7
        },
        {
            date: '2018-04-16',
            type: 'Share',
            volume: 11
        },
        {
            date: '2018-04-16',
            type: 'Q&A',
            volume: 6
        },
        {
            date: '2018-04-16',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-16',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-17',
            type: 'Wechat',
            volume: 565
        },
        {
            date: '2018-04-17',
            type: 'News',
            volume: 364
        },
        {
            date: '2018-04-17',
            type: 'BBS',
            volume: 248
        },
        {
            date: '2018-04-17',
            type: 'Weibo',
            volume: 177
        },
        {
            date: '2018-04-17',
            type: 'Blog',
            volume: 21
        },

        {
            date: '2018-04-17',
            type: 'Q&A',
            volume: 3
        },
        {
            date: '2018-04-17',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-17',
            type: 'MovieComment',
            volume: 0
        },
        {
            date: '2018-04-18',
            type: 'Wechat',
            volume: 435
        },
        {
            date: '2018-04-18',
            type: 'News',
            volume: 435
        },
        {
            date: '2018-04-18',
            type: 'BBS',
            volume: 269
        },
        {
            date: '2018-04-18',
            type: 'Weibo',
            volume: 198
        },
        {
            date: '2018-04-18',
            type: 'Blog',
            volume: 14
        },
        {
            date: '2018-04-18',
            type: 'Share',
            volume: 6
        },
        {
            date: '2018-04-18',
            type: 'Q&A',
            volume: 0
        },
        {
            date: '2018-04-18',
            type: 'EC',
            volume: 0
        },
        {
            date: '2018-04-18',
            type: 'MovieComment',
            volume: 0
        },

        {
            date: '2018-04-18',
            type: 'ssss',
            volume: 0
        }
    ];

    state: any = {
        req: this.req,
        tfIndex: 0
    };

    render() {
        let { pie } = this;
        let { req } = this.state;

        let url =
            '/services/select-templates/ksi.all_index_list/?apiName=ksi.all_index_list&headers=kol::KOLName,gender::Gender,forcus_platform::KOLPlatform,ksi::KSI,ksiRank::KSIRank,searchIndex::SearchIndex,searchIndexRank::SearchIndexRank,brandIndexAvg::BrandIndex,brandIndexAvgRank::BrandIndexRank,purchaseIntention::PurchaseIntention,purchaseIntentionRank::PurchaseIntentionRank,socialIndex::SocialIndex,weibo_name::WeiboName,wechat_name::WeChatName,red_name::TheRedName,weibo_total_fans::WeiboTotalFans,weibo_fans_quality::WeiboFansQuality,red_fans::TheRedFans';

        let abc = MrResource.pool(url);

        let tf: any = [{ '@convert': { value: 'value1' } }, { '@convert': { value: 'value' } }];

        tf = tf[this.state.tfIndex % 2];

        // console.debug(MrDataSet.min([21, 234, 2, 423, 213, 1321, 3, 13, 13], (v) => v * Math.random()));
        //
        // console.debug(
        //     MrDataSet.sum(
        //         [{ value: 211 }, { value: 11 }, { value: 21 }, { value: 61 }, { value: 12 }, { value: 331 }, { value: 122 }],
        //         (item, inx) => item.value
        //     ),
        //
        // );

        // console.debug('product', product([3, 5, 8]));

        // console.debug(MrDataSet.order(pie, 'value', 'desc'));

        // console.debug(mu.groupArray(this.line, 'date', 'type'));

        // console.debug(_.groupBy( MrDataSet.order(this.line, 'type'), 'date'));

        // const dv = new MrDataSet.View().source(this.line);

        // dv.transform({
        //     type: 'aggregate', // 别名summary
        //     fields: ['volume'],        // 统计字段集
        //     // operations: ['max']    // 统计操作集
        // });

        // dv.transform({
        //     type: 'partition',
        //     groupBy: ['date'],
        //     orderBy: ['type'],
        // });

        // dv.transform({
        //     type: 'proportion',
        //     field: 'volume',           // 统计销量
        //     dimension: 'volume',       // 每年的占比
        //     as: 'proportion'            // 结果存储在 percent 字段
        // });

        // dv.rows = mu.map(dv.rows, (item) => {
        //     item.total = item.volume / item.proportion;
        //     return item;
        // });

        // dv.transform({
        //     type: 'aggregate', // 别名summary
        //     fields: 'volume',        // 统计字段集
        //     operations: ['sum'],    // 统计操作集
        //     as: 'total',            // 存储字段集
        // });

        // console.debug('::----::', dv.rows);

        // console.debug('::----::', MrDataSet.percent(this.line, 'volume', 'date'));

        let temp: any[] = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 6 }, { y: 1 }, { z: 'hello' }, { y: 2 }];

        // console.debug('::- fill -::', MrDataSet.fill(this.line2, 'date'), MrDataSet.subset(this.line2, [-5]), this.line2);

        // const data = [
        //     { country: "USA", gold: 10, silver: 20 },
        //     { country: "Canada", gold: 7, silver: 26 }
        // ];

        // console.debug('::- fold -::', MrDataSet.fold(data, ['gold', 'silver']));

        // console.debug($mrDataSet);

        // console.debug('::- aggregate -::', $mrDataSet.aggregate('average', this.line2, 'volume', 'date'));

        const testCSV = `Expt,Run,Speed
1,1,850
1,2,740
1,3,900
1,4,1070`;

        let $Ds = new MrDataSet(testCSV, { sourceType: 'csv' });

        // $Ds.transform(
        //     {
        //         type: 'map',
        //         args: [
        //             (item) => {
        //                 return item;
        //             }
        //         ]
        //     },
        //     {
        //         type: 'filter',
        //         args: [
        //             (item) => {
        //                 return item.volume > 100;
        //             }
        //         ]
        //     },
        //     {
        //         type: 'fill',
        //         args: ['date']
        //     },
        //     {
        //         type: 'group',
        //         args: ['date']
        //     }
        // );

        // let a = {a: 1, b: 2};
        // let c = {b: 3, c: 4, e: 5};
        // let e = {b: 30, d: 4, f: 5};
        //
        // console.debug( mu.extend(a, c, e));
        // console.debug( mzm.extend(a, c, e));

        // console.debug( mzm.format('江山如此多娇, {0}', ['引无数英雄竞折腰']) );
        // console.debug( mzm.format('江山如此多娇, {content}', {content: '引无数英雄竞折腰'}) );

        // console.debug(mzm.format(1923771695.834623));
        // console.debug(mzm.format(1923771635.83));
        // console.debug(mzm.format(1923771635));
        // console.debug(mzm.format(1635.0));
        // console.debug(mzm.format(231000));
        // console.debug(mzm.format(new Date()));
        // console.debug(mzm.format(1545913003315, true));
        // console.debug(mzm.format(true, ['off', 'on']));

        // console.debug('-------------------------');
        //
        // console.debug(mu.format(1234567890));
        // console.debug(mzm.format(1234567890));
        // // -> '1,234,567,890'
        // console.debug(':::::::::::');
        // console.debug(mu.format(1234567890.5234));
        // console.debug(mzm.format(1234567890.5234));
        // // -> '1,234,567,890.5234'
        // console.debug(':::::::::::');
        // console.debug(mu.format(1234567890.5234, 'round'));
        // console.debug(mzm.format(1234567890.5234, 'round'));
        // // -> "1,234,567,891"
        // console.debug(':::::::::::');
        // // ::: 截取小数点长度
        // console.debug(mu.format(0.5264, ':2'));
        // console.debug(mzm.format(0.5264, ':2'));
        // // -> '0.53'
        // console.debug(':::::::::::');
        // console.debug(mu.format(0.5264, 'floor:2'));
        // console.debug(mzm.format(0.5264, 'floor:2'));
        // // -> 0.52
        // console.debug(':::::::::::');
        // console.debug(mu.format(0, ':2'));
        // console.debug(mzm.format(0, ':2'));
        // // -> '0'
        // console.debug(':::::::::::');
        // console.debug(mu.format(0, ':-2'));
        // console.debug(mzm.format(0, ':-2'));
        // // -> '0.00'
        // console.debug(':::::::::::');
        // // ::: 百分比/千分比
        // console.debug(mu.format(1.2365, '::'));
        // console.debug(mzm.format(1.2365, '::'));
        // // -> "124%"
        // console.debug(':::::::::::');
        // console.debug(mu.format(1.2365, '::5'));
        // console.debug(mzm.format(1.2365, '::5'));
        // // -> "123.65%"
        // console.debug(':::::::::::');
        // console.debug(mu.format(1.2365, '::-5'));
        // console.debug(mzm.format(1.2365, '::-5'));
        // // -> "123.65000%"
        // console.debug(':::::::::::');
        // console.debug(mu.format(1.2365, 'round:permile:2'));
        // console.debug(mzm.format(1.2365, 'round:permile:2'));
        // -> "1236.5‰"

        // console.debug(mzm.format(1.2365, {unit: '%'}));
        // console.debug(mzm.add(0.1, 0.2));
        // console.debug(mzm.subtract(0.1, 0.2));

        return (
            <article className="mrs-article mrs-MrFill">
                <header>
                    MrEchartsPanel <small>@v0.1.24.20180523</small>
                </header>
                <ins
                    onClick={() =>
                        abc.mrdown(
                            {
                                downloadName: 'ksi-1532068145056.xlsx'
                            },
                            { paramMap: { date: ['2018-04'] }, sample: false }
                        )
                    }>
                    一个基于MrPanel, MrReq, MrEcharts 集成的显示UI，支持各种激活Echarts方式，以及使用Tool控制Echarts显示方式
                </ins>

                <Button
                    htmlType={'button'}
                    onClick={() =>
                        this.setState({
                            tfIndex: this.state.tfIndex + 1
                        })
                    }>
                    555555
                </Button>

                <MrEchartsPanel
                    title="Use Data"
                    style={{ height: 400 }}
                    chartTypes={'pie::ring::ringLabel'}
                    data={pie}
                    transform={[tf]}
                    chartClick={() => console.debug(2222222)}
                    append={<div>在饼图底部插入内容</div>}
                />

                <MrEchartsPanel
                    title="Use Req"
                    style={{ height: 400 }}
                    chartTypes={'bar::percent100'}
                    leftSide={<div style={{ width: 100 }}>aaaa</div>}
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
                                    <td>downloadName?: string = $title + $timestamp </td>
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
