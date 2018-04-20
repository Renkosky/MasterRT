import * as download from '../assets/js/download';
import * as mu from 'mzmu';
import * as classNames from 'classnames';
declare var require: any;
const _commonStyles = require('../assets/styles/common.less');

/**
 * 通用方法
 */
class MrServices {

    REG_CHINESE = /[\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1F]/g;

    // REG_CHINESE = /[\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]/g;

    /**
     * 判断文本中是否有中文字符
     * @param {string} str
     * @return {boolean}
     */
    isChinese(str: string) {
        // console.debug(str, this.REG_CHINESE.test(str));
        return this.REG_CHINESE.test(str);
    }

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

        if(type === 'extends') {
            this._headers = mu.extend(true, this._headers, headers);
        } else if(type === 'news') {
            this._headers = headers;
        } else if(type === 'append') {

        }
    }

    getHeaders() {
        return this._headers;
    }

    // user self handler fetch error
    reqCatch: any = false;
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

    /**
     * resource pool
     */

    _resourcePool: any;

    setResourcePool(resource: any) {
        this._resourcePool = resource;
    }

    getResourcePool() {
        return this._resourcePool;
    }



}


export default new MrServices();