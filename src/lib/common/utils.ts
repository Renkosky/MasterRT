import * as _ from 'lodash';

class Utils {
    /**
     * 单属性对象，获取其 key 和 value 值
     * @param obj
     */
    one(obj: object) {
        let keys = _.keys(obj);

        if (keys.length !== 1) {
            return void 0;
        }

        let key = keys[0];

        return {
            key,
            value: obj[key]
        };
    }

    /**
     * 将非数组元素转为数组
     * @param one
     */
    upArray(one: any) {
        return _.isArray(one) ? one : [one];
    }

    /**
     * 设置每种类型的初始值
     * @param type
     */
    sourceValue(type) {
        return {
            string: '',
            number: 0,
            array: [],
            object: {},
            function: () => {},
            regex: new RegExp('')
        }[type];
    }

    /**
     * 驼峰化函数
     * @param str
     *
     *  camelcase('HELLO WORLD')
     *  // helloWorld
     *  camelcase('HELLO         WORLD')
     *  // helloWorld
     *  camelcase('drunkman')
     *  // drunkman
     *  camelcase('hi----you')
     *  // hiYou
     */
    camelcase(str: string) {
        let str_: string | string[] = str;
        str_ = str_.replace(/[\s|-]{2,}/g, ' ');
        str_ = str_.toLowerCase();
        str_ = str_.split(/[\s|-]/);
        let first = str_.shift();
        if (str_.length) {
            str_ = str_.map((item: any) => {
                item = item.split('');
                return item.shift().toUpperCase() + item.join('');
            });
        }
        return first + str_.join('');
    }
}

const $Utils = new Utils();

export default $Utils;
