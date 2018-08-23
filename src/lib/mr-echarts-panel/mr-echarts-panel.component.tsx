/**
 * MrEchartsPanel
 *
 * @update mizi.lin@20180508
 * 添加 MrAutoBind
 * 按照图表类型显示工具条
 * 可以移除工具条
 * 工具条显示类型（toggle, hide, visible)
 *
 * @update mizi.lin@v0.1.21.20180515
 * ::=> MrReq修改部分相应规则，MrEchartsPanel 重新设定规则调用, support multiple req
 *
 * @update mizi.lin@v0.1.21.20180516
 * ::=> 添加 append && prepend
 *
 * @update mizi.lin@v0.1.24.20180523
 * ::=> support echarts event
 *
 * @update mizi.lin@v0.1.25.20180525
 * ::=> 添加 force，默认MrEchartsPanel 在props未改变状态下，不重新渲染
 *
 * @update mizi.lin@v0.1.27.20180606
 * ::=> 添加 MrProcess 的特性属性，showLoading, showNodata, loading, nodata
 *
 * @update mizi.lin@0.2.1.20180717
 * ::=> 移除 force 控制 MrEchartsPanel 是否重新渲染，是否重新渲染只控制在 MrReq 这一层
 */

import * as React from 'react';
import MrEcharts, {MrEchartsProps} from '../mr-echarts/mr-echarts.component';
import _mrEchartServices from '../mr-echarts/mr-echarts.services';
import _mrServices from '../mr-common/mr.services';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import {MrEchartsDataView} from './mr-echarts-dataView.component';
import {default as classNames} from 'classnames';
import '../assets/styles/mr-echarts-panel.less';
import MrIcon from '../mr-icon/mr-icon.component';
import {default as MrServices} from '../mr-common/mr.services';
import MrPanel from '../mr-panel/mr-panel.component';
import MrReq from '../mr-req/mr-req.component';

export interface MrEchartsPanelProps extends MrEchartsProps {
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
    req?: any | any[];

    title?: string;
    border?: any;
    bodyStyle?: any;
    h100?: boolean;
    className?: string;
    style?: any;
    append?: any;
    prepend?: any;

    /**
     * mrReq?: MrReqProps
     * MrReq 部分interface
     *
     * MrReq: any {
     *    transmit;
     *    transform;
     *    ...
     * }
     */
    mrReq?: any;

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

    /**
     * 强制渲染
     */
    force?: boolean;

    /**
     * showLoading?: boolean = true
     * @extend MrProcessProps
     */
    showLoading?: boolean;

    /**
     * showNodata?: boolean = true
     * @extend MrProcessProps
     */
    showNodata?: boolean;

    /**
     * loading?: string | React.Component
     * @extend MrProcessProps
     */
    loading?: string | React.Component;

    /**
     * nodata?: React.Component
     * @extend MrProcessProps
     */
    nodata?: React.Component;
}

class MrEchartsPanel extends React.Component<MrEchartsPanelProps, {}> {

    static defaultProps = {
        showToolbar: 'toggle',
        omitTools: [],
        force: false
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

    // 缓存dataView数据
    _dataView: any = [];

    icons() {
        let {fullScreen, xyExchange, xAxisShowAll, legendShow, dataView, lineBarExchange} = this.state;
        return {
            'download': <MrIcon family="mricon" type="xiazai" onClick={this.download} />,
            'dataView': <MrIcon family="mricon"
                                type="table"
                                onClick={this.dataView.bind(this)}
                                className={classNames({selected: dataView})} />,
            'xyExchange': <MrIcon family="mricon"
                                  type="rotate"
                                  onClick={this.toolSetFn.bind(this, 'xyExchange', true)}
                                  className={classNames({selected: xyExchange})} />,
            'lineBarExchange': <MrIcon family="mricon"
                                       type="bar"
                                       onClick={this.toolSetFn.bind(this, 'lineBarExchange', true)}
                                       className={classNames({selected: lineBarExchange})} />,
            'xAxisShowAll': <MrIcon family="mricon"
                                    type="liebiaodanchu"
                                    onClick={this.toolSetFn.bind(this, 'xAxisShowAll', true)}
                                    className={classNames({selected: xAxisShowAll})} />,
            'legendShow': <MrIcon family="mricon"
                                  type="yincang"
                                  onClick={this.toolSetFn.bind(this, 'legendShow', true)}
                                  className={classNames({selected: legendShow})} />,
            'reload': <MrIcon family="mricon" type="shuaxin" onClick={this.reload.bind(this)} />,
            'fullScreen': <MrIcon family="mricon"
                                  type={fullScreen ? 'suoxiao' : 'fangda'}
                                  onClick={this.fullScreen.bind(this)}
                                  className={classNames({selected: fullScreen})} />,
        }
    }

    typeTools: any = {
        line: [
            'download', 'dataView', 'xyExchange', 'lineBarExchange', 'xAxisShowAll', 'legendShow', 'reload',
            'fullScreen'
        ],
        bar: [
            'download', 'dataView', 'xyExchange', 'lineBarExchange', 'xAxisShowAll', 'legendShow', 'reload',
            'fullScreen'
        ],
        pie: ['download', 'dataView', 'legendShow', 'reload', 'fullScreen'],
        wordCloud: ['download', 'dataView', 'reload', 'fullScreen'],
        map: ['download', 'dataView', 'reload', 'fullScreen'],
        gauge: ['download', 'dataView', 'legendShow', 'reload', 'fullScreen'],
        radar: ['download', 'dataView', 'legendShow', 'reload', 'fullScreen'],
        scatter: ['download', 'dataView', 'legendShow', 'reload', 'fullScreen'],
        treemap: ['download', 'dataView', 'reload', 'fullScreen'],
    };

    tools() {
        let {chartTypes, omitTools, showToolbar} = this.props;
        let [type] = chartTypes.split('::');
        let icons = this.icons();
        let tools = this.typeTools[type];

        // 不显示工具条
        if (showToolbar === 'hide') {
            return null;
        }

        // 移除小工具
        mu.run(omitTools, () => {
            if (omitTools === '__all__') {
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
        let {fullScreen} = this.state;
        this.setState({
            fullScreen: !fullScreen,
            force: true
        });
    }

    // 查看DataView
    dataView() {
        let {dataView} = this.state;
        this.setState({
            dataView: !dataView
        });
    }

    // download 下载数据
    download() {
        let {title = '', downloadName} = this.props;
        downloadName = downloadName || `${title}_${+new Date()}`;
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

    shouldComponentUpdate(nextProps, nextState) {
        // @todo 过滤掉 props 中的 function
        let {children, append, chartClick, ...next} = nextProps;
        let {children: a, append: b, chartClick: c, ...current} = this.props;

        let {force} = nextProps;
        if (force) {
            return true;
        } else {
            return !_.isEqual(next, current) || !_.isEqual(nextState, this.state);
        }
    }

    render() {
        const {title, style, className, h100, bodyStyle, border, showToolbar, transform, append, prepend} = this.props;
        const {chartTypes, data, dataType, dataModel} = this.props;
        const {options, renderType, theme} = this.props;

        let chartsEvent = _.omit(this.props,
            'chartClick',
            'chartDblClick',
            'chartMouseDown',
            'chartMouseUp',
            'chartMouseOver',
            'chartMouseOut',
            'chartGlobalOut');

        let {req: mrReqReq, mrReq = {}} = this.props;

        mu.run(mrReqReq, () => {
            mrReq['req'] = mrReqReq;
        });

        let {transmit = 'data:res.data', req, transform: mrReqTransform, force} = mrReq;

        // 默认在MrEchartsPanel中多重数组处理，合并data信息
        // todo 多轴处理
        if (req && !mrReqTransform) {
            mrReqTransform = (res) => {
                if (res.length > 1) {
                    let ds = mu.map(res, (res) => res.data);
                    return _.concat([], ...ds);
                } else {
                    return res;
                }
            }
        }

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

        let {showLoading, showNodata, nodata, loading} = this.props;
        let _process = {
            showLoading,
            showNodata,
            nodata,
            loading
        };

        return (
            <MrPanel
                title={title}
                extra={this.tools()}
                style={style}
                className={panelClass}
                bodyStyle={bodyStyle}
                append={append}
                prepend={prepend}
                border={border}>
                <MrReq req={req} data={{data}} force={true} transmit="data" {..._process}>
                    {
                        dataView
                            ? <MrEchartsDataView dataView={this._dataView} />
                            : <MrEcharts {...echartsProps}
                                         {...chartsEvent}
                                         className={'full-sreen-' + fullScreen}
                                         result={this.getResult.bind(this)} />
                    }
                </MrReq>
            </MrPanel>
        );
    }
}

export default MrEchartsPanel;
