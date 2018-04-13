import * as React from 'react';
import * as echarts from 'echarts';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import 'echarts-wordcloud';
import '../assets/js/china.js';
import '../assets/js/theme.customed.js';
import _sevr from './mr-echarts.services';
declare var require: any;
require('../assets/styles/mr-echarts.component.less');

// mark
// 监听dom变化
// element-resize-detector
// const erd = elementResizeDetectorMaker({strategy: "scroll"});

export interface MrEchartsProps {
    data?: any[];
    dataType?: string;
    dataModel?: string;
    chartTypes?: string;
    setting?: any;
    options?: any;
    theme?: string;
    renderType?: string;
    style?: any;
    result?: any;
}

export class MrEcharts extends React.Component<MrEchartsProps, {}> {
    _chart: any;
    _chartRef: any;
    _width: number;
    _height: number;

    /**
     * 绘制Echarts图表
     * @type {Function}
     */
    drawCharts = _.debounce((props: any) => {
        let {data, dataType, dataModel, chartTypes, setting = {}} = props;
        let {options, renderType, theme} = props;
        let {result} = props;
        let _dom = this._chartRef;
        // _dom 不存在时不渲染
        if (!_dom) return;

        // init echarts
        mu.empty(
            this._chart,
            () => {
                this._chart = echarts.init(_dom, theme || _sevr._theme, {
                    renderer: renderType || _sevr.CHART_RENDER_TYPE
                });
            },
            () => {
                // 确保 wordcloud 清理的缓存
                // 但可能会造成内存消耗过大
                if (chartTypes.indexOf('wordCloud') > -1) {
                    this._chart.clear();
                }
            }
        );

        // set empty option for no data
        if (_.isEmpty(data)) {
            this._chart.setOption({}, true);
            this._chart.resize();
            return;
        }

        let rst: any = {};
        mu.empty(options, () => {
            rst = _sevr.getOptions(data, dataType, dataModel, chartTypes, setting);
            options = rst.options;
        });

        // 使用 noMerge 避免两次 options变化产生冲突

        console.debug('::::::: options => ~~', options);

        this._chart.setOption(options, true);
        this._chart.resize();

        this.registerEvents(props, options, rst);

        // call back info
        result && result(options, rst);
    }, 300);

    /**
     * 注册Echart事件
     * @param props
     * @param options
     * @param result
     */
    registerEvents = _.once((props, options, result) => {
        let {chartClick, chartDblClick, chartMouseDown, chartMouseUp, chartMouseOver, chartMouseOut, chartGlobalOut} = props;

        this._chart.on('click', (e: any) => {
            chartClick && chartClick(e, props, options, result);
        });

        this._chart.on('dblClick', (e: any) => {
            chartDblClick && chartDblClick(e, props, options, result);
        });
        this._chart.on('mousedown', (e: any) => {
            chartMouseDown && chartMouseDown(e, props, options, result);
        });
        this._chart.on('mouseup', (e: any) => {
            chartMouseUp && chartMouseUp(e, props, options, result);
        });
        this._chart.on('mouseover', (e: any) => {
            chartMouseOver && chartMouseOver(e, props, options, result);
        });
        this._chart.on('mouseout', (e: any) => {
            chartMouseOut && chartMouseOut(e, props, options, result);
        });
        this._chart.on('globalout', (e: any) => {
            chartGlobalOut && chartGlobalOut(e, props, options, result);
        });
    });

    /**
     * 获取最终图表数据解析方式
     * @param type
     * @param sourceType: dataSource, dataSet, dataGroup
     * @return {string}
     */
    getSourceType(type: string, sourceType: string) {
        if (sourceType) {
            return sourceType;
        }

        switch (type) {
            case 'wordCloud':
            case 'treemap':
            case 'radar':
                return 'dataSource';
            case 'line':
            case 'bar':
            case 'pie':
            case 'scatter':
            case 'effectScatter':
            case 'parallel':
            case 'candlestick':
            case 'map':
            case 'funnel':
            case 'custom':
                return 'dataSet';
            default:
                return 'data';
        }
    }

    windowResize = mu.bind(() => {
        this._chart.resize();
    }, this);

    componentWillReceiveProps(props: MrEchartsProps) {
        // 判断两次 props 是否一致
        // 避免 react 本身机制问题，每次setState 重新渲染页面

        console.debug(mu.clone(props), mu.clone(this.props), _.isEqual(props, this.props));

        if (!_.isEqual(props, this.props)) {
            this.drawCharts(props);
        }
    }

    componentDidMount() {
        this.drawCharts(this.props);
        window.addEventListener('resize', this.windowResize);
    }

    // componentWillUpdate() {
    //     this._width = this._chartRef.offsetWidth;
    //     this._height = this._chartRef.offsetHeight;
    // }

    componentDidUpdate() {
        this.windowResize();

        // // 监测 DOM 的宽高变化
        // let {offsetWidth, offsetHeight} = this._chartRef;
        //
        // if(this._width !== offsetWidth || this._height !== offsetHeight) {
        //     this.windowResize();
        // }
    }

    componentWillUnmount() {
        window.removeEventListener('reszie', this.windowResize.bind(this));
    }

    render() {
        return <div className={'mr-echarts'} style={this.props.style} ref={(div) => (this._chartRef = div)} />;
    }
}
