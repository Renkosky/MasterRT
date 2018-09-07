/**
 * intl 国际化服务
 *
 * @author clish.wang@20180508
 *
 * @update mizi.lin@20180508
 * => $intl.getText alias $intl.t;
 *
 */
import _ from 'lodash';
import * as mu from 'mzmu';
import {MrResource as _mr} from 'masterrt';
import {$utils} from '.'

interface IntlOptions {
    locale?: string;
    // locale 文件路径
    path?: string | string[];
    // locale storage key
    storageKey?: string;
    // i18n key
    messages?: any;
    // 暗门记录使用信息
    mark?: boolean
}

class $intl {

    readonly $DEFAULT_OPTIONS: IntlOptions = {
        path: '/assets/locale',
        locale: 'en',
        storageKey: 'INIT_LOCALE',
        messages: {},
        mark: false
    };

    options: IntlOptions;

    getResPath(options): string {
        let {path, locale} = options;
        let pathArr = _.isArray(path) ? path : [path];
        return pathArr.map(pathStr => {
            return _mr.pool($utils.statics(`${pathStr}/${locale}.json`)).get();
        });
    }

    init(options?: IntlOptions, cb?: any): void {

        options = mu.extend({}, this.$DEFAULT_OPTIONS, options);

        options.locale = mu.storage(options.storageKey) || options.locale;

        let resPath = this.getResPath(options);

        this.options = options;

        Promise.all(resPath).then(values => {
            values.map(msg => {
                options.messages = mu.extend({}, options.messages, msg);
            });

            this.options = options;

            mu.storage(options.storageKey, options.locale);
            cb && cb();
        });
    }

    changeLocale(locale: string | IntlOptions, cb?: any): void {

        let {options} = this;

        if (typeof locale === 'string') {

            // no change => return
            if (locale === options.locale) {
                return void 0;
            }

            options.locale = locale;
        } else {
            // 若用户传递的 options
            // 则不做是否相同的locale,
            // 认定一个规则，强制更新locale信息
            options = mu.extend(options, locale);
        }

        mu.storage(options.storageKey, options.locale);

        this.init(options, () => {
            cb && cb(this.options);
        });


    }

    getText(key: string, mapping: any = {}): string {

        if(!this.options) {
            return key;
        }

        let {messages} = this.options;
        messages = messages || {};
        let msg = messages[key] || key;

        /**
         * mu.format('江山如此{0}娇', 'N')
         * mu.format('江山如此{0}娇{1}', 'N', '羞')
         * mu.format('江山如此{a}娇', {a: 'N'})
         * mu.format('江山如此{a}娇{b.c}', {a: 'N', b: {c: '羞'}})
         *
         * // @todo support
         *  mu.format('江山如此{a}娇{b.c}', {a: 'N', 'b.c': '羞'})
         */
        msg = mu.isArray(mapping) ? mu.format(msg, ...mapping) : mu.format(msg, mapping);
        return msg;
    }

    t: any = this.getText;

}

export default new $intl();


