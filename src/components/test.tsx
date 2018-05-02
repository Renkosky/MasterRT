import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';

interface TestProps {
    data?: any;
    emitMrq?: any;
    _mrReqReload?: any;
}

export default class Test extends React.Component<TestProps, {}> {
    constructor(props) {
        super(props);
        this.abc = this.abc.bind(this)
    }

    abc() {
        this.props._mrReqReload(() => {
            return false;
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState = () => void 0;
    }

    render() {
        console.debug('--------');
        return (<div>
            <button onClick={this.abc}>TestAAA</button>
            {this.props.children}
            </div>);
    }
}