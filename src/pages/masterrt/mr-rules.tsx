import * as  React from 'react';
import {MrCol, MrFill, MrIcon, MrIf, MrElse, MrThen, MrPanel, MrServices, MrRules} from '../../lib';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';
import {Button, Select} from 'antd';

interface MrsRulesProps {
}

export default class MrsRules extends React.Component<MrsRulesProps, {}> {

    state: any = {
        showPanel: false,
        test: true,
    };

    rules: any = {
        'show.jingyesi': true,
        'show.dengguanquelou': false,
        'show.minnong': true
    };

    show(key, value) {
        this.rules[key] = value === 'true';
        MrServices.setRules(this.rules);
        this.forceUpdate();
    }

    code: string = `
        <section className="mt-16">
            
            <MrPanel title="按权限规则判断::rule" className="mt-16" bodyStyle={{'padding': '8px 16px'}}>
                <MrFill gutter={16}>
                    <MrRules keys={'show.jingyesi'}>
                        <MrCol span={1}>
                            <MrPanel title="静夜思::show.jingyesi">
                                床前明月光<br />
                                疑是地上霜<br />
                                举头望明月<br />
                                低头思故乡<br />
                            </MrPanel>
                        </MrCol>
                    </MrRules>
                    <MrRules keys={'show.dengguanquelou'}>
                        <MrCol span={1}>
                            <MrPanel title="登鹳雀楼::show.dengguanquelou">
                                白日依山尽，黄河入海流。<br />
                                欲穷千里目，更上一层楼。<br />
                            </MrPanel>
                        </MrCol>
                    </MrRules>
                    <MrRules keys={'show.minnong'}>
                        <MrCol span={1}>
                            <MrPanel title="悯农::show.minnong">
                                锄禾日当午 汗滴禾下土<br />
                                谁知盘中餐 粒粒皆辛苦<br />
                            </MrPanel>
                        </MrCol>
                    </MrRules>
                </MrFill>
            </MrPanel>
            
        </section>
    `;

    componentWillMount() {
        MrServices.setRules(this.rules);
    }

    render() {

        return (
            <article className="mrs-article mrs-mrif">
                <header>MrRules <small>v0.1.19.20180514</small></header>
                <ins>权限，按规则判断显示内容模块</ins>
                <main>
                    <Select defaultValue={'true'} onChange={this.show.bind(this, 'show.jingyesi')}>
                        <Select.Option value={'true'}>显示::静夜思</Select.Option>
                        <Select.Option value={'false'}>隐藏::静夜思</Select.Option>
                    </Select>

                    <Select defaultValue={'false'} onChange={this.show.bind(this, 'show.dengguanquelou')}>
                        <Select.Option value={'true'}>显示::登鹳雀楼</Select.Option>
                        <Select.Option value={'false'}>隐藏::登鹳雀楼</Select.Option>
                    </Select>

                    <Select defaultValue={'true'} onChange={this.show.bind(this, 'show.minnong')}>
                        <Select.Option value={'true'}>显示::悯农</Select.Option>
                        <Select.Option value={'false'}>隐藏::悯农</Select.Option>
                    </Select>

                    <JsxParser
                        components={{
                            MrIf,
                            MrElse,
                            MrThen,
                            MrRules,
                            MrPanel,
                            MrFill,
                            MrCol,
                            MrsCode
                        }}
                        jsx={this.code}
                    ></JsxParser>
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={this.code}></MrsCode>
                </details>

                <aside className="mt-16">
<MrsCode code="
interface MrRulesProps extends MrInterface {
    /**
     * keys: string | string[];
     * 权限的规则条件
     *
     * @value {string} 其值为权限对象的key的规则配置 (key || !!key || !!!key ...)
     *        {string[]} 若keys为数组，则匹配值最终以或计算 rules[key0] || rules[key1] || rules[key2] ....
     *
     * @mark 只允许'!'作用在key上
     * exp. keys = 'a.b.c'; keys = ['a.b.c']; key = ['a.b.c', '!a.c.d', '!c']
     */
    keys: string | string[];

    /**
     * rules?: {[key: string]: boolean}[]
     * 权限规则字典
     * @match 就近原则 >> MrServices.setRules(rules: object)
     */
    rules?: object[];

    /**
     * defNoRuleValue?: boolean = true
     * 规则不存在默认规则
     * @match 就近原则 >> MrServices.setRuleValue(val: boolean)
     */
    defNoRuleValue?: boolean;
}"></MrsCode>
                </aside>
            </article>
        );

    }
}
