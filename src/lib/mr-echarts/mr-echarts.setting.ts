import * as _ from 'lodash';
import * as mu from 'mzmu';

/**
 * 各种chart基础option配置
 */
export const defOptions = {
    pie: {
        legend: {},
        tooltip: {},
        dataset: {},
        series: []
    },

    bar: {
        grid: {
            left: 20,
            right: 20,
            bottom: 20,
            containLabel: true
        },
        legend: {},
        tooltip: {},
        yAxis: [{}],
        dataset: {},
        series: [],
        xAxis: [{type: 'category'}]
    },

    line: {
        grid: {
            left: 50,
            right: 20,
            bottom: 20,
            containLabel: true
        },
        legend: {},
        tooltip: {},
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
            left: 40
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
            calculable: false,

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
    wordCloud: 'single'
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
    return {
        // 不显示xy轴
        // 默认显示x轴名称
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
        '::stack': {
            '$$series[*].stack': 'one'
        },
        // 正负值 颜色配置
        '::pnColors': {
            '**$$series[*]': (obj, data) => {
                mu.run(_.get(_colors, `pn.${data.name.toUpperCase()}`), (color) => {
                    data = _.set(data, 'itemStyle.color', color);
                });
                return data;
            }
        },
        '::xyExchange': {
            'xAxis[0].type': 'value',
            'yAxis[0].type': 'category'
        },
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
        '::area': {
            '$$series[*].areaStyle.opacity': 0.1,
            '$$series[*].smooth': true,
            '$$series[*].smoothMonotone': true
        },
        '::tooltipFormatterPercent': {
            'tooltip.formatter': (obj) => {
                return `${obj.marker} ${obj.data.name}: ${mu.format(obj.data.value, '::1')}`;
            }
        },
        '::tooltipFormatterPercent2': {
            'tooltip.formatter': (obj) => {
                let x = obj.data.x ? obj.data.x + '<br />' : '';
                return `${x}${obj.marker} ${obj.data.name}: ${obj.data.value}%`;
            }
        },
        '::yAxisPercent': {
            '$$yAxis[*].axisLabel.formatter': '{value}%'
        },
        '::xAxisPercent': {
            '$$xAxis[*].axisLabel.formatter': '{value}%'
        },
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
            'inRange.color': [
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
            'series[0].name': '地域分布'
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
        wordCloud: {
            '$$series[*].shape': 'circle',
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
        }
    };
}
