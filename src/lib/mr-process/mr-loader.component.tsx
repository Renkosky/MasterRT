/**
 * @creator mizi.lin@20180521
 *
 * todo support more loader
 */

import * as React from 'react';
import {Spin} from 'antd';
import "~antd/lib/button/style/index.less";

export interface MrLoaderComponentProps {
    /**
     * loader 载入
     *
     * @values 0-100 | boolean
     */
    start: number | boolean;

    /**
     * 进度条类型，目前仅支持 antd spin
     */
    type: string;
}

class MrLoader extends React.Component<MrLoaderComponentProps, {}> {

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

export default MrLoader;
