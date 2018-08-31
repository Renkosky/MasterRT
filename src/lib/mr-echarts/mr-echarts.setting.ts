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
 * @update mizi.lin@v0.2.0-b8.2o18o614
 * :: => 添加 ::radarCoaxial 雷达各坐标轴同轴（相同的min, max）
 *
 * @update mizi.lin@v0.2.0-b.2o18o614
 * :: => 添加极坐标 ::bar:polar 的支持
 *
 * @update mizi.lin@0.2.1-b6.20180723
 * :: => 添加percent100（按比例100%显示）显示
 */

import * as _ from 'lodash';
import * as mu from 'mzmu';

const citys = {
    '海门': [121.15, 31.89],
    '鄂尔多斯': [109.781327, 39.608266],
    '招远': [120.38, 37.35],
    '舟山': [122.207216, 29.985295],
    '齐齐哈尔': [123.97, 47.33],
    '盐城': [120.13, 33.38],
    '赤峰': [118.87, 42.28],
    '青岛': [120.33, 36.07],
    '乳山': [121.52, 36.89],
    '金昌': [102.188043, 38.520089],
    '泉州': [118.58, 24.93],
    '莱西': [120.53, 36.86],
    '日照': [119.46, 35.42],
    '胶南': [119.97, 35.88],
    '南通': [121.05, 32.08],
    '拉萨': [91.11, 29.97],
    '云浮': [112.02, 22.93],
    '梅州': [116.1, 24.55],
    '文登': [122.05, 37.2],
    '上海': [121.48, 31.22],
    '攀枝花': [101.718637, 26.582347],
    '威海': [122.1, 37.5],
    '承德': [117.93, 40.97],
    '厦门': [118.1, 24.46],
    '汕尾': [115.375279, 22.786211],
    '潮州': [116.63, 23.68],
    '丹东': [124.37, 40.13],
    '太仓': [121.1, 31.45],
    '曲靖': [103.79, 25.51],
    '烟台': [121.39, 37.52],
    '福州': [119.3, 26.08],
    '瓦房店': [121.979603, 39.627114],
    '即墨': [120.45, 36.38],
    '抚顺': [123.97, 41.97],
    '玉溪': [102.52, 24.35],
    '张家口': [114.87, 40.82],
    '阳泉': [113.57, 37.85],
    '莱州': [119.942327, 37.177017],
    '湖州': [120.1, 30.86],
    '汕头': [116.69, 23.39],
    '昆山': [120.95, 31.39],
    '宁波': [121.56, 29.86],
    '湛江': [110.359377, 21.270708],
    '揭阳': [116.35, 23.55],
    '荣成': [122.41, 37.16],
    '连云港': [119.16, 34.59],
    '葫芦岛': [120.836932, 40.711052],
    '常熟': [120.74, 31.64],
    '东莞': [113.75, 23.04],
    '河源': [114.68, 23.73],
    '淮安': [119.15, 33.5],
    '泰州': [119.9, 32.49],
    '南宁': [108.33, 22.84],
    '营口': [122.18, 40.65],
    '惠州': [114.4, 23.09],
    '江阴': [120.26, 31.91],
    '蓬莱': [120.75, 37.8],
    '韶关': [113.62, 24.84],
    '嘉峪关': [98.289152, 39.77313],
    '广州': [113.23, 23.16],
    '延安': [109.47, 36.6],
    '太原': [112.53, 37.87],
    '清远': [113.01, 23.7],
    '中山': [113.38, 22.52],
    '昆明': [102.73, 25.04],
    '寿光': [118.73, 36.86],
    '盘锦': [122.070714, 41.119997],
    '长治': [113.08, 36.18],
    '深圳': [114.07, 22.62],
    '珠海': [113.52, 22.3],
    '宿迁': [118.3, 33.96],
    '咸阳': [108.72, 34.36],
    '铜川': [109.11, 35.09],
    '平度': [119.97, 36.77],
    '佛山': [113.11, 23.05],
    '海口': [110.35, 20.02],
    '江门': [113.06, 22.61],
    '章丘': [117.53, 36.72],
    '肇庆': [112.44, 23.05],
    '大连': [121.62, 38.92],
    '临汾': [111.5, 36.08],
    '吴江': [120.63, 31.16],
    '石嘴山': [106.39, 39.04],
    '沈阳': [123.38, 41.8],
    '苏州': [120.62, 31.32],
    '茂名': [110.88, 21.68],
    '嘉兴': [120.76, 30.77],
    '长春': [125.35, 43.88],
    '胶州': [120.03336, 36.264622],
    '银川': [106.27, 38.47],
    '张家港': [120.555821, 31.875428],
    '三门峡': [111.19, 34.76],
    '锦州': [121.15, 41.13],
    '南昌': [115.89, 28.68],
    '柳州': [109.4, 24.33],
    '三亚': [109.511909, 18.252847],
    '自贡': [104.778442, 29.33903],
    '吉林': [126.57, 43.87],
    '阳江': [111.95, 21.85],
    '泸州': [105.39, 28.91],
    '西宁': [101.74, 36.56],
    '宜宾': [104.56, 29.77],
    '呼和浩特': [111.65, 40.82],
    '成都': [104.06, 30.67],
    '大同': [113.3, 40.12],
    '镇江': [119.44, 32.2],
    '桂林': [110.28, 25.29],
    '张家界': [110.479191, 29.117096],
    '宜兴': [119.82, 31.36],
    '北海': [109.12, 21.49],
    '西安': [108.95, 34.27],
    '金坛': [119.56, 31.74],
    '东营': [118.49, 37.46],
    '牡丹江': [129.58, 44.6],
    '遵义': [106.9, 27.7],
    '绍兴': [120.58, 30.01],
    '扬州': [119.42, 32.39],
    '常州': [119.95, 31.79],
    '潍坊': [119.1, 36.62],
    '重庆': [106.54, 29.59],
    '台州': [121.420757, 28.656386],
    '南京': [118.78, 32.04],
    '滨州': [118.03, 37.36],
    '贵阳': [106.71, 26.57],
    '无锡': [120.29, 31.59],
    '本溪': [123.73, 41.3],
    '克拉玛依': [84.77, 45.59],
    '渭南': [109.5, 34.52],
    '马鞍山': [118.48, 31.56],
    '宝鸡': [107.15, 34.38],
    '焦作': [113.21, 35.24],
    '句容': [119.16, 31.95],
    '北京': [116.46, 39.92],
    '徐州': [117.2, 34.26],
    '衡水': [115.72, 37.72],
    '包头': [110, 40.58],
    '绵阳': [104.73, 31.48],
    '乌鲁木齐': [87.68, 43.77],
    '枣庄': [117.57, 34.86],
    '杭州': [120.19, 30.26],
    '淄博': [118.05, 36.78],
    '鞍山': [122.85, 41.12],
    '溧阳': [119.48, 31.43],
    '库尔勒': [86.06, 41.68],
    '安阳': [114.35, 36.1],
    '开封': [114.35, 34.79],
    '济南': [117, 36.65],
    '德阳': [104.37, 31.13],
    '温州': [120.65, 28.01],
    '九江': [115.97, 29.71],
    '邯郸': [114.47, 36.6],
    '临安': [119.72, 30.23],
    '兰州': [103.73, 36.03],
    '沧州': [116.83, 38.33],
    '临沂': [118.35, 35.05],
    '南充': [106.110698, 30.837793],
    '天津': [117.2, 39.13],
    '富阳': [119.95, 30.07],
    '泰安': [117.13, 36.18],
    '诸暨': [120.23, 29.71],
    '郑州': [113.65, 34.76],
    '哈尔滨': [126.63, 45.75],
    '聊城': [115.97, 36.45],
    '芜湖': [118.38, 31.33],
    '唐山': [118.02, 39.63],
    '平顶山': [113.29, 33.75],
    '邢台': [114.48, 37.05],
    '德州': [116.29, 37.45],
    '济宁': [116.59, 35.38],
    '荆州': [112.239741, 30.335165],
    '宜昌': [111.3, 30.7],
    '义乌': [120.06, 29.32],
    '丽水': [119.92, 28.45],
    '洛阳': [112.44, 34.7],
    '秦皇岛': [119.57, 39.95],
    '株洲': [113.16, 27.83],
    '石家庄': [114.48, 38.03],
    '莱芜': [117.67, 36.19],
    '常德': [111.69, 29.05],
    '保定': [115.48, 38.85],
    '湘潭': [112.91, 27.87],
    '金华': [119.64, 29.12],
    '岳阳': [113.09, 29.37],
    '长沙': [113, 28.21],
    '衢州': [118.88, 28.97],
    '廊坊': [116.7, 39.53],
    '菏泽': [115.480656, 35.23375],
    '合肥': [117.27, 31.86],
    '武汉': [114.31, 30.52],
    '大庆': [125.03, 46.58]
};

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

        '::percent100': {
            '$$series[*].stack': 'one',

            '**$$series[*].data': (obj, series) => {
                let data = series.data;
                return mu.map(data, (item) => {
                    item.value = item.$colRate;
                    return item;
                });
            },

            '$$yAxis[*].max': 1,

            '$$yAxis[*].axisLabel.formatter': (value) => {
                return mu.format(value, '::');
            },

            'tooltip.formatter': (obj, item) => {
                obj = obj || [];
                let formatter = [];
                formatter = mu.map(obj, (item) => {
                    return `${item.marker} ${item.data.name}: ${item.data.$colPercent2} (${item.data.$value})`
                });

                formatter.unshift(_.get(obj[0], 'data.x'));

                return formatter.join('<br />');
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
            {
                '**polar': (options) => {
                    let {xAxis, yAxis} = options;
                    delete options['xAxis'];
                    delete options['yAxis'];
                    _.set(xAxis, '[0].axisLabel.interval', 0);
                    options.angleAxis = xAxis;
                    options.radiusAxis = {
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#dedede',
                                width: 1,
                                type: 'solid'
                            },
                        }
                    };
                    return {};
                }
            }
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

        // 地图 => 地区
        'map::china::citys': {
            
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
        },
    };
}
