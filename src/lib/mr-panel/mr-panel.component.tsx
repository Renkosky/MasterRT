/**
 * MrPanel
 *
 * @creator mizi.lin
 *
 * @update mizi.lin@v0.1.21.20180516
 * ::=> 添加 append && prepend
 * * @update huao@v0.1.22.20181009
 * ::=> 将style绑到main第一个div
 */

import * as React from 'react';
import * as mu from 'mzmu';
import { default as MrServices } from '../mr-common/mr.services';
import MrIf from '../mr-condition/mr-if.component';
import '../assets/styles/mr-panel.less';
import MrElse from '../mr-condition/mr-else.component';
import MrFill from '../mr-fill/mr-fill.component';
import MrCol from '../mr-fill/mr-col.component';

export interface MrPanelProps {
    /**
     * title
     * - {string} 子标题用'::'来区分
     * - {JSX.Element} 使用JSX, 则无子标题概念
     */
    title?: JSX.Element | string;

    /**
     * panel 顶部额外添加
     * - 常用于操作icon 等
     */
    extra?: JSX.Element | React.Component;

    /**
     * Panel 边框样式
     * - @values wrapper, title, all
     * @default all
     */
    border?: string;

    /**
     * Panel 高度，为true时100%父元素高度
     *
     * @default false
     */
    h100?: boolean;

    /**
     * Panel body 顶部插入
     */
    prepend?: JSX.Element | React.Component;

    /**
     * Panel body 底部插入
     */
    append?: JSX.Element | React.Component;

    /**
     * Panel 中间插入
     */
    leftSide?: JSX.Element | React.Component;

    rightSide?: JSX.Element | React.Component;

    className?: string;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}

class MrPanel extends React.Component<MrPanelProps, {}> {
    runfn(fn: any) {
        if (typeof fn === 'function') {
            return fn();
        } else {
            return fn;
        }
    }

    render() {
        const { style, className = '', title = '', extra, bodyStyle, border = 'all', h100 } = this.props;
        const { prepend, append, leftSide, rightSide } = this.props;

        const classString = MrServices.cls(
            {
                'mr-panel': true,
                'h-100-i': h100,
                [`mr-border-${border}`]: !!border
            },
            className
        );

        return (
            <article className={classString} style={style}>
                {(title || extra) && (
                    <header>
                        <div className={'mr-panel-header'} key={'header'}>
                            {mu.run(
                                typeof title === 'string',
                                () => {
                                    const [_title, _subTitle] = (title as string).split('::');
                                    return (
                                        <React.Fragment>
                                            <span className={'mr-panel-title'}>{_title}</span>
                                            <MrIf condition={_subTitle} key={'subTitle'}>
                                                <small className={'mr-panel-subTitle'}>{_subTitle}</small>
                                            </MrIf>
                                        </React.Fragment>
                                    );
                                },
                                () => title
                            )}{' '}
                            {extra && (
                                <div className={'mr-panel-headerExtra'} key={'extra'}>
                                    {extra}
                                </div>
                            )}
                        </div>
                    </header>
                )}

                <MrIf condition={prepend}>
                    <section className="mr-panel-prepend">
                        <div>{this.runfn(prepend)}</div>
                    </section>
                </MrIf>

                <main>
                    <div>
                        <MrFill h100={true}>
                            {leftSide && (
                                <MrCol>
                                    {this.runfn(leftSide)}
                                </MrCol>
                            )}
                            <MrCol order={1} span={2}>
                                <div style={style} className={'mr-panel-body'}>
                                    {this.props.children}
                                </div>
                            </MrCol>
                            {rightSide && (
                                <MrCol>
                                    {this.runfn(rightSide)}
                                </MrCol>
                            )}
                        </MrFill>
                    </div>
                </main>

                <MrIf condition={append}>
                    <section className="mr-panel-append">
                        <div>{this.runfn(append)}</div>
                    </section>
                </MrIf>
            </article>
        );
    }
}

export default MrPanel;
