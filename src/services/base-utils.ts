/**
 * $utils
 *
 * utils 与 services 的区别
 * utils 是一个工具，它只有数据有关，与业务逻辑无关，与状态无关
 *
 * @author mizi.lin
 */

import * as _ from 'lodash';
import * as mu from 'mzmu';
import {Toast} from 'antd-mobile';
import {notification} from 'antd';
import {$intl} from '.';

const theme = process.env.THEME;
const env = process.env.MRI_ENV;
const device = process.env.MRI_DEVICE;

export default {
    /**
     * 获得当前静态资源地址
     * @param path
     * @return {string}
     *
     * @author mizi.lin
     */
    statics(path) {
        // 获得静态资源地址
        let uri = window['publicPath'] || window['resourceBaseUrl'] || '';
        uri = uri.replace(/\/$/g, '');
        return uri + path;
    },

    /**
     * 获得数据源和显示值
     *
     * 与后端约定，查询数据部分翻译由后端完成
     * 但部分属性需要前后端交互时，传递原值（en), 则会使用 __propName 方式贮存
     *
     * @param obj
     * @param path
     * @param fn
     *
     * @author mizi.lin
     */
    st(obj: object, path: string, fn: any) {
        let paths = path.split('.');
        paths.push('__' + paths.pop());
        let sourcePath = paths.join('.');

        let target = _.get(obj, path);
        let source = _.get(obj, sourcePath);

        if (!fn) {
            return {
                target,
                source
            };
        } else {
            return fn(target, source);
        }
    },

    /**
     * 生成随机ID
     * @param n
     * @return {string}
     *
     * @author LiYanjun
     */
    generateMixed(n) {
        let res = '';
        for (let i = 0; i < n; i++) {
            let id = Math.ceil(Math.random() * 35);
            res += [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ][id];
        }
        return res;
    },

    /**
     * 在一个数组里合并两个固定值相同的json
     * @param array
     * @param item1
     * @param item2
     * @return {any}
     *
     * @author LiYanjun
     */
    arrayMerge(array, item1?: any, item2?: any) {
        const _group = array.reduce(function (prev, item) {
            let g = mu.prop(item, item1);
            let t = item2 ? mu.prop(item, item2) : '';
            if (g + t in prev) {
                prev[g + t].push(item);
            } else {
                prev[g + t] = [item];
            }
            return prev;
        }, {});

        return mu.map(
            _group,
            res => {
                let item = {};
                mu.each(res, e => {
                    item = mu.extend({}, item, e);
                });
                return item;
            },
            []
        );
    },

    /**
     * 简单通知警告
     * 自适应各平台
     * 胡奥 20180712 调整device
     */
    errorNotify: mu.debounce((message: string, title?: string) => {
        if (device === 'mobile') {
            return Toast['fail'](message);
        }

        if (device === 'pc') {
            return notification['error']({
                message: title || $intl.t('Error Info'),
                description: message
            });
        }
    }, 350)
};
