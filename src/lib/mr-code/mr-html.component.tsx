import * as React from 'react';

export interface MrHtmlProps {
    /**
     * 待输出的HTML文本
     * @default ''
     */
    html: string;
}

class MrHtml extends React.Component<MrHtmlProps, {}> {

    render() {
        let rawHTML: any = {
            __html: this.props.html
        };

        return (<span dangerouslySetInnerHTML={rawHTML}></span>);
    }
}

export {MrHtml};
export default MrHtml;