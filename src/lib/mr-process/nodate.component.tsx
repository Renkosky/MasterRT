import * as React from 'react';

interface NoDateComponentProps {
}

export default class NoDateComponent extends React.Component<NoDateComponentProps, {}> {
    render() {
        return (<div style={{padding: 16, textAlign: 'center'}}>NO DATA</div>);
    }
}