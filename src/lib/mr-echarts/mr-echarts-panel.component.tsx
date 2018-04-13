import * as React from 'react';
import {MrEcharts, MrEchartsProps} from './mr-echarts.component';
import {MrIcon, MrPanel} from '../';
import _mrEchartServices from './mr-echarts.services';
import _mrServices from '../common/mr.services';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {MrEchartsDataView} from './mr-echarts-dataView.component';
import * as classNames from 'classnames';

declare var require: any;
require('../assets/styles/mr-echarts-panel.less');

interface MrEchartsPanelProps extends MrEchartsProps {
    style?: any;
    title?: string;
    downloadName?: string;
}

export class MrEchartsPanel extends React.Component<MrEchartsPanelProps, {}> {
    state = {
        fullScreen: false,
        xyExchange: false,
        xAxisShowAll: false,
        legendShow: false,
        dataView: false,
        lineBarExchange: false,
        setting: _mrEchartServices.serialize(this.props.setting)
    };

    // 缓存dataView数据
    _dataView: any = [];

    tools() {
        let {fullScreen, xyExchange, xAxisShowAll, legendShow, dataView, lineBarExchange} = this.state;

        return (
            <div className="mr-echars-panle-tools">
                <MrIcon type="xiazai" onClick={this.download.bind(this)} />
                <MrIcon type="table" onClick={this.dataView.bind(this)} className={classNames({selected: dataView})} />
                <MrIcon type="rotate" onClick={this.toolSetFn.bind(this, 'xyExchange', true)} className={classNames({selected: xyExchange})} />
                <MrIcon type="bar" onClick={this.toolSetFn.bind(this, 'lineBarExchange', true)} className={classNames({selected: lineBarExchange})} />
                <MrIcon type="liebiaodanchu" onClick={this.toolSetFn.bind(this, 'xAxisShowAll', true)} className={classNames({selected: xAxisShowAll})} />
                <MrIcon type="yincang" onClick={this.toolSetFn.bind(this, 'legendShow', true)} className={classNames({selected: legendShow})} />
                <MrIcon type="shuaxin" onClick={this.reload.bind(this)} />
                <MrIcon type={fullScreen ? 'suoxiao' : 'fangda'} onClick={this.fullScreen.bind(this)} className={classNames({selected: fullScreen})} />
            </div>
        );
    }

    toolSetFn(key: string, value?: any) {
        let status = this.state[key];
        let fnName = `@@${key}`;
        let {setting} = this.state;

        status = !status;

        if (status) {
            setting.push({[fnName]: mu.ifnvl(value, true)});
        } else {
            _.remove(setting, (o) => {
                return _.keys(o)[0] === fnName;
            });
        }

        this.setState({
            [key]: status,
            setting
        });
    }

    // 全屏显示
    fullScreen() {
        this.setState({
            fullScreen: !this.state.fullScreen
        });
    }

    // 查看DataView
    dataView() {
        this.setState({
            dataView: !this.state.dataView
        });
    }

    // download 下载数据
    download() {
        let {title, downloadName} = this.props;
        downloadName = downloadName || `${title}_${+new Date()}`;
        _mrServices.download(this._dataView.join('\n'), downloadName + '.csv');
    }

    // 刷新数据
    reload() {
        let {setting} = this.props;
        setting = _mrEchartServices.serialize(setting);
        this.setState({
            setting,
            dataView: false
        });
    }

    // 获得 echart callback data
    getResult(options, rst) {
        this._dataView = _.get(rst, 'data._dataView');
    }

    render() {
        const {title, style} = this.props;
        const {data, dataType, dataModel, chartTypes} = this.props;
        const {options, renderType, theme} = this.props;
        let {fullScreen, dataView, setting} = this.state;
        setting = mu.clone(setting);
        const echartsProps = {
            data,
            dataType,
            dataModel,
            chartTypes,
            setting,
            options,
            renderType,
            theme
        };

        return (
            <MrPanel title={title} extra={this.tools()} style={style} className={[fullScreen ? 'ms-fullScreen' : '', 'ms-echarts-panel'].join(' ')}>
                {dataView ? (
                    <div>
                        <MrEchartsDataView data={this._dataView} />
                    </div>
                ) : (
                    <MrEcharts {...echartsProps} result={this.getResult.bind(this)} />
                )}
            </MrPanel>
        );
    }
}
