/**
 * @update mizi.lin@0.1.25.20180523
 * ::=> try echart setOption && resize
 * @update huao@v0.1.22.20181009
 * ::=> 将图的height去掉padding长度
 */

// mark
// 监听dom变化
// element-resize-detector
// const erd = elementResizeDetectorMaker({strategy: "scroll"});

import * as React from 'react';
import * as echarts from 'echarts';
import * as _ from 'lodash';
import * as mu from 'mzmu';
import 'echarts-wordcloud';
import '../assets/js/china.js';
import '../assets/js/theme.customed.js';
import '../assets/styles/mr-echarts.component.less';
import MrEchartsServices from './mr-echarts.services';
import { default as MrServices } from '../mr-common/mr.services';

export interface MrEchartsProps {
    /**
     * 传入数据(推荐):
     * - 与 options 二者存其一；
     */
    data?: any[];

    /**
     * 数据类型:
     * - 仅在 data 存在时生效
     * @default 'dataSource'
     * @values 'dataSet, dataSource'
     */
    dataType?: string;

    /**
     * 数据模型:
     * - 仅在 data 存在时生效
     *
     * @default 'multiple'
     * @values 'single, multiple'
     * */
    dataModel?: string;

    /**
     * 对data进行数据处理
     *
     * @deprecated
     */
    transform?: any;

    /**
     * 图表类型；
     * - 支持子类型(setting or plugin)；
     *
     * @example pie::ring::rose
     */
    chartTypes?: string;

    /**
     * setting
     * - 对options值进行配置处理
     * - plugin 针对chartsType的插件注册方案
     */
    setting?: any;

    /**
     * EchartOptions
     * - 不是推荐方案，but 支持直接传递EchartOptions生成图表
     */
    options?: any;

    /**
     * Echart 主题方案
     * - 需要实现引入
     * @default 'customed'
     */
    theme?: string;

    /**
     * Echart 渲染类型
     * - values: canvas, svg
     *
     * @default 'canvas'
     */
    renderType?: string;

    style?: React.CSSProperties;

    className?: string;

    /**
     * 渲染结束，回调方法
     * - 不推荐使用
     */
    result?: Function;

    /**
     * 隐藏基因遗传对象
     */
    _gene?: any;

    /**
     * 是否每次都渲染组件
     *
     * @default false
     */
    force?: boolean;

    /**
     * 绑定关联 Echarts 事件方法
     * - 点击
     */
    chartClick?: Function;
    /**
     * - 双击
     */
    chartDblClick?: Function;
    /**
     * - 鼠标下按
     */
    chartMouseDown?: Function;
    chartMouseUp?: Function;
    chartMouseOver?: Function;
    chartMouseOut?: Function;
    chartGlobalOut?: Function;
}

class MrEcharts extends React.Component<MrEchartsProps, {}> {
    static DISPLAY_NAME = 'MrEcharts';
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
        return (
            this._chart ||
            mu.run(ref, () => {
                let { renderType = 'canvas' } = this.props;
                let theme = this.getTheme();
                return echarts.init(ref, theme.current, {
                    renderer: renderType
                });
            })
        );
    }

    /**
     * 获得当前echart theme
     *
     * MrCharts.theme > MrEchartsServices.theme > static.theme
     */
    getTheme() {
        let prev = this._theme;
        let { theme } = this.props;
        theme = theme || MrEchartsServices._theme().theme || MrEcharts.THEME;
        !_.isEmpty(MrEchartsServices._theme().themeConfig) && echarts.registerTheme(theme, MrEchartsServices._theme().themeConfig);
        let first = !mu.isExist(prev);
        let change = first ? false : prev !== theme;
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
        let { data, dataType, dataModel, chartTypes } = props;
        let { options } = props;
        let { result, setting, transform } = props;

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
         * 处理词云图的data，将value为undefined 或 null 的设为0------胡奥20181106
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
         *
         * 处理data，将value为undefined 或 null 的设为0------胡奥20181109
         */
        data = mu.map(data, (d) => {
            if (mu.isBaseType(d.value)) {
                if (mu.isNull(d.value) || mu.isUndefined(d.value) || isNaN(d.value)) {
                    d.value = 0;
                }
            } else {
                d.value = 0;
            }
            return d;
        });

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
        let { chartClick, chartDblClick, chartMouseDown, chartMouseUp, chartMouseOver, chartMouseOut, chartGlobalOut } = props;

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
        } catch (e) {}
    }, this);

    windowResize = mu.debounce(this.resize, 300);

    dispose() {
        mu.run(this._chart, () => {
            this._chart.dispose();
            this._chart = void 0;
        });
    }

    /**
     * 修改canvas的高度
     * @param style object
     */
    getStyle(style: any): any {
        if (!style) {
            return void 0;
        } else {
            let newStyle = Object.assign({}, style);
            if (style.height) {
                newStyle.height = newStyle.height - 16;
            }
            return newStyle;
        }
    }

    componentDidMount() {
        this.drawCharts(this.props);
        window.addEventListener('resize', this.windowResize);
    }

    componentDidUpdate(prevProps) {
        const theme = this.getTheme();
        const { style, className, transform } = this.props;
        let { data, options, setting, chartTypes } = prevProps;
        let { force, data: nextData, options: nextOptions, setting: nextSetting, chartTypes: nextChartTypes } = this.props;

        /**
         * 样式产生变化 resize
         */
        if (!_.isEqual(prevProps.style, style) || !_.isEqual(prevProps.className, className)) {
            this.resize();
        }

        /**
         * 渲染主题产生变化
         * 需要 dispose 后 instance
         *
         * 暂时不对 renderType 变化做追踪，极小概率事件
         * 暂时不对 event 变化做追踪
         * 若一定要做变化，使用 force 模式修改
         */
        if (theme.change) {
            this.dispose();
            this.drawCharts(this.props);
        }

        // break 分开写，方便调试
        switch (true) {
            case force:
            case !_.isEqual(prevProps.transform, transform):
                this.dispose();
                this.drawCharts(this.props);
                break;
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
        let { className, style } = this.props;
        let panelClass = MrServices.cls(
            {
                'mr-echarts': true
            },
            className
        );

        return <div className={panelClass} style={this.getStyle(style)} ref={(div) => (this._chartRef = div)} />;
    }
}

export default MrEcharts;
