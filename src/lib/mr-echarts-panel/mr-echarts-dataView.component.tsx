/**
 * MrEchartsDataView
 *
 * @update huao@0.2.2.20181010
 * ::=> 表格增加行列转换功能
 */

import * as React from 'react';
import  mu from 'mzmu';
import * as _ from 'lodash';
import MrIcon from '../mr-icon/mr-icon.component';
import { default as classNames } from 'classnames';

export interface MrEchartsDataViewProps {
    dataView: any[];
    rowColumnConversion: boolean;
    changeRowColumn: any;
}

export class MrEchartsDataView extends React.Component<MrEchartsDataViewProps, {}> {
    // excel数据行列转换
    getDataView(dataView: any[]): any {
        let data = [];
        _.forEach(dataView[0], (da, index) => {
            data[index] = [];
            _.forEach(dataView, (dv) => {
                data[index].push(dv[index]);
            });
        });

        return data;
    }

    render(): any {
        let { dataView, rowColumnConversion } = this.props;
        let data = rowColumnConversion ? this.getDataView(dataView) : dataView;

        return (
            <section className="mr-echarts-dataView">
                <div>
                    <MrIcon
                        type="retweet"
                        theme="outlined"
                        onClick={this.props.changeRowColumn}
                        className={classNames({ selected: rowColumnConversion })}
                    />
                </div>
                <table>
                    <tbody>
                        {data.map((item, inx) => {
                            return (
                                <tr key={inx}>
                                    {item.map((o, inx) => {
                                        return <td key={inx}>{mu.format(o) || '-'}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        );
    }
}
