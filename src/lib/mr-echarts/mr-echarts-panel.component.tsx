/**
 * MrEchartsPanel
 *
 * @update mizi.lin@20180508
 * 添加 MrAutoBind
 * 按照图表类型显示工具条
 * 可以移除工具条
 * 工具条显示类型（toggle, hide, visible)
 */

import * as React from 'react';
import {MrEchartsProps} from './mr-echarts.component';
import {MrIcon, MrPanel, MrServices, MrEcharts, MrAutoBind, MrReq} from '../';
import _mrEchartServices from './mr-echarts.services';
import _mrServices from '../mr-common/mr.services';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {MrEchartsDataView} from './mr-echarts-dataView.component';
import * as classNames from 'classnames';

declare var require: any;
require('../assets/styles/mr-echarts-panel.less');

interface MrEchartsPanelProps extends MrEchartsProps {
    /**
     * chartTypes: string
     * 图标类型
     *
     * @values 可由主图表类型 + 子图表类型组成， exp. pie::rose::ring
     */
    chartTypes: string;
    setting?: any;
    transform?: any;
    downloadName?: string;
    data?: any;
    dataType?: any;
    dataModel?: any;
    req?: any;

    title?: string;
    border?: any;
    bodyStyle?: any;
    h100?: boolean;
    className?: string;
    style?: any;

    /**
     * omitTools?: string
     * 从工具条中摘除工具
     * @values 若 omitTools === __all__, 则移除工具条
     */
    omitTools?: string[] | string;

    /**
     * showToolbar?: string = 'toggle'
     * 显示工具条类型
     * @values toggle => 鼠标hover panel 显示
     *         visible => 一直显示
     *         hide => 不显示
     */
    showToolbar?: string;

    /**
     * result?: function(options: EchartOption, result: any)
     * 回调函数
     * @emit function
     * @params result: {options: EchartOption, data: any, dataView: any}
     */
    result?: any;
}

@MrAutoBind
export default class MrEchartsPanel extends React.Component<MrEchartsPanelProps, {}> {

    // 缓存dataView数据
    _dataView: any = [];

    icons() {
        let {fullScreen, xyExchange, xAxisShowAll, legendShow, dataView, lineBarExchange} = this.state;
        return {
            'download': <MrIcon family="mricon" type="xiazai" onClick={this.download} />,
            'dataView': <MrIcon family="mricon" type="table" onClick={this.dataView} className={classNames({selected: dataView})} />,
            'xyExchange': <MrIcon family="mricon" type="rotate" onClick={this.toolSetFn.bind(this, 'xyExchange', true)} className={classNames({selected: xyExchange})} />,
            'lineBarExchange': <MrIcon family="mricon" type="bar" onClick={this.toolSetFn.bind(this, 'lineBarExchange', true)} className={classNames({selected: lineBarExchange})} />,
            'xAxisShowAll': <MrIcon family="mricon" type="liebiaodanchu" onClick={this.toolSetFn.bind(this, 'xAxisShowAll', true)} className={classNames({selected: xAxisShowAll})} />,
            'legendShow': <MrIcon family="mricon" type="yincang" onClick={this.toolSetFn.bind(this, 'legendShow', true)} className={classNames({selected: legendShow})} />,
            'reload': <MrIcon family="mricon" type="shuaxin" onClick={this.reload} />,
            'fullScreen': <MrIcon family="mricon" type={fullScreen ? 'suoxiao' : 'fangda'} onClick={this.fullScreen} className={classNames({selected: fullScreen})} />,
        }
    }

    typeTools: any = {
        line: ['download', 'dataView', 'xyExchange', 'lineBarExchange', 'xAxisShowAll', 'legendShow', 'reload', 'fullScreen'],
        bar: ['download', 'dataView', 'xyExchange', 'lineBarExchange', 'xAxisShowAll', 'legendShow', 'reload', 'fullScreen'],
        pie: ['download', 'dataView', 'legendShow', 'reload', 'fullScreen'],
    };

    tools() {
        let {chartTypes, omitTools, showToolbar} = this.props;
        let [type] = chartTypes.split('::');
        let icons = this.icons();
        let tools = this.typeTools[type];

        // 不显示工具条
        if(showToolbar === 'hide') {
            return null;
        }

        // 移除小工具
        mu.run(omitTools, () => {
            if(omitTools === '__all__') {
                tools = [];
            } else {
                mu.each(omitTools, (tool) => {
                    _.remove(tools, (_tool) => _tool === tool);
                });
            }
        });

        return (
            <div className="mr-echarts-panel-tools">
                {
                    mu.map(tools, (type) => {
                        return <React.Fragment key={type}>
                            {icons[type]}
                        </React.Fragment>
                    })
                }
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

    static defaultProps = {
        showToolbar: 'toggle',
        omitTools: []
    };

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
        const {title, style, className, h100, bodyStyle, border, showToolbar, transform} = this.props;
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
            theme,
            transform
        };

        let panelClass = MrServices.cls({
            'mr-full-screen': fullScreen,
            'mr-echarts-panel': true,
            'h-100-i': h100,
            [`mr-echarts-panel-tools-${showToolbar}`]: true
        }, className);

        return (
            <MrPanel
                title={title}
                extra={this.tools()}
                style={style}
                className={panelClass}
                bodyStyle={bodyStyle}
                border={border}>
                <MrReq req={req} force={true} transmit="data">
                    {dataView
                        ? <MrEchartsDataView data={this._dataView} />
                        :  <MrEcharts {...echartsProps} result={this.getResult.bind(this)} />}
                </MrReq>
            </MrPanel>
        );
    }
}
