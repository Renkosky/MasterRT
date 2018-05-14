import * as  React from 'react';
import {MrCol, MrFill, MrIcon, MrIf, MrElse, MrThen, MrPanel, MrServices, MrRules} from '../../lib';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';
import {Button} from 'antd';

interface MrsPanelProps {
}

export default class MrsPanel extends React.Component<MrsPanelProps, {}> {

    state: any = {
        showPanel: false,
        test: true,
    };

    rules: any = {
        'show.jingyesi': true,
        'show.dengguanquelou': false,
        'show.minnong': true
    };

    aaa: any = {
        a: {
            title: '静夜思',
            content: '床前明月光，疑是地上霜',
            info: {author: '李白'}
        },

        b: {
            title: '悯农',
            content: '锄禾日当午，汗滴禾下土'
        }
    };

    code: string = `
        <section className="mt-16">
        
            <MrIf condition={showPanel}>
                <MrPanel title="静夜思::李白 (只可见一首)">
                    床前明月光<br />
                    疑是地上霜<br />
                    举头望明月<br />
                    低头思故乡<br />
                </MrPanel>
                
                <MrElse>
                    <MrPanel title="悯农:: (只可见一首)">
                        锄禾日当午 汗滴禾下土<br />
                        谁知盘中餐 粒粒皆辛苦<br />
                    </MrPanel>
                </MrElse>
            </MrIf>
            
            <hr />
            
            <MrPanel title="按权限规则判断::rule" className="mt-16" bodyStyle={{'padding': '8px 16px'}}>
                <MrFill gutter={16}>
                    <MrRules keys={'show.jingyesi-1'}>
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

    showPanel() {
        let showPanel = !this.state.showPanel;
        this.setState({showPanel});
    }

    componentWillMount() {
        MrServices.setRules(this.rules);
    }

    render() {
        let {showPanel, test} = this.state;
        let abc = showPanel ? 'a' : 'b';

        return (
            <article className="mrs-article mrs-mrif">
                <header>MrIf <small>条件判断</small></header>
                <ins>条件判断，包含了子组件MrElse </ins>
                <main>
                    <Button type="primary" onClick={this.showPanel.bind(this)}>{showPanel ? '显示::悯农' : '显示::静夜思'}</Button>

                    <JsxParser
                        bindings={{showPanel, test}}
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

                    {/*<MrIf condition={showPanel}>*/}
                        {/*{this.aaa[abc].info.author}*/}
                    {/*</MrIf>*/}

                    {/*<MrIf condition={showPanel}>*/}
                        {/*{() => (<div>1. {this.aaa[abc].title} {this.aaa[abc].info.author}</div>)}*/}
                    {/*</MrIf>*/}


                    {/*<MrIf condition={showPanel}>*/}
                        {/*<MrThen>*/}
                            {/*{() => (<div>2. {this.aaa[abc].title} {this.aaa[abc].info.author}</div>)}*/}
                        {/*</MrThen>*/}

                        {/*<MrElse>*/}
                            {/*{() => (<div>2-else. {this.aaa[abc].title} {this.aaa[abc].content}</div>)}*/}
                        {/*</MrElse>*/}
                    {/*</MrIf>*/}

                    {/*<MrIf condition={showPanel}>*/}
                        {/*<MrElse>*/}
                            {/*<MrThen>*/}
                                {/*{() => (<div>3-else. {this.aaa[abc].title} {this.aaa[abc].content}</div>)}*/}
                            {/*</MrThen>*/}
                        {/*</MrElse>*/}
                    {/*</MrIf>*/}

                    {/*<MrRules keys={['!!show.dengguanquelou']}>*/}
                        {/*show.jingyesi-1*/}
                    {/*</MrRules>*/}


                    {/*<MrIf condition={showPanel}>*/}

                        {/*<MrThen>*/}
                            {/*{() => (*/}
                                {/*<div>abcdef</div>*/}
                            {/*)}*/}
                        {/*</MrThen>*/}

                        {/*<MrElse>*/}
                            {/*<div>锄禾日当午，汗滴禾下土</div>*/}
                        {/*</MrElse>*/}

                    {/*</MrIf>*/}
                </main>

                <details className="mt-16">
                    <summary>查看源码</summary>
                    <MrsCode code={this.code}></MrsCode>
                </details>

                <aside className="mt-16">
                    <table>
                        <tbody>
                            <tr>
                                <td>condition?: any</td>
                                <td>根据条件真假值，判断是否显示</td>
                            </tr>
                            <tr>
                                <td>rule?: string</td>
                                <td>
                                    规则权限 <br />

                                    规则为一个JSON，需要配置到通过MrServices进行配置 <br />

                                    <MrsCode code={'MrServices.setRules({\'show.jingyesi\': true,\n' +
                                    '        \'show.dengguanquelou\': false,\n' +
                                    '        \'show.minnong\': true})'}></MrsCode>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </article>
        );

    }
}
