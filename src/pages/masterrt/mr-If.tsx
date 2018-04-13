import * as  React from 'react';
import {MrCol, MrFill, MrIcon, MrIf, MrPanel, MrServices} from 'masterrt';
import './masterrt.less';

import MrsCode from '../../components/MrsCode';

import JsxParser from 'react-jsx-parser';
import {Button} from 'antd';

interface MrsPanelProps {
}

export default class MrsPanel extends React.Component<MrsPanelProps, {}> {

    state: any = {
        showPanel: false
    };

    rules: any = {
        'show.jingyesi': true,
        'show.dengguanquelou': false,
        'show.minnong': true
    };

    code: string = `
        <section>
        
            <MrIf condition="{showPanel}">
                <MrPanel title="静夜思::李白">
                    床前明月光<br />
                    疑是地上霜<br />
                    举头望明月<br />
                    低头思故乡<br />
                </MrPanel>
            </MrIf>
            
            <MrPanel title="按权限规则判断::rule" bodyStyle="{{'padding':" 8}}>
                <MrFill gutter="{16}" style={{}}>
                    <MrIf rules="{'show.jingyesi-1'}">
                        <MrCol span="1">
                            <MrPanel title="静夜思::show.jingyesi">
                                床前明月光<br />
                                疑是地上霜<br />
                                举头望明月<br />
                                低头思故乡<br />
                            </MrPanel>
                        </MrCol>
                    </MrIf>
                    <MrIf rules="{'show.dengguanquelou'}">
                        <MrCol span="1">
                            <MrPanel title="登鹳雀楼::show.dengguanquelou">
                                白日依山尽，黄河入海流。<br />
                                欲穷千里目，更上一层楼。<br />
                            </MrPanel>
                        </MrCol>
                    </MrIf>
                    <MrIf rules="{'show.minnong'}">
                        <MrCol span="1">
                            <MrPanel title="悯农::show.minnong">
                                锄禾日当午 汗滴禾下土<br />
                                谁知盘中餐 粒粒皆辛苦<br />
                            </MrPanel>
                        </MrCol>
                    </MrIf>
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
        let {showPanel} = this.state;

        return (
            <article className="mrs-article mrs-MrFill">
                <header>MrPanel <small>一个集成的盒子</small></header>
                <ins>一个拥有标题，子标题，工具条的容器</ins>
                <main>
                    <Button type="primary" onClick={this.showPanel.bind(this)}>{showPanel ? '隐藏' : '显示'}::静夜思</Button>

                    <JsxParser
                        bindings={{showPanel}}
                        components={{
                            MrIf,
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
