/**
 * MrService
 *
 * @update mizi.lin@20180508
 *
 * 重新规划并设定MrEcharts需要参数配置
 * MrService.setEchartsTheme()
 * MrService.setColors({
 *  base: []
 *  nameMap: {}
 * });
 *
 * @update mizi.lin@v0.1.23.20180521
 * ::=> 添加 MrService.setNoDataComponent
 */
import * as mu from 'mzmu';
import classNames from 'classnames';
import * as Mock from 'mockjs';
import '../assets/styles/common.less';
const download = require('../assets/js/download.js');

/**
 * fixed bug: umi 解析与 tsc 解析表现不一样
 */
const moment = require('moment');


Mock.Random.extend({
    /**
     * 返回自动增长的日期数组
     * @param step 步长 '步长::单位'
     * @param len
     * @param format
     * @param initDate
     */
    dateIncrements: (step: string = '1::d', len: number = 10, format: string = 'yyyy-MM-dd', initDate: any) => {
        let momentFormat = format.replace('yyyy', 'YYYY').replace('dd', 'DD');
        let date = moment(initDate || Mock.Random.date(format));
        return mu.map(
            len,
            () => {
                return date.add(...step.split('::')).format(momentFormat);
            },
            []
        );
    }
});

/**
 * 通用方法
 */
class MrServices {
    // REG_CHINESE = /[\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1F]/g;

    // // REG_CHINESE = /[\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]/g;

    // /**
    //  * 判断文本中是否有中文字符
    //  * @param {string} str
    //  * @return {boolean}
    //  */
    // isChinese(str: string) {
    //     // console.debug(str, this.REG_CHINESE.test(str));
    //     return this.REG_CHINESE.test(str);
    // }

    /**
     * 使用classNames生产class
     * @param args
     */
    cls(...args) {
        return classNames(...args);
    }

    /**
     * 下载文件
     * @param arg
     */
    download(...arg: any[]) {
        download(...arg);
    }

    upArray(every: any) {
        return mu.isArray(every) ? every : [every];
    }

    /**
     * 设置HTTP headers
     * @param headers
     */

    _headers: any = {};

    /**
     * set Request Header
     * @param headers
     * @param {string} type
     */
    setHeaders(headers: any, type: string = 'extends') {
        if (type === 'extends') {
            this._headers = mu.extend(true, this._headers, headers);
        } else if (type === 'news') {
            this._headers = headers;
        } else if (type === 'append') {
        }
    }

    getHeaders() {
        return this._headers;
    }

    // user self handler fetch error
    _reqCatch: any = false;

    reqCatch(catchHandler: any) {
        this._reqCatch = catchHandler;
    }

    reqResponse: any = false;

    /**
     * 全局文件配置信息
     */

    _rules: any;

    setRules(rules: any) {
        this._rules = rules;
    }

    getRules() {
        return this._rules;
    }

    _ruleValue: boolean = true;

    setRuleValue(val: boolean) {
        this._ruleValue = val;
    }

    getRuleValue() {
        return this._ruleValue;
    }

    /**
     * resource pool
     */

    _resourcePool: any;

    setResourcePool(pool: any) {
        this._resourcePool = pool;
    }

    getResourcePool() {
        return this._resourcePool;
    }

    /**
     * MrEcharts
     */

    _mrEchartsTheme: any = {};

    setEchartsTheme(themeName: string, themeConfig?: any): void {
        this._mrEchartsTheme.theme = themeName;
        themeConfig && (this._mrEchartsTheme.themeConfig = themeConfig);
    }

    getEchartsTheme() {
        return this._mrEchartsTheme;
    }

    _mrEchartsColors: any = {};

    setEchartsColors(colors: any): void {
        this._mrEchartsColors = colors;
    }

    getEchartsColors(): any {
        return this._mrEchartsColors;
    }

    _mrEchartsSubTypes: any = {};

    setEchartsSubTypes(subTypes): any {
        return { ...this._mrEchartsSubTypes, ...subTypes };
    }

    getEchartsSubTypes(): any {
        return this._mrEchartsSubTypes;
    }

    _noDataComponent: any;

    setNoDataComponent(component) {
        this._noDataComponent = component;
    }

    getNoDataComponent() {
        return this._noDataComponent;
    }

    /**
     * 所有设置的综合体————{theme}-preset
     */
    setConfig(config: any): any {
        config.headers && (this._headers = config.headers);
        config.resourcePool && (this._resourcePool = config.resourcePool);
        config.mrEchartsTheme && (this._mrEchartsTheme = config.mrEchartsTheme);
        config.mrEchartsColors && (this._mrEchartsColors = config.mrEchartsColors);
        config.noDataComponent && (this._noDataComponent = config.noDataComponent);
        config.reqCatch && (this._reqCatch = config.reqCatch);
        config.rules && (this._rules = config.rules);
    }

    /**
     * 对 mockjs 进行提权
     * @param mockJSON
     */
    mock(mockJSON: any) {
        let jsonText = JSON.stringify(mockJSON);
        jsonText = jsonText.replace(/\"?!@(.*?)\"/g, (a, b, c) => {
            let rst = Mock.mock(`@${b}`);
            return JSON.stringify(rst);
        });
        return Mock.mock(JSON.parse(jsonText));
    }
}

export default new MrServices();
