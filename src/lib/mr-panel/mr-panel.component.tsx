/**
 * MrPanel
 *
 * @creator mizi.lin
 *
 * @update mizi.lin@v0.1.21.20180516
 * ::=> 添加 append && prepend
 */

import * as React from 'react';
import {MrIf} from '../';
import * as mu from 'mzmu';
declare var require: any;
require('../assets/styles/mr-panel.less');
import {MrServices} from '..';

interface MrPanelProps {
    style?: any;
    bodyStyle?: any;
    title?: string;
    extra?: any;
    className?: string;
    // wrapper, title, all
    border?: string;
    h100?: string;

    prepend?: any;
    append?: any;
}

export default class MrPanel extends React.Component<MrPanelProps, {}> {

    render() {

        const {style, className = '', title = '', extra, bodyStyle, border = 'all', h100} = this.props;
        const {prepend, append} = this.props;
        const [_title, _subTitle] = title.split('::');

        const classString = MrServices.cls({
            'mr-panel': true,
            'h-100-i': h100,
            [`mr-border-${border}`]: !!border
        }, className);

        return (
            <article style={style} className={classString}>
                <header>
                    <div className={'mr-panel-header'}>
                        <span className={'mr-panel-title'}>{_title}</span>
                        <MrIf condition={_subTitle}>
                            <small className={'mr-panel-subTitle'}>{_subTitle}</small>
                        </MrIf>
                        <div className={'mr-panel-headerExtra'}>{extra}</div>
                    </div>
                </header>

                <MrIf condition={prepend}>
                    <section className="mr-panel-prepend">
                        <div>
                            {mu.run(prepend, (prepend) => prepend)}
                        </div>
                    </section>
                </MrIf>

                <main>
                    <div style={bodyStyle} className={'mr-panel-body'}>
                        {this.props.children}
                    </div>
                </main>

                <MrIf condition={append}>
                    <section className="mr-panel-append">
                        <div>
                            {mu.run(append, (append) => append)}
                        </div>
                    </section>
                </MrIf>
            </article>
        );
    }
}