import React from 'react';
import Link from 'umi/link';
import Count from './components/Count';
import './index.less';
import MrAutoBind from '../../lib/common/mr-auto-bind';

interface IndexProps {
}

@MrAutoBind
export default class MrsIndex extends React.Component<IndexProps, {}> {

    clickTest(e) {
        // test MrAutoBind
        console.log('test auto bind :::', e);
    }

    render() {
        return (
            <div className={'normal'}>
                <h2 onClick={this.clickTest}>Index Page 2</h2>
                <Count />
                <br />
                <div>
                    <Link to="/list">Go to list.html</Link>
                </div>
            </div>
        );
    }
}

