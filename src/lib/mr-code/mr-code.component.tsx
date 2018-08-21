import * as React from 'react';
import {default as hanabi} from 'hanabi';
import * as _ from 'lodash';

interface MrCodeProps {
    code: string;
}

/**
 * 显示HTML代码块
 *
 * @todo 换掉 hanabi，换一个可以分行以及自动代码样式美化的
 */
export default class MrCode extends React.Component<MrCodeProps, {}> {
    render() {
        let rawHTML: any = {
            __html: hanabi(this.props.code)
        };

        return (
            /*<p style={{textAlign: 'left', whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={rawHTML}></p>*/
            <pre dangerouslySetInnerHTML={rawHTML}></pre>
        );
    }
}