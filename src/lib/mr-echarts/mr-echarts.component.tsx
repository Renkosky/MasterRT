/**
 * @update mizi.lin@0.1.25.20180523
 * ::=> try echart setOption && resize
 */

import * as React from 'react';
import * as echarts from 'echarts';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import 'echarts-wordcloud';
import '../assets/js/china.js';
import '../assets/js/theme.customed.js';
import MrEchartsServices from './mr-echarts.services';
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

    /**
     * transform?: any[]
     * 对data进行数据处理
     */
    transform?: any;

    chartTypes?: string;

    /**
     * setting
     * 对options值进行配置处理
     */
    setting?: any;
    options?: any;

    theme?: string;
    renderType?: string;
    style?: any;
    result?: any;
    _gene?: any;

    // 是否每次都刷新
    force?: boolean

    chartClick?: any;
    chartDblClick?: any;
    chartMouseDown?: any;
    chartMouseUp?: any;
    chartMouseOver?: any;
    chartMouseOut?: any;
    chartGlobalOut?: any;
}

export default class MrEcharts extends React.Component<MrEchartsProps, {}> {

    // 待Echarts渲染的dom元素
    _chartRef: any;

    _chart: any;

    _width: number;
    _height: number;


    getCharts(ref) {
        return this._chart || mu.run(ref, () => {
            let {theme = 'customed', renderType = 'canvas'} = this.props;
            return echarts.init(ref, theme, {
                renderer:  renderType
            });
        });
    }

    /**
     * 绘制Echarts图表
     * @type {Function}
     */
    drawCharts = _.debounce((props: any) => {

        let _chart = this.getCharts(this._chartRef);
        let {data, dataType, dataModel, chartTypes} = props;
        let {options} = props;
        let {result, setting, transform} = props;

        // data 与 setting 的计算结果
        let rst: any;

        if(!_chart){
            return void 0;
        } else {
            this._chart = _chart;
        }

        /**
         * 针对词云图，做一次画布清理,
         *
         * 如果不做词云的画布清理，画布可以重绘时，
         * 可能会残留上次词云痕迹
         */
        mu.run(chartTypes.indexOf('wordCloud') > -1, () => {
            _chart.clear();
        });

        /**
         * 数据获取可能来自上层元素'遗传'
         */
        data = mu.ifnvl(data, _.get(props, '_gene.data'));

        /**
         * 空数据不做渲染，委托给 MasterRT NoDataComponent, 显示无数据状态
         */
        if(mu.isEmpty(data) && mu.isEmpty(options)){
            return void 0;
        }

        /**
         * data 和 options  二者只支持其中一个，两个全有退出
         */
        if(mu.isNotEmpty(data) && mu.isNotEmpty(options)){
            console.error('data 与 options 不能同时设置');
            return void 0;
        }

        /**
         * 通过 data + setting, 获得最终的 options
         */
        mu.run(data, () => {
            rst = MrEchartsServices.getOptions(data, dataType, dataModel, chartTypes, setting, transform);
            options = rst.options;
        });

        /**
         * 通过 options + setting，获得最终的 options
         */
        mu.run(options, () => {
            options = MrEchartsServices.reOptions(options, setting, chartTypes);
        });

        // 使用 noMerge 避免两次 options变化产生冲突
        console.debug('::::::: options => ~~', options);

        try {
            _chart.setOption(options, true, false);
        } catch (e) {
            console.error(e);
        }

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

    windowResize = mu.bind(() => {
        try {
            this._chart && this._chart.resize && this._chart.resize();
        } catch (e) {}
    }, this);

    componentWillReceiveProps(props: MrEchartsProps) {
        // 判断两次 props 是否一致
        // 避免 react 本身机制问题，每次setState 重新渲染页面
        this.shouldComponentUpdate(props) && this.drawCharts(props);
    }

    componentDidMount() {
        this.drawCharts(this.props);
        window.addEventListener('resize', this.windowResize);
    }

    shouldComponentUpdate(nextProps): boolean {
        let {force = false, data, options, setting, chartTypes} = this.props;
        let {data: nextData, options: nextOptions, setting: nextSetting, chartTypes: nextChartTypes} = nextProps;

        switch (true) {
            case force:
            case chartTypes !== nextChartTypes:
            case !_.isEqual(data, nextData):
            case JSON.stringify(setting) !== JSON.stringify(nextSetting):
            case JSON.stringify(options) !== JSON.stringify(nextOptions):
                return true;
            default:
                return false;
        }
    }

    // componentWillUpdate() {
    //     this._width = this._chartRef.offsetWidth;
    //     this._height = this._chartRef.offsetHeight;
    // }

    componentDidUpdate() {
        // this.windowResize();

        // // 监测 DOM 的宽高变化
        // let {offsetWidth, offsetHeight} = this._chartRef;
        //
        // if(this._width !== offsetWidth || this._height !== offsetHeight) {
        //     this.windowResize();
        // }
    }

    componentWillUnmount() {
        // window.removeEventListener('reszie', this.windowResize.bind(this));
        // mu.run(this._chart, () => {
        //     this._chart.dispose();
        // });
    }

    render() {
        return <div className={'mr-echarts'} style={this.props.style} ref={(div) => (this._chartRef = div)} />;
    }


}
