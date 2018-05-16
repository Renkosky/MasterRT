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

    code: string = `
        <section className="mt-16">
            <MrIf condition={showPanel}>
                <MrPanel title="静夜思::李白 ">
                    床前明月光<br />
                    疑是地上霜<br />
                    举头望明月<br />
                    低头思故乡<br />
                </MrPanel>
                
                <MrElse>
                    <MrPanel title="悯农::李绅">
                        锄禾日当午 汗滴禾下土<br />
                        谁知盘中餐 粒粒皆辛苦<br />
                    </MrPanel>  
                </MrElse>
            </MrIf>
        </section>
        
        <MrIf condition={showPanel}>
            {/*!!!因显示源码控件，不支持直接使用匿名函数，所以用函数名代替*/}
            {/*<MrThen>*/}
                {/*{() => (*/}
                    {/*<MrPanel title="静夜思::李白">*/}
                        {/*床前明月光<*/}
                        {/*疑是地上霜<*/}
                        {/*举头望明月<*/}
                        {/*低头思故乡<*/}
                    {/*</MrPanel>*/}
                {/*)}*/}
            {/*</MrThen>*/}
            <MrThen>{jingyesi}</MrThen>
            <MrElse>{minnong}</MrElse>
        </MrIf>
    `;

    showPanel() {
        let showPanel = !this.state.showPanel;
        this.setState({showPanel});
    }

    componentWillMount() {
    }

    render() {
        let {showPanel} = this.state;

        return (
            <article className="mrs-article mrs-mrif">
                <header>MrIf <small>v0.1.19.20180514</small></header>
                <ins>条件判断，可代替在源码中使用三元或{'&&'}等运算符 </ins>
                <main>
                    <Button type="primary" onClick={this.showPanel.bind(this)}>{showPanel ? '显示::悯农' : '显示::静夜思'}</Button>

                    <JsxParser
                        bindings={{
                            showPanel,
                            jingyesi: ()=>(
                                <MrPanel title="静夜思::李白">
                                    床前明月光<br />
                                    疑是地上霜<br />
                                    举头望明月<br />
                                    低头思故乡<br />
                                </MrPanel>
                            ),
                            minnong: ()=>(
                                <MrPanel title="悯农::李绅">
                                    锄禾日当午 汗滴禾下土<br />
                                    谁知盘中餐 粒粒皆辛苦<br />
                                </MrPanel>
                            )
                        }}

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

                <MrPanel title="接口 Interface" className="mt-16">
<MrsCode code={`
export interface MrIfProps extends MrInterface {
    /**
     * condition: any
     * 执行条件
     * 可以是任意值
     */
    condition?: any;

    /**
     * falseType?: string = 'if'
     * 假值类型
     *
     * @creator mizi.lin
     * 我认为, 在JS的世界里没有绝对的"真 true"和"假 false"（也许真实的世界也是如此）
     * 我对某一种特性进行区分其真假值
     *
     * 1. exist: 存在为真，不存在为假
     * ::=> 即在 null, undefined 为 false, 其他情况为真
     * 2. if 使用 if 运算符判断的假为 false, 其他为真
     * ::=> if(condition) 或 !condition 或 三元
     * 3. empty: 所有我们认为空或没有都未false
     * ::=> [] 空数组，{} 空对象，noop 空函数，0，' ' 空字符串， undefined, null
     */
    falseType?: string;
}

static defaultProps: any = {
    falseType: 'if'
};

`} />

                </MrPanel>

                <MrPanel title="使用指南" className="mt-16">
<MrsCode code={`
/**
 * 在使用MrIf中，若碰到condition成立前，子元素内变量未赋值情况
 * React会报错，因为在React机制中会预先执行变量环境，
 * 若变量未申明，则报错
 * 当这样的情况时，可以将子元素包裹在匿名函数里，待condition成立时执行
 *
 * @Mark 所有的条件组件均如此，如MrElse, MrRules 等
 */

// 若MrIf中没有其他元素的时候可以直接使用匿名函数
<MrIf condition={conditon}>
    {() => (<div>...</div>)}
</MrIf>

// 若有其他元素时，请将匿名函数包裹在MrThen下面
<MrIf condition={conditon}>
    <MrThen>
        {() => (<div>...</div>)}
    </MrThen>
    <MrElse>...</MrElse>
</MrIf>

`} />
                </MrPanel>
            </article>
        );

    }
}
