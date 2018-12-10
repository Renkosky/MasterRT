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
import  mu from 'mzmu';
import '../assets/styles/mr-process.less';
import MrLoader from './mr-loader.component';
import MrNodataComponent from './mr-nodata.component';
import MrComponent from '../mr-component/mr-component.component';
import MrServices from '../mr-common/mr.services';

export interface MrProcessProps extends MrInterface {

    /**
     * MrLoader.start
     */
    start?: number | boolean;

    /**
     * MrLoader.type
     */
    type?: string;

    data?: any;

    /**
     * nodata 显示模板
     *
     * MrServices.getNodataComponent中读取
     * @default MrNodataComponent
     */
    nodata?: any | React.ComponentClass | React.SFC;

    /**
     * showLoading?: boolean = true
     * 是否显示 loading
     * @default true
     */
    showLoading?: boolean;

    /**
     * showLoading?: boolean = true
     * 是否显示 loading
     * @default true
     */
    showNodata?: boolean;
}

class MrProcess extends React.Component<MrProcessProps, {}> {

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

        let nodataComponent: React.ComponentClass | React.SFC;
        nodataComponent = nodata || MrServices.getNoDataComponent() || MrNodataComponent;

        return (
            <section className="mr-process">
                {
                    (start >= 0 && start < 100 && showLoading) && (
                        <section className="mr-process-loader">
                            <MrLoader start={start} type={type} />
                        </section>
                    )
                }

                {
                    (start > 99 && mu.isEmpty(data) && showNodata) ? (
                        <section className="mr-process-nodata">
                            <MrComponent component={nodataComponent}></MrComponent>
                        </section>
                    ) : children
                }
            </section>
        );
    }
}

export default MrProcess;