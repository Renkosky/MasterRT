/**
 * MrProcess
 * 一个过程，一个数据载入在显示的过程
 * 其包含，loader, nodata
 *
 * @creator mizi.lin@v0.1.23.20180521
 */

import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import '../assets/styles/mr-process.less';
import {MrIf, MrElse, MrFill, MrCol, MrAutoBind, MrReq, MrPanel, MrComponent, MrServices} from '..';
import MrLoader from './mr-loader.component';
import NoDateComponent from './nodate.component';

interface MrProcessProps extends MrInterface {
    start?: number | boolean;
    end?: number | boolean;
    type?: string;
    data?: any;
    nodata?: string | React.Component
    loader?: string | React.Component
    content?: string | React.Component
}

export default class MrProcess extends React.Component<MrProcessProps, {}> {

    static defaultProps = {
        start: 0,
        nodata: MrServices.getNoDataComponent() || NoDateComponent
    };

    componentWillMount() {

    }

    render() {

        let {start, end, type} = this.props;
        let {data, nodata, children} = this.props;
        // console.debug('..process start', start);
        return (
            <section className="mr-process">
                {
                    start >= 0 && start < 100 &&
                    <section className="mr-process-loader">
                        <MrLoader start={start} end={end} type={type} />
                    </section>
                }

                {
                    start > 99 && mu.isEmpty(data) &&
                    <section className="mr-process-nodata">
                        <MrComponent component={nodata}></MrComponent>
                    </section>
                }

                {children}
            </section>
        );
    }
}