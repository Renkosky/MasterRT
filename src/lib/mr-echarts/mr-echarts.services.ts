/**
 * MrEchartsService
 *
 * @update mizi.lin@20180508
 * ::=> 支持按name匹配颜色
 *
 * @update mizi.lin@v0.1.25.20180523
 * ::=> 处理single状态下，x值存在与否，处理方式
 *
 * //todo 重写 echarts 实现方式
 *
 * @update mizi.lin@v0.1.26-b3.20180531
 * ::=> 添加基于雷达的
 *
 * @update mizi.lin@v0.1.26-b8.2018o531
 * ::=> 添加纵向计算占比值，以及@group方法
 *
 * @update mizi.lin@v0.1.27-b3.2018o6o6
 * ::=> 修改dataView value = 0 时呈现问题，以及设置默认支持中文字符下载
 *
 * @uodate mizi.lin@v0.2.0-b8.2o18o614
 * :: => fixed bugs: 雷达数据在计算雷达计算最大最小值时，源数据未进行transform, 从而造成 max, min 值计算错位
 *
 */

import  mu from 'mzmu';
import * as _ from 'lodash';
import { defDataModel, defOptions, defSubType, subSetting } from './mr-echarts.setting';
import * as _colors from '../assets/js/theme.customed.js';
import { default as MrServices } from '../mr-common/mr.services';

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
    _theme() {
        return mu.ifempty(MrServices.getEchartsTheme(), 'customed');
    },

    _colors() {
        return mu.ifempty(MrServices.getEchartsColors(), _colors);
    },

    CHART_RENDER_TYPE: 'canvas',

    /**
     * 序列化对象
     * @param setting
     */
    serialize(setting: any) {
        return mu.type(setting, 'array')
            ? setting
            : mu.map(
                  setting,
                  (v, k) => {
                      return { [k]: v };
                  },
                  []
              );
    },

    /**
     * 数据转换
     * @param data
     * @param rules
     */
    ['@convert'](data: any[], rules: object[]) {
        return mu.map(data, (item) => {
            mu.each(rules, (source, target) => {
                let v = _.get(item, source);
                if (mu.isExist(v)) {
                    item[target] = v;
                }
            });
            return item;
        });
    },

    /**
     * 按数据分组
     * @param data
     * @param key
     */
    ['@group'](data: any[], key: string) {
        let groups = mu.groupArray(data, key);
        return mu.map(groups, (o) => o, []);
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
                let { series, xAxis } = options;
                mu.each(series, (o) => {
                    if (o.type === 'line') {
                        o.type = 'bar';
                        xAxis[0].boundaryGap = true;
                    } else if (o.type === 'bar') {
                        o.type = 'line';
                        xAxis[0].boundaryGap = false;
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
            },

            // deleteKey
            deleteKey: (options) => {}
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

            let _obj = mu.clone(obj);

            mu.each(_.get(obj, p1), (o, idx) => {
                value = _fn ? _fn(_obj, o, idx) : value;
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
     * @param data 数据源
     * @param transform 数据处理
     * @param dataType 数据来源类型
     * @param dataModel 数据转换模型
     * @param setting 配置参数
     * @return {*}
     */
    transform(data, transform = [], dataType = 'dataSource', dataModel = 'group', setting = {}) {
        // 复制原数据，作为返回数据比较使用

        mu.run(transform, () => {
            mu.each(transform, (handle, key) => {
                if (typeof handle === 'function') {
                    data = handle(data);
                } else {
                    let [fnn] = _.keys(handle);
                    mu.if(this[fnn], (fn) => {
                        data = fn(data, handle[fnn]);
                    });
                }
            });
        });

        let $data = mu.clone(data);

        // 过滤部分不合法数据
        data = data.filter((o) => mu.isExist(o.name) && o.name !== '');

        // 将数据按组显示
        // 过滤数据中重复数据
        let _data = mu.run(
            dataModel === 'single',
            () => {
                return mu.map(
                    data,
                    (o) => {
                        return {
                            __key__: o[CHART_NAME],
                            __val__: o
                        };
                    },
                    {}
                );
            },
            () => {
                return mu.groupArray(data, CHART_NAME);
            }
        );

        // 获得 legend array
        let _legend = mu.map(
            _data,
            (o, name) => {
                return { name };
            },
            []
        );

        // 按 _legend 的顺序重新排列数据
        let _series = mu.map(
            _legend,
            (legend) => {
                return _data[mu.ifnvl(legend.name, legend)];
            },
            []
        );

        // 统计并计算横向（经度）数据
        _series = this.rowCalc(_series, dataModel);

        // 统计并计算纬度信息
        _series = this.colCalc(_series, dataModel);

        let _x =
            dataModel === 'single'
                ? mu.run(() => {
                      let xd = mu.map(data, (o) => {
                          return o[CHART_X];
                      });

                      return mu.isEmpty(_.compact(xd)) ? null : xd;
                  })
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
            // $transform: data,
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

        if (mu.type(_series[0], 'object')) {
            _series = [_series];
        }

        let _dataView =
            mu.map(_series, (arr, inx) => {
                let legend = _legend[inx] || {};
                let legendName = legend.name || legend;

                arr.unshift(mu.isEmpty(_x) ? '' : legendName);
                arr = mu.map(arr, (o) => mu.ifnvl(mu.ifnvl(o.value, o), '-'));
                return arr;
            }) || [];

        if (mu.isEmpty(_x) && _dataView && _dataView[0] && _dataView[0].length) {
            _x = mu.map(
                _dataView[0].length - 1,
                (i, inx) => {
                    let x = legend[inx] || 0;
                    x = x.name || x;
                    return x;
                },
                []
            );
        }

        _x = mu.ifnvl(_x, []);
        _x.unshift('');
        _dataView.unshift(_x);

        return _dataView;
    },

    /**
     * 计算当前series纵向数据统计，及所占百分比
     * @param {any[]} series
     * @param {string} dataModel
     */
    colCalc(series: any[] = [], dataModel: string = 'group') {
        if (mu.isEmpty(series) || dataModel !== 'group') {
            return series;
        }

        // col length
        let colLen = series[0].length;

        let sums = mu.map(
            colLen,
            (i, ii) => {
                return _.reduce(
                    series,
                    (sum, d) => {
                        return sum + d[ii].value;
                    },
                    0
                );
            },
            []
        );

        return mu.map(series, (items) => {
            return mu.map(items, (d, inx) => {
                let sum = sums[inx];
                d.$colSum = sum;
                d.$colRate = mu.format(d.value / sum, ':4');
                d.$colPercent = mu.format(d.value / sum, '::');
                d.$colPercent2 = mu.format(d.value / sum, '::2');
                d.$value = d.value;
                return d;
            });
        });
    },

    /**
     * 计算当前series横向数据统计，及所占百分比
     * @param series
     * @param dataModel
     */

    rowCalc(series: any[] = [], dataModel: string = 'group') {
        if (dataModel === 'single') {
            let sum: number = _.reduce(
                series,
                (sum, d) => {
                    return sum + d.value;
                },
                0
            );
            return mu.map(series, (d) => {
                d.$rowSum = sum;
                d.$rowRate = mu.format(d.value / sum, ':4');
                d.$rowPercent = mu.format(d.value / sum, '::');
                d.$rowPercent2 = mu.format(d.value / sum, '::2');
                d.$value = d.value;
                return d;
            });
        } else if ((dataModel = 'group')) {
            return mu.map(series, (item) => {
                return this.rowCalc(item, 'single');
            });
        }
    },

    /**
     * 初始调整options
     * @param options
     */
    initOptions(options) {
        let { names } = this._colors();

        /**
         * 按series name名称匹配颜色
         */
        mu.run(names, () => {
            let series = options.series;

            options.series = mu.map(series, (item) => {
                let { name, type, data } = item;
                let color = names[name];

                if (mu.or(type, 'pie', 'radar') || !color) {
                    mu.each(data, (d) => {
                        let name = d.name;
                        let color = names[name];
                        if (color) {
                            _.set(d, 'itemStyle.color', color);
                        }
                    });
                } else {
                    _.set(item, 'itemStyle.color', color);
                }

                return item;
            });
        });

        // _.set(options, 'series[0].itemStyle.color', '#0f0');

        return options;
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
                                let tmp = [max_, min_];
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

                switch (chartType) {
                    case 'map':
                        /**
                         * 虚拟
                         * @type {*}
                         */
                        let max: any = _.maxBy(rst._series, (o: any) => o.value) || {};
                        options = _.set(options, 'visualMap.max', max.value);
                        break;
                }
            },

            () => {
                let data;

                switch (chartType) {
                    case 'map':
                        /**
                         * 虚拟
                         * @type {*}
                         */
                        let max: any = _.maxBy(rst._series, (o: any) => o.value) || {};
                        options = _.set(options, 'visualMap.max', max.value);

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
                                    value: [o[0].x, o[0].value]
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
        let paramSetting = [];
        if (mu.type(setting, 'array')) {
            /**
             * setting=['::ring', '::rose({ borderWidth: 6 })'] 支持配置数组带参数
             */
            mu.each(setting, (rule) => {
                if (typeof rule === 'string' && rule.indexOf('::') !== -1) {
                    let [tempChartType, ...tempSubType] = rule.split('::');
                    _subType = _subType.concat(tempSubType);
                } else {
                    paramSetting.push(rule);
                }
            });
        } else {
            paramSetting = setting;
        }

        /**
         * setting 配置的权重值
         * subSetting[chartType] < subSetting[sub] < subSetting[subGroup] < subSetting[subType] < setting(paramSetting)
         * subType = chartType::sub...
         */

        let _subSetting: any = subSetting(this._colors());
        _subSetting = { ..._subSetting, ...MrServices.getEchartsSubTypes() };

        let _setting = mu.extend({}, this.flatDataSetting(_subSetting[_chartType]));

        mu.run(_subType, () => {
            mu.each(_subType, (sub) => {
                let type = this.getSetType(sub);
                _setting = mu.extend(_setting, this.flatDataSetting(_subSetting[`::${type.sub}`], type.param));
            });
            mu.each(_subType, (sub) => {
                let type = this.getSetType(sub);
                _setting = mu.extend(_setting, this.flatDataSetting(_subSetting[`${_chartType}::${type.sub}`], type.param));
            });
            /**
             * pie::ring::rose 整体调用模式
             */
            let type = this.getSetType(_subType[_subType.length - 1]);
            _subType[_subType.length - 1] = type.sub;
            _setting = mu.extend(_setting, this.flatDataSetting(_subSetting[`${_chartType}::${_subType.join('::')}`], type.param));
        });
        _setting = mu.extend(_setting, this.flatDataSetting(paramSetting));

        return _setting;
    },

    /**
     *
     * @param sub  string 判断并处理sub字符串函数及所带参数
     * 例子：将"::rose({borderWidth:4})" =>{sub: rose, param:{borderWidth:4}}
     * 例子：将"::rose" =>{sub: rose}
     */
    getSetType(sub: string) {
        let type = sub.split('(');
        let param = [];
        if (type[1]) {
            param = type[1].split(')');
        }
        let subType: any = { sub: type[0] };
        param[0] !== '' && (subType.param = eval('(' + param[0] + ')'));
        return subType;
    },

    /**
     * 处理返回数组化的setting数据
     * @param setting
     */
    flatDataSetting(setting: any, param: any) {
        if (setting) {
            let set = _.isFunction(setting) ? setting(param && param) : setting;
            if (mu.type(set, 'array')) {
                let _set = {};
                mu.each(set, (o) => {
                    _set = mu.extend(_set, o);
                });
                return _set;
            } else {
                return set;
            }
        } else {
            return {};
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
     * @param transform
     * @return {*}
     */
    getOptions(data = [], dataType = 'dataSource', dataModel, chartTypes = 'line', setting = {}, transform) {
        console.debug('~~~~', chartTypes);

        let [_chartType] = chartTypes.split('::');

        // 获得默认的数据转换模型
        let _dataModel = dataModel || defDataModel[_chartType] || 'group';

        // setting 配置最终以手动（component prop setting)为准
        let _setting = this.getSetting(chartTypes, setting);

        // 获得默认的 options 配置
        let _opts = mu.clone(defOptions[_chartType]);

        // 数据转换结果
        let _rst = this.transform(data, transform, dataType, _dataModel);

        // 根据数据设置series, 得到初始options
        _opts = this.injectOptions(_opts, _rst, _chartType, _dataModel, _setting);

        // 初步调整options
        _opts = this.initOptions(_opts);

        // 根据某些规则，重新配置options
        _opts = this.reOptions(_opts, _setting, _chartType, _dataModel);

        return {
            options: _opts,
            data: _rst
        };
    }
};
