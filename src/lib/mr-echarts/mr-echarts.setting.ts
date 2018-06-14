/**
 * @creator mizi.lin
 *
 * @update mizi.lin@0.1.25.20180523
 * ::=> 添加 setting.bar::singleColors
 *
 * @update mizi.lin@0.1.26.20180529
 * ::=> 添加 randomAll
 * ::=> wordCloud 添加 width 和 height
 *
 * @uodate mizi.lin@v0.2.0-b8.2o18o614
 * :: => 添加 ::radarCoaxial 雷达各坐标轴同轴（相同的min, max）
 *
 * @uodate mizi.lin@v0.2.0-b.2o18o614
 * :: => 添加极坐标 ::bar:polar 的支持
 */

import * as _ from 'lodash';
import * as mu from 'mzmu';

/**
 * 各种chart基础option配置
 */
export const defOptions = {
    pie: {
        legend: {},
        tooltip: {
            trigger: 'item'
        },
        dataset: {},
        series: []
    },

    bar: {
        grid: {
            left: 'left',
            right: 20,
            bottom: 20,
            width: '98%',
            containLabel: true
        },
        legend: {},
        tooltip: {
            trigger: 'axis'
        },
        yAxis: [{}],
        dataset: {},
        series: [],
        xAxis: [
            {
                type: 'category',
                boundaryGap: true
            }
        ]
    },

    // polar: {
    //     grid: {
    //         left: 'left',
    //         right: 20,
    //         bottom: 20,
    //         width: '98%',
    //         containLabel: true
    //     },
    //     legend: {},
    //     tooltip: {
    //         trigger: 'axis'
    //     },
    //     yAxis: [{}],
    //     dataset: {},
    //     xAxis: [{type: 'category'}]
    // },

    line: {
        grid: {
            left: 'left',
            right: 20,
            bottom: 20,
            width: '95%',
            containLabel: true
        },
        legend: {},
        tooltip: {
            trigger: 'axis'
        },
        dataset: {},
        series: [],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false
            }
        ],
        yAxis: [{type: 'value'}]
    },

    scatter: {
        grid: {
            bottom: 20,
            left: 'left'
        },
        tooltip: {},
        dataset: {},
        series: [],
        yAxis: [{type: 'value'}],
        xAxis: [{type: 'value'}]
    },

    treemap: {
        legend: {},
        tooltip: {},
        dataset: {},
        series: []
    },

    radar: {
        legend: {},
        tooltip: {},
        dataset: {},
        series: [],
        radar: {indicator: []}
    },

    wordCloud: {
        legend: {},
        tooltip: {},
        dataset: {},
        series: []
    },

    gauge: {
        legend: {},
        dataset: {},
        series: [],
        tooltip: {
            formatter: '{a} <br/>{b} = {c}%'
        }
    },

    map: {
        tooltip: {},
        visualMap: {
            min: 0,
            max: 200,
            left: 'left',
            top: 'bottom',
            text: [
                '高',
                '低'
            ],
            calculable: false
        },
        geo: {
            zoom: 1.2,
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#fbfbfb',
                    borderColor: '#b9b4b7'
                }
            }
        },
        series: []
    }
};

/**
 * 各类型的chart, 默认数据处理机制
 * @type {{pie: string; wordCloud: string}}
 */
export const defDataModel = {
    pie: 'single',
    wordCloud: 'single',
    map: 'single'
    // scatter: 'single'
};

/**
 * 默认各类型的chart
 * @type {{bar: string; gauge: string; treemap: string}}
 */
export const defSubType = {
    bar: 'bar::stack',
    gauge: 'gauge::half',
    treemap: 'treemap::simple'
};

/**
 * 各种配置规则
 * @param _colors
 */
export function subSetting(_colors) {
    let {base: _baseColors = [], names: _nameColors = {}} = _colors;

    return {
        /**
         * 不显示xy轴
         * 默认显示x轴名称
         *
         * @map bar, line, scatter, radar
         */
        '::noAxis': {
            'legend.show': false,
            'yAxis[0].axisLine.show': false,
            'yAxis[0].axisTick.show': false,
            'yAxis[0].axisLabel.show': false,
            'yAxis[0].splitArea.show': false,
            'yAxis[0].splitLine.show': false,
            'xAxis[0].axisLine.show': false,
            'xAxis[0].axisTick.show': false,
            'xAxis[0].splitArea.show': false,
            'xAxis[0].splitLine.show': false
        },

        // 是否堆叠显示
        // @map bar, line
        '::stack': {
            '$$series[*].stack': 'one'
        },

        /**
         * 平铺呈现
         * @map bar, line
         */
        '::paved': {
            '$$series[*].stack': null
        },

        /**
         * xy轴转换显示
         *
         * @map bar, line, scatter, radar
         */
        '::xyExchange': {
            'xAxis[0].type': 'value',
            'yAxis[0].type': 'category'
        },

        /**
         * 设置柱形图背景阴影
         * @map bar
         */
        '::bg': {
            'series[1].type': 'bar',
            'series[1].zlevel': -2,
            'series[1].barGap': '-100%',
            'series[1].animation': false,
            'series[1].barCategoryGap': '40%',
            'series[1].itemStyle.normal.color': 'rgba(0, 0, 0, .05)',
            '**series[1].data': (obj: any) => {
                let _data = _.get(obj, 'series[0].data');
                let _max = _.maxBy(_data, (o: any) => o.value);
                return mu.map(_.get(obj, 'series[0].data'), (o: any) => {
                    o.value = _max.value * 1.1;
                    return o;
                });
            }
        },

        /**
         * 设置图表area显示方式
         *
         * @map line
         */
        '::area': {
            '$$series[*].areaStyle.opacity': 0.1,
            '$$series[*].smooth': true,
            '$$series[*].smoothMonotone': true
        },

        /**
         * tooltip 显示百分比数值
         *
         * @map line, bar, pie ...
         */
        '::tooltipFormatterPercent': {
            'tooltip.formatter': (obj) => {
                return `${obj.marker} ${obj.data.name}: ${mu.format(obj.data.value, '::1')}`;
            }
        },

        /**
         * tooltip 显示百分比数值2
         *
         * @map line, bar, pie ...
         */
        '::tooltipFormatterPercent2': {
            'tooltip.formatter': (obj) => {
                let x = obj.data.x ? obj.data.x + '<br />' : '';
                return `${x}${obj.marker} ${obj.data.name}: ${obj.data.value}%`;
            }
        },

        /**
         * y轴 显示百分比数值
         * @map line, bar, pie ...
         */
        '::yAxisPercent': {
            '$$yAxis[*].axisLabel.formatter': '{value}%'
        },

        /**
         * x轴 显示百分比数值
         * @map line, bar, pie ...
         */
        '::xAxisPercent': {
            '$$xAxis[*].axisLabel.formatter': '{value}%'
        },

        line: {
            '$$series[*].smooth': true
        },

        'bar::pn': {
            'xAxis[0].max': 100,
            'xAxis[0].min': -100,
            'series[0].label.formatter': (rst) => {
                return `${rst.data._value || rst.data.value}%`;
            },
            'tooltip.formatter': (rst) => {
                return `${rst.data.name}: ${rst.data._value || rst.data.value}%`;
            },
            '**$$series[0].data[*]': (obj, data) => {
                data._value = data.value;
                data.value = -data.value;
                return data;
            }
        },

        /**
         * 在显示singleBar的时候（无legend时)
         * 可以按顺序显示柱子颜色
         */
        'bar::singleColors': {
            '**$$series[0].data[*]': (obj, data, inx) => {
                _.set(data, 'itemStyle.color', _baseColors[inx]);
                return data;
            }
        },

        'bar::polar': [
            {'legend.show': false},
            {'$$series[*].coordinateSystem': 'polar'},
            {'**polar': (options) => {
                    let {xAxis, yAxis} = options;
                    delete options['xAxis'];
                    delete options['yAxis'];
                    _.set(xAxis, '[0].axisLabel.interval', 0);
                    options.angleAxis = xAxis;
                    options.radiusAxis = {
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#dedede",
                                width: 1,
                                type: "solid"
                            },
                        }
                    };
                    return {};
                }}
        ],

        // 柱形阶梯瀑布图
        // 默认拾级上升
        '::ladder': {
            '**series': (obj) => {
                let _series = obj.series;
                let _data0 = mu.clone(_series[0]);
                let _d = _data0.data;
                _data0.name = 'ladder dark start';
                _.set(_data0, 'itemStyle.barBorderColor', 'rgba(0, 0, 0, 0)');
                _.set(_data0, 'itemStyle.color', 'rgba(0, 0, 0, 0)');
                _.set(_data0, 'itemStyle.emphasis.barBorderColor', 'rgba(0, 0, 0, 0)');
                _.set(_data0, 'itemStyle.emphasis.color', 'rgba(0, 0, 0, 0)');
                _.set(_data0, 'tooltip.show', false);
                _d = mu.map(_d, (o) => o.value);
                _d.unshift(0);
                _d.pop();
                mu.each(_d, (o, inx) => {
                    _d[inx] = o + (_d[inx - 1] || 0);
                });
                _data0.data = _d;
                _series.unshift(_data0);
                return obj.series;
            }
        },

        pie: {
            '$$series[*].center': [
                '50%',
                '55%'
            ]
        },

        // 饼图 => 环形
        'pie::ring': [
            {
                '$$series[*].radius': [
                    '50%',
                    '75%'
                ]
            }
        ],

        '::ringLabel': {
            '$$series[*].avoidLabelOverlap': false,
            '$$series[*].selectedMode': 'single',
            '$$series[*].label': {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    lineHeight: 56,
                    fontSize: 14,
                    formatter: (o) => {
                        return `${o.name}\n${mu.format(o.value)}\n${o.data['$rowPercent2']}`;
                    }
                }
            }
        },

        // 隐藏label
        '::hideLabel': {
            '$$series[*].label.normal.show': false
        },

        'pie::rose': [
            {'$$series[*].roseType': 'area'},
            {
                '$$series[*].radius': [
                    '10%',
                    '75%'
                ]
            },
            {'$$series[*].label.normal.show': true}
        ],

        'pie::ring::rose': [
            {'series[0].roseType': 'area'},
            {
                'series[0].radius': [
                    '10%',
                    '65%'
                ]
            },
            {'series[0].label.normal.show': false},
            // 'series[0].itemStyle.color': _colors[0],
            {'series[1].tooltip.show': false},
            {'series[1].type': 'pie'},
            {'series[1].hoverAnimation': false},
            {'series[1].zlevel': -2},
            {
                'series[1].radius': [
                    '66%',
                    '75%'
                ]
            },
            {
                'series[1].center': [
                    '50%',
                    '55%'
                ]
            },
            // 'series[1].itemStyle.color': '#CFD7D9'},
            {'series[1].itemStyle.borderWidth': 1},
            {'series[1].itemStyle.borderColor': '#fff'},
            {
                '**series[1].data': (obj) => {
                    return mu.map(_.get(obj, 'series[0].data'), (o) => {
                        o.value = 1;
                        return o;
                    });
                }
            },
            {'series[1].label.normal.show': true}
            // 'series[1].label.normal.position': 'inside'
        ],

        map: {
            'visualMap.inRange.color': [
                '#ffffff',
                _.get(_colors, 'base[0]')
            ],
            'geo.itemStyle.emphasis.areaColor': _.get(_colors, 'base[1]')
        },

        // 地图 => 中国地图
        'map::china': {
            'geo.map': 'china',
            'series[0].mapType': 'china',
            'series[0].geoIndex': 0,
            'series[0].name': '地域'
        },

        // 仪表盘: 半圆
        'gauge::half': {
            'grid.top': 0,
            'grid.left': 0,
            'grid.bottom': 0,
            'grid.right': 0,
            'series[0].axisTick.show': false,
            'series[0].axisLabel.show': false,
            'series[0].splitLine.show': false,
            'series[0].startAngle': 180,
            'series[0].endAngle': 0,
            'series[0].pointer.length': '60%',
            'series[0].pointer.width': 6,
            'series[0].detail': {
                formatter: '{value}%'
            }
        },

        'scatter::pop': {
            '$$series[*].symbol': 'circle',
            '$$series[*].symbolSize': 18,
            '$$series[*].label.show': false,
            '$$series[*].label.emphasis.show': true,
            '$$series[*].label.position': 'top',
            '$$series[*].label.formatter': (p) => p.name,
            '$$series[*].itemStyle': {
                color: '#BFC8CF',
                opacity: 0.6
            }
        },

        'treemap::simple': {
            '$$series[*].left': 0,
            '$$series[*].right': 0,
            '$$series[*].top': 0,
            '$$series[*].bottom': 0,
            '$$series[*].width': '100%',
            '$$series[*].height': '100%',
            '$$series[*].roam': false,
            '$$series[*].nodeClick': false,
            '$$series[*].breadcrumb.show': false,
            '$$series[*].itemStyle.borderWidth': 3,
            '$$series[*].itemStyle.borderColor': '#fff',
            '$$series[*].itemStyle.borderColorSaturation': 1
        },

        radar: {
            '$$series[*].name': ''
        },

        'radar::area': {
            'radar.splitArea.show': false,
            'radar.splitLine.lineStyle.color': 'rgba(155, 155, 155, .2)',
            'radar.axisLine.lineStyle.color': 'rgba(155, 155, 155, .2)',
            'radar.name.color': 'rgba(155, 155, 155, .8)',
            '$$series[*].areaStyle.normal.opacity': 0.3,
            '$$series[*].lineStyle.normal.opacity': 0.3,
            '$$series[*].symbol': 'none'
        },

        // @deprecated
        '::radarZero': {
            '$$radar.indicator[*].min': 0
        },

        '::radarMinZero': {
            '$$radar.indicator[*].min': 0
        },

        // @deprecated
        '::radarMaximum': {
            '**$$radar.indicator[*].max': (options, data) => {
                let indicator = _.get(options, 'radar.indicator');
                indicator = mu.clone(indicator);
                let maxItem = _.maxBy(indicator, (o: any) => o.max);
                let max = maxItem.max * 1.05;
                return max ? max : 5;
            }
        },

        '::radarMaxSome': {
            '**$$radar.indicator[*].max': (options, data) => {
                let indicator = _.get(options, 'radar.indicator');
                indicator = mu.clone(indicator);
                let maxItem = _.maxBy(indicator, (o: any) => o.max);

                console.debug(maxItem);

                let max = maxItem.max * 1.05;
                return max ? max : 5;
            }
        },

        /**
         * 雷达同轴
         * 默认不同轴
         */
        // '::radarCoaxial': '::radarMinZero::radarMaxSome',

        '::radarCoaxial': {
            '**$$radar.indicator[*].max': (options, data) => {
                let indicator = _.get(options, 'radar.indicator');
                indicator = mu.clone(indicator);
                let maxItem = _.maxBy(indicator, (o: any) => o.max);
                let max = maxItem.max * 1.05;
                return max ? max : 5;
            },

            '$$radar.indicator[*].min': 0
        },

        wordCloud: {
            '$$series[*].shape': 'circle',
            '$$series[*].width': '95%',
            '$$series[*].height': '90%',
            '$$series[*].sizeRange': [
                14,
                42
            ],
            '$$series[*].rotationRange': [
                -45,
                90
            ]
        },

        'wordCloud::random': {
            '$$series[*].textStyle.normal.color': () => {
                return _.get(_colors, `base[${mu.randomInt(0, 4)}]`);
            }
        },

        'wordCloud::randomAll': {
            '$$series[*].textStyle.normal.color': () => {
                let len = _baseColors.length;
                return _baseColors[mu.randomInt(0, len - 1)];
            }
        }
    };
}
