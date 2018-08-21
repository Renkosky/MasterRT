/**
 * MrProcess
 * 一个过程，一个数据载入在显示的过程
 * 其包含，loader, nodata
 *
 * @creator mizi.lin@v0.1.23.20180521
 *
 * @update mizi.lin@v0.1.23.20180521
 * ::=> 修改nodataComponent 取值错误
 * ::=> 证实在tsx可以使用import style 文件了``
 *
 * @update mizi.lin@v0.1.27.20180606
 * ::=> fixed when noset MrServices.nodataComponent get default value error
 * ::=> 添加是否使用无数据显示, showNodata
 * ::=> 添加是否显示loading, showLoading
 *
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

    nodata?: React.Component | React.SFC;

    loader?: string | React.Component;

    content?: string | React.Component;
    /**
     * showLoading?: boolean = true
     * 是否显示 loading
     *
     */
    showLoading?: boolean;

    /**
     * showLoading?: boolean = true
     * 是否显示 loading
     */
    showNodata?: boolean;
}

export default class MrProcess extends React.Component<MrProcessProps, {}> {

    static defaultProps = {
        start: 0,
        showLoading: true,
        showNodata: true
    };

    componentWillMount() {

    }

    render() {

        let {start, type} = this.props;
        let {data, nodata, children, showLoading, showNodata} = this.props;
        // console.debug('..process start', start);

        let noDataComponent: React.ComponentClass | React.SFC = nodata || MrServices.getNoDataComponent() || NoDateComponent;

        return (
            <section className="mr-process">
                {
                    start >= 0 && start < 100 && showLoading &&
                    <section className="mr-process-loader">
                        <MrLoader start={start} type={type} />
                    </section>
                }

                {
                    start > 99 && mu.isEmpty(data) && showNodata ?
                    <section className="mr-process-nodata">
                        <MrComponent component={noDataComponent}></MrComponent>
                    </section> : children
                }
            </section>
        );
    }
}