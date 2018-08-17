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
import {MrServices} from '../index';

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
    className?: string;
    result?: any;
    _gene?: any;

    // 是否每次都刷新
    force?: boolean;

    // resize
    resize?: boolean;

    chartClick?: any;
    chartDblClick?: any;
    chartMouseDown?: any;
    chartMouseUp?: any;
    chartMouseOver?: any;
    chartMouseOut?: any;
    chartGlobalOut?: any;
}

export default class MrEcharts extends React.Component<MrEchartsProps, {}> {

    static THEME = 'customed';
    static RENDER_TYPE = 'canvas';
    static defaultProps = {
        force: false
    };

    // 待Echarts渲染的dom元素
    _chartRef: any;
    _chart: any;
    _theme: any;

    _width: number;
    _height: number;

    /**
     * 获得 echarts instance
     * @param ref
     */
    getCharts(ref) {
        return this._chart || mu.run(ref, () => {
            let {theme = 'customed', renderType = 'canvas'} = this.props;
            return echarts.init(ref, theme, {
                renderer: renderType
            });
        });
    }

    /**
     * 获得当前echart theme
     *
     * MrCharts.theme > MrEchartsServices.theme > static.theme
     */
    getTheme() {
        let prev = this._theme;
        let {theme} = this.props;
        theme = theme || MrEchartsServices._theme() || MrEcharts.THEME;
        let first = !mu.isExist(prev);
        let change = first ? false :  prev !== theme;
        this._theme = theme;
        return {
            first,
            change,
            prev,
            current: theme
        };
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

        if (!_chart) {
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
        if (mu.isEmpty(data) && mu.isEmpty(options)) {
            return void 0;
        }

        /**
         * data 和 options  二者只支持其中一个，两个全有退出
         */
        if (mu.isNotEmpty(data) && mu.isNotEmpty(options)) {
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
            _chart.setOption(options, true);
        } catch (e) {
            console.error(e);
        }

        this.registerEvents(props, options, rst);

        // call back info
        result && result(options, rst);

    }, 300);

    /**
     * 注册Echart事件
     * 只执行一次
     * @param props
     * @param options
     * @param result
     */
    registerEvents = _.once((props, options, result) => {
        let {chartClick, chartDblClick, chartMouseDown, chartMouseUp, chartMouseOver, chartMouseOut, chartGlobalOut} = props;

        this._chart.off('click');
        this._chart.off('dblClick');
        this._chart.off('mousedown');
        this._chart.off('mouseup');
        this._chart.off('mouseover');
        this._chart.off('mouseout');
        this._chart.off('globalout');

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

    resize = mu.bind(() => {
        try {
            this._chart && this._chart.resize && this._chart.resize();
        } catch (e) {
        }
    }, this);

    windowResize = mu.debounce(this.resize, 300);

    dispose() {
        mu.run(this._chart, () => {
            this._chart.dispose();
            this._chart = void 0;
        });
    }

    componentDidMount() {
        this.drawCharts(this.props);
        window.addEventListener('resize', this.windowResize);
    }

    componentDidUpdate(prevProps) {

        const theme = this.getTheme();
        const {style, className} = this.props;
        let {data, options, setting, chartTypes} = prevProps;
        let {force, data: nextData, options: nextOptions, setting: nextSetting, chartTypes: nextChartTypes} = this.props;

        /**
         * 样式产生变化 resize
         */
        if(!_.isEqual(prevProps.style, style) || !_.isEqual(prevProps.className, className)) {
            this.resize();
        }

        /**
         * 渲染主题产生变化
         * 需要 dispose 后 instance
         */
        if(theme.change) {
            this.dispose();
            this.drawCharts(this.props);
        }

        // break 分开写，方便调试
        switch (true) {
            case force:
            case chartTypes !== nextChartTypes:
                this.drawCharts(this.props);
                break;
            case !_.isEqual(data, nextData):
                this.drawCharts(this.props);
                break;
            case JSON.stringify(setting) !== JSON.stringify(nextSetting):
                this.drawCharts(this.props);
                break;
            case JSON.stringify(options) !== JSON.stringify(nextOptions):
                this.drawCharts(this.props);
                break;
        }
    }

    componentWillUnmount() {
        // 组件销货，释放内存
        this.dispose();
        // 注销注册事件
        window.removeEventListener('reszie', this.windowResize);
    }

    render() {
        let {className} = this.props;
        let panelClass = MrServices.cls({
            'mr-echarts': true,
        }, className);

        return <div className={panelClass} style={this.props.style} ref={(div) => (this._chartRef = div)} />;
    }

}
