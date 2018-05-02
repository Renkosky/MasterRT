import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';

interface TestProps {
    data?: any;
    emitMrq?: any;
    _mrReqReload?: any;
}

export default class Test extends React.Component<TestProps, {}> {
    abc() {
        this.props._mrReqReload(this.props.emitMrq)
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState = () => void 0;
    }

    render() {
        return (<div>
            <button onClick={this.abc.bind(this)}>TestAAA</button>
            {this.props.children}
            </div>);
    }
}