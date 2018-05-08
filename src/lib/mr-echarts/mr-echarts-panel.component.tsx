import * as React from 'react';
import {MrEchartsProps} from './mr-echarts.component';
import {MrIcon, MrPanel, MrServices, MrEcharts} from '../';
import _mrEchartServices from './mr-echarts.services';
import _mrServices from '../common/mr.services';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {MrEchartsDataView} from './mr-echarts-dataView.component';
import * as classNames from 'classnames';
import MrReq from '../mr-req/mr-req.component';

declare var require: any;
require('../assets/styles/mr-echarts-panel.less');

interface MrEchartsPanelProps extends MrEchartsProps {
    style?: any;
    title?: string;
    downloadName?: string;
    data?: any;
    dataType?: any;
    dataModel?: any;
    chartTypes?: string;
    req?: any;
    h100?: boolean;
    className?: string;

    bodyStyle?: any;
    // 返回值
    result?: any;
    // border
    border?: any;
    // setting
    setting?: any;

    // todo tools
}

export default class MrEchartsPanel extends React.Component<MrEchartsPanelProps, {}> {



    // 缓存dataView数据
    _dataView: any = [];

    tools() {
        let {fullScreen, xyExchange, xAxisShowAll, legendShow, dataView, lineBarExchange} = this.state;

        return (
            <div className="mr-echars-panle-tools">
                <MrIcon family="mricon" type="xiazai" onClick={this.download.bind(this)} />
                <MrIcon family="mricon" type="table" onClick={this.dataView.bind(this)} className={classNames({selected: dataView})} />
                <MrIcon family="mricon" type="rotate" onClick={this.toolSetFn.bind(this, 'xyExchange', true)} className={classNames({selected: xyExchange})} />
                <MrIcon family="mricon" type="bar" onClick={this.toolSetFn.bind(this, 'lineBarExchange', true)} className={classNames({selected: lineBarExchange})} />
                <MrIcon family="mricon" type="liebiaodanchu" onClick={this.toolSetFn.bind(this, 'xAxisShowAll', true)} className={classNames({selected: xAxisShowAll})} />
                <MrIcon family="mricon" type="yincang" onClick={this.toolSetFn.bind(this, 'legendShow', true)} className={classNames({selected: legendShow})} />
                <MrIcon family="mricon" type="shuaxin" onClick={this.reload.bind(this)} />
                <MrIcon family="mricon" type={fullScreen ? 'suoxiao' : 'fangda'} onClick={this.fullScreen.bind(this)} className={classNames({selected: fullScreen})} />
            </div>
        );
    }

    toolSetFn(key: string, value?: any) {
        let status = this.state[key];
        let fnName = `@@${key}`;
        let {setting = []} = this.state;

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
        let {title = '', downloadName} = this.props;
        downloadName = downloadName || `${title}_${+new Date()}`;
        // console.debug(this._dataView, this._dataView.join('\n'));
        _mrServices.download(this._dataView.join('\n'), downloadName + '.csv');
    }

    // 刷新数据
    reload() {
        let {setting, req, data} = this.props;
        setting = _mrEchartServices.serialize(setting);
        this.setState({
            req,
            data,
            setting,
            fullScreen: false,
            xyExchange: false,
            xAxisShowAll: false,
            legendShow: false,
            dataView: false,
            lineBarExchange: false
        });
    }

    // 获得 echart callback data
    getResult(options, rst) {
        let {result} = this.props;

        this._dataView = _.get(rst, 'data._dataView');

        result && result(options, rst);
    }

    state = {
        fullScreen: false,
        xyExchange: false,
        xAxisShowAll: false,
        legendShow: false,
        dataView: false,
        lineBarExchange: false,
        setting: _mrEchartServices.serialize(this.props.setting)
    };

    render() {
        const {title, style, className, h100, bodyStyle, border} = this.props;
        const {chartTypes, data, dataType, dataModel} = this.props;
        const {options, renderType, theme} = this.props;
        const {req} = this.props;

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

        let classString = MrServices.cls({
            'mr-full-screen': fullScreen,
            'mr-echarts-panel': true,
            'h-100-i': h100
        }, className);

        return (
            <MrPanel
                title={title}
                extra={this.tools()}
                style={style}
                className={classString}
                bodyStyle={bodyStyle}
                border={border}>
                <MrReq req={req} force={true} transmit="data" h100={true}>
                    {dataView
                        ? <MrEchartsDataView data={this._dataView} />
                        :  <MrEcharts {...echartsProps} result={this.getResult.bind(this)} />}
                </MrReq>
            </MrPanel>
        );
    }
}
