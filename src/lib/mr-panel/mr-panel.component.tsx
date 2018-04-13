import * as React from 'react';
import {MrIf} from '../mr-if/mr-if.component';
declare var require: any;
require('../assets/styles/mr-panel.less');
import * as classNames from 'classnames';

interface MrPanelProps {
    style?: any;
    bodyStyle?: any;
    title?: string;
    extra?: any;
    className?: string;
    // wrapper, title, all
    border?: string;
}

export class MrPanel extends React.Component<MrPanelProps, {}> {


    render() {

        const {style, className = '', title = '', extra, bodyStyle, border = 'all'} = this.props;
        const [_title, _subTitle] = title.split('::');

        const classString = classNames({
            'ms-panel': true,
            [`ms-border-${border}`]: !!border
        }, className);

        return (
            <article style={style} className={classString}>
                <header>
                    <div className={'ms-panel-header'}>
                        <span className={'ms-panel-title'}>{_title}</span>
                        <MrIf condition={_subTitle}>
                            <small className={'ms-panel-subTitle'}>{_subTitle}</small>
                        </MrIf>
                        <div className={'ms-panel-headerExtra'}>{extra}</div>
                    </div>
                </header>

                <section>
                    <div style={bodyStyle} className={'ms-panel-body'}>
                        {this.props.children}
                    </div>
                </section>
            </article>
        );
    }
}