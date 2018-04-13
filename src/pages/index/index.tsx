import React from 'react';
import Link from 'umi/link';
import Count from './components/Count';
import A from '../../components/MrsHTML';
import './index.less';

interface IndexProps {
}

export default class MrsIndex extends React.Component<IndexProps, {}> {
    render() {
        return (
            <div className={'normal'}>
                <h2>Index Page 2</h2>
                <A /> <Count />
                <br />
                <div>
                    <Link to="/list">Go to list.html</Link>
                </div>
            </div>
        );
    }
}

