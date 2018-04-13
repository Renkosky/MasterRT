import * as React from 'react';
import * as hanabi from 'hanabi';
import * as _ from 'lodash';

interface MrsCodeProps {
    code: string;
}

export default class MrsCode extends React.Component<MrsCodeProps, {}> {
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
