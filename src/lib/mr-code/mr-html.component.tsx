import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';

interface MrHtmlProps {
    html: string;
}

export default class MrHtml extends React.Component<MrHtmlProps, {}> {

    render() {
        let rawHTML: any = {
            __html: this.props.html
        };

        return (<span dangerouslySetInnerHTML={rawHTML}></span>);
    }
}
