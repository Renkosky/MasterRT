import * as React from 'react';
import {MrIf} from '../mr-if/mr-if.component';
declare var require: any;
require('../assets/styles/mr-panel.less');
import * as classNames from 'classnames';
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
}

export class MrPanel extends React.Component<MrPanelProps, {}> {


    render() {

        const {style, className = '', title = '', extra, bodyStyle, border = 'all', h100} = this.props;
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

                <main>
                    <div style={bodyStyle} className={'mr-panel-body'}>
                        {this.props.children}
                    </div>
                </main>
            </article>
        );
    }
}