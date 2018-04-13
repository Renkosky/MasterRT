import * as mu from 'mzmu';
import * as _ from 'lodash';
import {defDataModel, defOptions, defSubType, subSetting} from './mr-echarts.setting';
import * as _colors from '../assets/js/theme.customed.js';
// CHART_NAME 决定 legend
const CHART_NAME = 'name';
// CHART_X 决定 x 轴
const CHART_X = 'x';
// CHART_VALUE 决定y轴数据
// const CHART_VALUE = 'value';

/**
 * MrEcharts Services
 */
export default {
    _theme: 'customed',
    _colors: _colors,

    CHART_RENDER_TYPE: 'canvas',

    /**
     * 序列化对象
     * @param setting
     */
    serialize(setting: any) {
        return mu.type(setting, 'array') ? setting : mu.map(setting, (v, k) => {
            return {[k]: v};
        }, []);
    },

    /**
     * 重写 _.set
     * 支持按通配符 * 全组遍历
     * @param obj
     * @param key
     * @param value
     * @return {*}
     */
    muSet(obj, key, value) {

        let fn = {

            // xy轴互换
            xyExchange: (options: any, isExhange) => {
                let _opts = _.clone(options);
                options['yAxis'] = _opts['xAxis'];
                options['xAxis'] = _opts['yAxis'];
                // _.set(options, 'grid.left', 100);
                return options;
            },

            // 线图和柱形图互换
            lineBarExchange: (options) => {
                let series = options.series;
                mu.each(series, (o) => {
                    if(o.type === 'line') {
                        o.type = 'bar';
                    } else if(o.type === 'bar') {
                        o.type = 'line';
                    }
                });
            },

            // 显示x轴所有值
            xAxisShowAll: (options, value) => {
                _.set(options, 'xAxis[0].axisLabel.interval', 0);
                _.set(options, 'xAxis[0].axisLabel.rotate', 20);
                // _.set(options, 'grid.bottom', 50);
                return options;
            },

            // 是否显示 legend
            legendShow: (options) => {
                let _show = !mu.ifnvl(_.get(options, 'legend.show'), true);
                _.set(options, 'legend.show', _show);
                _.set(options, 'grid.top', _show ? 60 : 10);
                return options;
            }
        };

        let _obj = mu.clone(obj);
        let _fn;

        // get 原数据
        if (typeof value === 'string' && /\$\$/.test(value)) {
            let _path = value.replace(/\$\$/, '');
            value = _.get(_obj, _path);
        }

        // 配置自定义函数
        if (/\*\*/.test(key) && typeof value === 'function') {
            key = key.replace(/\*\*/, '');
            _fn = value;
        }

        // 各种方法处理
        if (/\$\$/.test(key)) {
            let _path = key.replace(/\$\$/, '');
            let [p1, p2] = _path.split('[*]');
            p2 = p2.replace(/^\./, '');

            mu.each(_.get(obj, p1), (o, idx) => {
                value = _fn ? _fn(obj, o, idx) : value;
                if (p2) {
                    _.set(o, p2, value);
                } else {
                    _.set(obj, `${p1}[${idx}]`, value);
                }
            });
        } else if (/^@@/.test(key)) {
            let fname = key.replace(/^@@/, '');
            fn[fname] && fn[fname](obj, value);
        } else {
            value = _fn ? _fn(obj) : value;
            _.set(obj, key, value);
        }

        return obj;
    },

    /**
     * 获得分组数中的最大最小值
     */
    maxmin(data, groupKey) {
        let _data = mu.groupArray(data, groupKey);
        return mu.map(_data, (o) => {
            return {
                max: _.maxBy(o, (oo: any) => parseFloat(oo.value)),
                min: _.minBy(o, (oo: any) => parseFloat(oo.value))
            };
        });
    },

    /**
     * 数据转换
     * @param data 数据来源
     * @param dataType 数据来源类型
     * @param dataModel 数据转换模型
     * @param setting 配置参数
     * @return {*}
     */
    transform(data, dataType = 'dataSource', dataModel = 'group', setting = {}) {
        let $data = mu.clone(data);

        let _data = mu.run(dataModel === 'single', () => {
            return mu.map(data, (o) => {
                return {
                    __key__: o[CHART_NAME],
                    __val__: o
                };
            }, {});
        }, () => {
            return mu.groupArray(data, CHART_NAME);
        });

        let _legend = mu.map(_data, (o, name) => {
            return {name};
        }, []);

        let _series = mu.map(
            _legend,
            (legend) => {
                return _data[legend.name || legend];
            },
            []
        );

        let _x =
            dataModel === 'single'
                ? null
                : mu.map(
                mu.groupArray(data, CHART_X),
                (o, name) => {
                    return name;
                },
                []
                );

        let _dataView = this.getDataView(_series, _legend, _x);

        return {
            $data,
            _legend,
            _series,
            _x,
            _dataView
        };
    },

    getDataView(series, legend = [], x = []) {

        let _series = mu.clone(series);
        let _legend = mu.clone(legend);
        let _x = mu.clone(x);


        if(mu.type(_series[0], 'object')){
            _series = [_series];
        }

        let _dataView = mu.map(_series, (arr, inx) => {
            let legend = _legend[inx] || {};
            let legendName = legend.name || legend;
            arr.unshift(legendName);
            arr = mu.map(arr, (o) => o.value || o);
            return arr;
        });

        if(mu.isEmpty(_x)) {
            _x = mu.map(_dataView[0].length - 1, () => void 0, []);
        }

        _x.unshift('');
        _dataView.unshift(_x);

        return _dataView;
    },

    /**
     * 根据数据配置series
     * 以及将data注入series
     * @param options
     * @param dataModel
     * @param chartType
     * @param rst
     * @param setting
     */
    injectOptions(options, rst, chartType, dataModel, setting) {
        /**
         * legend
         */
        mu.run(rst._legend, (legend) => {
            switch (chartType) {
                case 'map':
                case 'gauge':
                case 'scatter':
                    break;
                default:
                    options = _.set(options, 'legend.data', rst._legend);
                    break;
            }
        });

        /**
         * x 轴配置
         */
        mu.run(rst._x, (x) => {
            switch (chartType) {
                case 'radar':
                    let _maxmin = this.maxmin(rst.$data, CHART_X);

                    options = _.set(
                        options,
                        'radar.indicator',
                        mu.map(x, (name) => {
                            let max_ = parseFloat(_.get(_maxmin[name], 'max.value'));
                            let min_ = parseFloat(_.get(_maxmin[name], 'min.value'));

                            if (max_ < min_) {
                                let tmp = [
                                    max_,
                                    min_
                                ];
                                max_ = tmp[1];
                                min_ = tmp[0];
                            }

                            let min = Math.ceil(min_ * (min_ > 0 ? 0.95 : 1.05));
                            let max = Math.ceil(max_ * (max_ > 0 ? 1.05 : 0.95));

                            return {
                                name,
                                max,
                                min
                            };
                        })
                    );
                    break;
                case 'map':
                    let max: any = _.maxBy(rst.$data, (o: any) => o.value) || {};
                    options = _.set(options, 'visualMap.max', max.value);
                    break;
                case 'gauge':
                case 'scatter':
                    break;
                default:
                    options = _.set(options, 'xAxis[0].data', x);
                    break;
            }
        });

        /**
         * series 设置
         * @type {*[]}
         */

        mu.run(
            dataModel === 'single',
            () => {
                options.series = [
                    {
                        type: chartType,
                        data: rst._series
                    }
                ];
            },
            () => {
                let data;

                switch (chartType) {
                    case 'map':
                        let dataMap = mu.map(
                            rst._series,
                            (o, name) => {
                                return {
                                    name: _.get(o, '[0].name'),
                                    value: (mu.map(o, (oo) => oo.value, []) || [])[0]
                                };
                            },
                            []
                        );

                        options.series = [
                            {
                                type: chartType,
                                name: _.get(dataMap, '[0].name'),
                                data: dataMap,
                                label: {
                                    normal: {
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                }
                            }
                        ];

                        break;
                    case 'radar':
                        data = mu.map(
                            rst._series,
                            (o, name) => {
                                return {
                                    name: _.get(o, '[0].name'),
                                    value: mu.map(o, (oo) => oo.value, [])
                                };
                            },
                            []
                        );

                        options.series = [
                            {
                                type: chartType,
                                name: _.get(data, '[0].name'),
                                data
                            }
                        ];

                        break;

                    case 'scatter':
                        data = mu.map(
                            rst._series,
                            (o, name) => {
                                return {
                                    name: _.get(o, '[0].name'),
                                    value: [
                                        o[0].value,
                                        o[0].x
                                    ]
                                };
                            },
                            []
                        );

                        options.series = [
                            {
                                type: chartType,
                                name: _.get(data, '[0].name'),
                                data
                            }
                        ];

                        break;

                    default:
                        options.series = mu.map(rst._series, (o) => {
                            return {
                                type: chartType,
                                name: _.get(o, '[0].name'),
                                data: o
                            };
                        });

                        break;
                }
            }
        );

        return options;
    },

    /**
     * 获取完整的 setting 配置
     * @param chartTypes
     * @param setting
     * @return {*}
     */
    getSetting(chartTypes, setting) {

        chartTypes = defSubType[chartTypes] || chartTypes;

        let [_chartType, ..._subType] = chartTypes.split('::');

        /**
         * setting 配置的权重值
         * subSetting[chartType] < subSetting[sub] < subSetting[subGroup] < subSetting[subType] < setting
         * subType = chartType::sub...
         */

        let _subSetting = subSetting(this._colors);
        let _setting = mu.extend({}, this.flatDataSetting(_subSetting[_chartType]));

        mu.run(_subType, () => {
            mu.each(_subType, (sub) => {
                _setting = mu.extend(_setting, this.flatDataSetting(_subSetting['::' + sub]));
            });

            mu.each(_subType, (sub) => {
                _setting = mu.extend(_setting, this.flatDataSetting(_subSetting[`${_chartType}::${sub}`]));
            });

            _setting = mu.extend(_setting, this.flatDataSetting(_subSetting[`${_chartType}::${_subType.join('::')}`]));
        });

        _setting = mu.extend(_setting, this.flatDataSetting(setting));

        return _setting;
    },

    /**
     * 处理返回数组化的setting数据
     * @param setting
     */
    flatDataSetting(setting) {
        if (mu.type(setting, 'array')) {
            let _setting = {};
            mu.each(setting, (o) => {
                _setting = mu.extend(_setting, o);
            });
            return _setting;
        } else {
            return setting || {};
        }
    },

    /**
     * 根据配置项，重新设置options
     * @param options
     * @param setting
     * @param charType
     */
    reOptions(options, setting, charType) {
        mu.each(setting, (val, key) => {
            this.muSet(options, key, val);
        });

        // switch(charType) {
        //     case 'scatter':
        //
        //         mu.remove(options.xAxis[0], 'data');
        //
        //         break;
        // }

        // 根据 legend.show 调节 grid 关联高度
        mu.run(() => {
            let _show = mu.ifnvl(_.get(options, 'legend.show'), true);
            if (!_show) {
                // todo 暂时不考虑其他方向
                _.set(options, 'grid.top', 10);
            } else {
                // todo 计算legend的高度
            }
        });

        return options;
    },

    /**
     * 获取 echarts options
     * @param data 数据来源
     * @param dataType 数据类型
     * @param dataModel 数据转换模型
     * @param chartTypes
     * @param setting
     * @return {*}
     */
    getOptions(data = [], dataType = 'dataSource', dataModel, chartTypes = 'line', setting = {}) {
        console.debug('~~~~', chartTypes);

        let [_chartType] = chartTypes.split('::');

        // 获得默认的数据转换模型
        let _dataModel = dataModel || defDataModel[_chartType] || 'group';

        // setting 配置最终以手动（component prop setting)为准
        let _setting = this.getSetting(chartTypes, setting);

        // 获得默认的 options 配置
        let _opts = mu.clone(defOptions[_chartType]);

        // 数据转换结果
        let _rst = this.transform(data, dataType, _dataModel);

        // 根据数据设置series, 得到初始options
        _opts = this.injectOptions(_opts, _rst, _chartType, _dataModel, _setting);

        // 根据某些规则，重新配置options
        _opts = this.reOptions(_opts, _setting, _chartType, _dataModel);

        return {
            options: _opts,
            data: _rst
        };
    },

    setTheme(theme: string) {
        this._theme = theme;
    },

    setColors(colors) {
        this._colors = colors;
    }
};
