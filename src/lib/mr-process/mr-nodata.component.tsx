import * as React from 'react';

export interface NoDateComponentProps {
}

class MrNodataComponent extends React.Component<NoDateComponentProps, {}> {
    render() {
        return (<div style={{padding: 16, textAlign: 'center'}}>NO DATA</div>);
    }
}

export default MrNodataComponent;