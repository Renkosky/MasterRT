/**
 * @creator mizi.lin@20180521
 *
 * todo support more loader
 */

import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {Spin} from 'antd';

interface MrLoaderComponentProps {
    start: number | boolean;
    type: string;
}

export default class MrLoader extends React.Component<MrLoaderComponentProps, {}> {


    render() {

        let {start} = this.props;

        return (<React.Fragment>
            {
                (start >= 0 && start < 100) ?
                    <Spin></Spin> : null
            }
        </React.Fragment>);
    }
}