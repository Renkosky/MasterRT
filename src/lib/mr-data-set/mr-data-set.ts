import * as ss from 'simple-statistics';
import * as _ from 'lodash';
import mu from 'mzmu';
import $Utils from '../common/utils';
import { dsvFormat, csvParse, tsvParse, csvParseRows } from 'd3-dsv';

/**
 * DataSet
 * 有别于.net中DataSet的概念，在mri中，DataSet 是一组管理 DataTable数据变化，变换等一个集
 *
 * DataTable
 * 它是一个虚拟的数据表，从数据结构来说他是一个对象数组(object[]), 我们可以称他为数据表对象
 *
 * DataRow
 * 它是DataTable的一条记录，它内部有不同的列，存储着不同的内容，以及解释内容的名称 ({[PropName]: value, [PropName1]: value1, ...})
 *
 * DataCol
 * 它是DataTable的列集合，它拥有一个列名称和各DataRow列的结果集合（{[PropName]: value[]}）
 *
 * DataView
 * 它是DataTable的另外一组数据表现形式，并同时让 DataRow有了index值
 */


/**
 * 数据转换及计算
 * 绝大部分概念来源于 G2 的 dv.transform
 * https://www.yuque.com/antv/g2-docs/api-transform
 */
class MrDataSet {
    /**
     * 是否实例化数据
     */
    instance: boolean = false;
    /**
     * 实例化数据存储地
     */
    rows: DataRow[];

    /**
     * 将其他类型的数据都转为一维数组（rows) 类型
     */
    constructor(data?: any, options?: any) {
        [data, options = {}] = arguments;
        let { sourceType } = options;

        if (!_.isNil(data)) {
            this.instance = true;
            this.rows = this.conversion(data, sourceType, options);
        }
    }

    /**
     * 数据变换结构
     * @param dataSource
     * @param sourceType
     * @param options
     */
    conversion(dataSource: any, sourceType: string = 'rows', options: any = {}) {
        let data: any[];
        switch (sourceType) {

            /**
             * csv:
             * 正常的csv结构, 字段是以 逗号',' 或 空格作为分隔符 ' '
             * 以\n作为换行符
             *
             * 如 `foo,bar\n1,2`
             */
            case 'csv':
                data = _.initial(csvParse(dataSource));
                break;

            /**
             * tsv
             * tsv的间隔符是，tab键 '\t'
             * 如 `foo\tbar\n1\t2`
             */
            case 'tsv':
                data = _.initial(tsvParse(dataSource));
                break;

            /**
             * dsv:
             * 非正常的csv结构, 字段是分隔符是指定分隔符
             *
             * 如 `foo|bar\n1|2`
             */
            case 'dsv':
                let { delimiter = ',' } = options;
                data = _.initial(dsvFormat(delimiter).parse(dataSource));
                break;
        }

        return data;
    }

    /**
     * ----------------
     * 静态方法: 常用工具
     * ----------------
     */

    /**
     * 获得table型数据类型的cols的值
     * @param arr
     * @param propName
     * @param predicateType 断言类型
     *
     * predicateType {
     *     'PROPERTY_EXIST': 属性存在
     *     'VALUE_EXIST': 值存在
     *     'SOME_ALL': 所有 default
     * }
     */
    cols(arr: object[], propName: AtLeastPropertyName = [], predicateType: 'SOME_ALL' | 'VALUE_EXIST' | 'PROPERTY_EXIST' = 'SOME_ALL') {
        let propNames = $Utils.upArray(propName);

        return mu.map(
            propNames,
            (name) => {
                return {
                    __key__: name,
                    __val__: mu.map(arr, (item, key) => {
                        switch (predicateType) {
                            case 'SOME_ALL':
                                return item[name];
                            case 'PROPERTY_EXIST':
                                return _.has(item, name) ? item[name] : '__remove_map__';
                            case 'VALUE_EXIST':
                                return _.isNil(item[name]) ? item[name] : '__remove_map__';
                        }
                    })
                };
            },
            {}
        );
    }

    /**
     * 获得Table数据结构的单个col
     * @param arr
     * @param propName
     * @param predicateType
     */
    col(arr: object[], propName: PropertyName, predicateType: 'SOME_ALL' | 'VALUE_EXIST' | 'PROPERTY_EXIST' = 'SOME_ALL') {
        let cols = this.cols(arr, propName, predicateType);
        return cols[propName];
    }

    /**
     * filter 数据过滤
     * @param arr
     * @param iteratee
     */
    filter(arr: any[], iteratee: Iteratee<boolean>): any[] {
        return _.filter(arr, iteratee);
    }

    /**
     * Map 数据加工
     * @param arr
     * @param iteratee
     */
    map(arr: any[], iteratee: Iteratee<any>): any[] {
        return _.map(arr, iteratee);
    }

    /**
     * Pick 字段过滤, 保留字段
     * @param arr
     * @param iteratee
     */
    pick(arr: object[], iteratee: IterateeAtLeastProperty<boolean>): object[] {
        return _.map(arr, (item, inx) => {
            return typeof iteratee === 'function' ? _.pickBy(item, iteratee) : _.pick(item, iteratee);
        });
    }

    /**
     * Omit 字段过滤, 移除字段
     * @param arr
     * @param iteratee
     */
    omit(arr: object[], iteratee: IterateeAtLeastProperty<boolean>): object[] {
        return _.map(arr, (item, inx) => {
            return typeof iteratee === 'function' ? _.omitBy(item, iteratee) : _.omit(item, iteratee);
        });
    }

    /**
     * rename 修改字段名，并保留原字段
     * @param arr
     * @param nameMap
     * @param retainSource 是否保留源数据
     */

    // Exp.

    // MrDataSet.rename(data, 'x::name');
    // MrDataSet.rename(data, {'x': 'name'});
    // MrDataSet.rename(data, {'source': 'name', target: 'x'});

    // MrDataSet.rename(data, ['x::name', 'value::volume']);
    // MrDataSet.rename(data, [{'x': 'name'}, {'value': 'volume'}]);
    // MrDataSet.rename(data, [{'source': 'name', target: 'x'}, {'source': 'volume', target: 'value'}]);

    rename(arr: object[], nameMap: object | object[], retainSource?: boolean): object[];
    rename(arr: object[], nameMap: string | string[], retainSource?: boolean): object[];
    rename(arr: object[], nameMap: any, retainSource: boolean = true): object[] {
        arr = _.cloneDeep(arr);
        let omits = [];

        if (!_.isArray(nameMap)) {
            nameMap = [nameMap];
        }

        arr = this.map(arr, (item: any) => {
            _.each(nameMap, (it: any) => {
                let target: string, source: string;

                if (typeof it === 'string') {
                    [target, source] = it.split('::');
                } else {
                    if (_.has(it, 'source')) {
                        source = it.source;
                        target = it.target;
                    } else {
                        let one = $Utils.one(it);
                        source = one.value;
                        target = one.key;
                    }
                }

                if (_.has(item, source)) {
                    item[target] = item[source];
                    retainSource && (item['__' + source.replace(/^__/, '')] = item[source]);
                    omits.push(source);
                }
            });
            return item;
        });

        arr = this.omit(arr, omits);

        return arr;
    }

    /**
     * reverse 反转数组，逆序排列
     * @param arr
     */
    reverse(arr: any[]): any[] {
        return _.reverse(arr);
    }

    /**
     * sort
     */
    sort(arr: any[], iteratee: (a: any, b: any) => number): any {
        return arr.sort(iteratee);
    }

    /**
     * sort 数组排序
     * @param arr
     * @param iteratee
     * @param orders
     */
    order(arr: any[], iteratee: IterateeProperty<NotVoid>, orders?: Many<boolean | 'asc' | 'desc'>): any[] {
        return _.orderBy(arr, iteratee, orders);
    }

    orderBy = this.order;

    group(arr: any[], iteratee: ((item: any) => NotVoid) | PropertyName): any {
        return _.groupBy(arr, iteratee);
    }

    groupBy = this.group;

    /**
     * 获得当前数组的参照对象
     * @param arr
     * @param retainPropName 保留字段原值
     */
    contrast(arr: object[], retainPropName: AtLeastPropertyName = []) {
        let contrast = {};

        retainPropName = $Utils.upArray(retainPropName);

        _.each(arr, (item) => {
            contrast = _.extend(contrast, item);
        });

        contrast = mu.map(contrast, (value, key) => {
            return _.isNil(_.find(retainPropName as any[], key)) ? value : $Utils.sourceValue(mu.type(value));
        });

        return contrast;
    }

    /**
     * subset 获取子集
     * 截取规则与slice基本一致，
     * 但start为负数，end 同时存在时：start = start + arr.length; if(start > end) => [start, end] = [end, start]
     * @param arr
     * @param range
     * @param propNames
     */
    subset(arr: any[], range: number[], propNames: AtLeastPropertyName = []) {
        if (range.length < 1) {
            console.error('range 至少需要一个参数');
            return void 0;
        }

        let [start, end = arr.length] = range;

        if (!mu.type(start, 'number') || !mu.type(end, 'number')) {
            console.error('range 参数必须为一个数字');
            return void 0;
        }

        if (start < 0) {
            start = start + arr.length;
        }

        if (end < start) {
            [start, end] = [end, start];
        }

        let rst = arr.slice(start, end);

        propNames = $Utils.upArray(propNames);

        return propNames ? this.pick(rst, propNames) : rst;
    }

    /**
     * ---------------------
     * 静态数据处理
     * 可用于 聚合，注入
     * ---------------------
     */

    /**
     * 数组中的最小项
     * @param arr
     *
     * @aggregate 可用于聚合
     */
    min(arr: number[]): object;
    min(arr: any[], iteratee: Iteratee<any>): object;
    min(arr: any[], iteratee?: any): any {
        return iteratee ? _.minBy(arr, iteratee) : _.min(arr);
    }

    /**
     * 数组中的最大项
     * @param arr
     *
     * @aggregate 可用于聚合
     */
    max(arr: number[]): object;
    max(arr: any[], iteratee: IterateeProperty<any>): object;
    max(arr: any[], iteratee?: any): any {
        return iteratee ? _.maxBy(arr, iteratee) : _.max(arr);
    }

    /**
     * 数组项
     * @param arr
     * @param propName 计算当前拥有该字段的记录数；default '*' 计算所有
     * @dependent :cols
     * @aggregate 可用于聚合
     */
    count(arr: any[], propName: PropertyName = '*'): number {
        propName = mu.ifnvl(propName, '*');
        return propName === '*' ? arr.length : (this.col(arr, propName, 'PROPERTY_EXIST') || []).length;
    }

    /**
     * 计算数组中各项总和
     * @param arr
     *
     * 可用于聚合 aggregate
     */
    sum(arr: number[]): number;
    sum(arr: any[], iteratee: IterateeAtLeastProperty<any>): number;
    sum(arr: any[], iteratee?: any): number {
        return iteratee ? _.sumBy(arr, iteratee) : _.sum(arr);
    }

    /**
     * 计算数组中平均数
     * @param arr
     * @dependent :sum, :count
     * 可用于聚合 aggregate
     */
    average(arr: number[]): number;
    average(arr: object[], iteratee: IterateeProperty<any>): number;
    average(arr: any[], iteratee?: any): number {
        // let sum = this.sum(arr, propName);
        // let count = this.count(arr, '*');
        // return sum / count;
        return _.meanBy(arr, iteratee);
    }

    mean = this.average;

    /**
     * ---------------------
     * 数据形变/数据补全相关
     * ---------------------
     */

    /**
     * 补全字段
     * @param arr
     * @param propName 当propName 为空的时候, 则补全所有字段
     *
     * 补全规则，按最后一次字段出现的初始值进行匹配
     */

    // Exp.

    /**

     const temp = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 6 },
        { y: 1 },
        { z: 'hello' },
        { y: 2 }
     ]

     // 补全 x
     :: this.impute(temp, 'x')
     // -> [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 6 },
        { x: 0, y: 1 },
        { x: 0, z: 'hello' },
        { x: 0, y: 2 }
     ]

     // 补全所有
     :: this.impute(temp)
     // -> [
        {x: 1, y: 2, z: ""},
        {x: 2, y: 3, z: ""},
        {x: 6, y: 0, z: ""},
        {y: 1, x: 0, z: ""},
        {z: "hello", x: 0, y: 0},
        {y: 2, x: 0, z: ""},
     ]
     */

    impute(arr: object[], propName?: AtLeastPropertyName, retainPropName?: AtLeastPropertyName) {
        let contrast = this.contrast(arr, retainPropName);
        propName = propName || _.keys(contrast);
        propName = $Utils.upArray(propName);
        _.each(propName, (prop) => {
            arr = mu.map(arr, (item) => {
                if (!_.has(item, prop)) {
                    item[prop] = contrast[prop];
                }

                return item;
            });
        });
        return arr;
    }

    /**
     * 补充字段
     * @param arr
     * @param propName 基于props分组，计算补充记录
     * @param primary 基于唯一主键，补充相关
     */
    fill(arr: object[], propName: PropertyName, primary?: PropertyName) {
        let group = this.group(arr, propName);
        let contrast = this.contrast(arr);

        // primary 没有设置时，推算primary
        // 不一定正确
        // 只推算字符类型值的属性
        if (!primary) {
            let _contrast = _.omit(contrast, propName);
            _contrast = _.pickBy(_contrast, _.isString);
            let keys = _.keys(_contrast);
            if (keys.length) {
                let cols = this.cols(arr, keys, 'PROPERTY_EXIST');
                cols = mu.map(cols, _.uniq);
                cols = mu.map(cols, (item, key) => [item, key], []);
                let max = _.maxBy(cols, (item) => item[0].length);
                primary = max[1];
            } else {
                console.warn(
                    'primary不能正确估算, 请手动指定fill方法的参数primary',
                    '\n\nfill(arr: object[], propName: PropertyName, primary?: PropertyName)'
                );
            }
        }

        // 标准基准值
        let basePrimaryValues = _.uniq(this.col(arr, primary, 'PROPERTY_EXIST') || []);

        mu.each(group, (item, key) => {
            // 简单计算 item 长度小于 basePrimaryLength 则要补充字段
            let itemPrimaryValues = _.uniq(this.col(item, primary, 'PROPERTY_EXIST') || []);
            let diff = _.difference(basePrimaryValues, itemPrimaryValues);
            mu.each(diff, (value) => {
                let copy = mu.clone(contrast);
                copy[primary] = value;
                copy[propName] = key;
                copy['__fill'] = true;
                item.push(copy);
            });
        });

        return _.concat([], ...(_.values(group) || []));
    }

    /**
     * 以指定字段集为key，展开数据
     * @param arr
     * @param propNames
     * @param keyValue
     */

    // Exp.

    /**
     const data = [
         { country: "USA", gold: 10, silver: 20 },
         { country: "Canada", gold: 7, silver: 26 }
     ];

     :: this.fold(data, ['gold', 'silver']);
     // => [
        {country: "USA", key: "gold", value: 10},
        {country: "USA", key: "silver", value: 20},
        {country: "Canada", key: "gold", value: 7},
        {country: "Canada", key: "silver", value: 26}
     ]
     */

    fold(arr: object[], propNames: AtLeastPropertyName, keyValue: any = { key: 'key', value: 'value' }): object[] {
        propNames = $Utils.upArray(propNames);
        let { key, value } = keyValue;
        let rst = [];
        mu.each(arr, (item) => {
            mu.each(propNames, (prop) => {
                let it = mu.clone(item);
                it[key] = prop;
                it[value] = it[prop];
                rst.push(it);
            });
        });
        return this.omit(rst, propNames);
    }

    /**
     * group 数据扁平化
     * @param obj
     */
    flattenGroup(obj: { [key: string]: object[] }) {
        return _.flatten(_.values(obj));
    }

    /**
     * 计算所计算属性值占总数比
     * @param arr
     * @param propName
     * @param groupPropName 设置group propName，则计算所在组的占比
     */
    percent(arr: object[], propName: PropertyName, groupPropName?: PropertyName): object[] {
        // 计算总数
        if (!groupPropName) {
            let total: number = this.sum(arr, propName);

            if (!mu.type(total, 'number')) {
                console.error('数据计算异常，有非法数据');
                return void 0;
            }

            arr = mu.map(arr, (item) => {
                item['__total'] = total;
                item['__percent'] = item[propName] / total;
                return item;
            });
        } else {
            arr = this.group(arr, groupPropName);
            arr = mu.map(arr, (item) => {
                return this.percent(item, propName);
            });
        }

        return arr;
    }

    /**
     * ----------------
     * aggregate
     * 聚合类数据计算
     * ----------------
     */

    aggregate(type: string, arr: object[], propName: PropertyName, groupPropName?: PropertyName) {
        return mu.run(
            groupPropName,
            () => {
                arr = this.group(arr, groupPropName);
                arr = mu.map(arr, (item, groupPropValue) => {
                    item = this.aggregate.call(this, type, item, propName);
                    item = mu.map(item, (it) => {
                        it[groupPropName] = groupPropValue;
                        return it;
                    });
                    return item;
                });

                return arr;
            },
            () => {
                let fn = this[type];
                let result = fn.call(this, arr, propName);
                let item = mu.type(result, 'object') ? result : {};
                item[`__${type}`] = item[propName] || result;
                return [item];
            }
        );
    }

    /**
     * 数据换算
     * 这个方法只针对实例
     */
    transform(...items: object[]) {
        let rst = _.reduce(
            items,
            (rows, item: any) => {
                let { type, args } = item;
                let fn = this[type];
                return fn.call(this, rows, ...args);
            },
            this.rows
        );
        return (this.rows = rst);
    }
}

const $mrDataSet = new MrDataSet();

export { MrDataSet, $mrDataSet as default };
