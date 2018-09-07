import * as mu from 'mzmu';
import $pool from './base.resources';
import {default as $const} from './base.const';
import {MrServices} from 'masterrt';
import * as _ from 'lodash';
import router from 'umi/router';
import {notification} from 'antd';
import {$intl} from '.';

class $service {

    logout() {
        // 清楚系统缓存信息
        // 清楚预加载信息
        // 返回登录页
        mu.storage($const.STORAGE_X_TOKEN, '');
        mu.storage($const.STORAGE_ACCESS_TOKEN, '');
        this._initValue = {};
        router.push('/');
    }

    statics(path) {
        // 获得静态资源地址
        let uri = window['publicPath'] || window['resourceBaseUrl'] || '';
        uri = uri.replace(/\/$/g, '');
        return uri + path;
    }

    /**
     * 获得数据源和显示值
     * @param obj
     * @param path
     * @param fn
     */
    st(obj: object, path: string, fn: any) {
        let paths = path.split('.');
        paths.push('__' + paths.pop());
        let sourcePath = paths.join('.');

        let target = _.get(obj, path);
        let source = _.get(obj, sourcePath);

        if(!fn) {
            return { target, source };
        } else {
            return fn(target, source);
        }
    }

    /**
     * 系统初始值/默认值等
     * @type {{}}
     * @private
     */

    _initValue: any = {};

    /**
     * 默认添加还是替换
     * @param value
     * @param type
     */
    setInitValue(value: any, type?: string) {
        this._initValue = type === 'replace' ? value : mu.extend(this._initValue, value);
    }

    getInitValue(key?: string) {
        return key ? _.get(this._initValue, key) : this._initValue;
    }

    getToken() {
        return mu.storage($const.STORAGE_X_TOKEN);
    }

    setUserResponseInitValue(res) {

        mu.run(mu.storage($const.STORAGE_X_TOKEN), (token) => {
            let user = res.data,
                rules = res.privileges,
                tenants = res.tenants,
                origins: any = _.get(res, 'data.socialxConfigure.platformSourceRelation') || [];

            /**
             * origins 下面 sources 与 platform 的关系
             * platform 包含 N 个source
             * 但 一个 source 可以属于多个平台
             *
             * so 冗余2份信息，platform 与 source 的关系
             */

            let platforms = mu.map(origins, (item) => {
                return {
                    __key__: item.platform,
                    __val__: mu.map(item.sources, (name, inx) => {
                        return {
                            __key__: name,
                            __val__: item.platform
                        };
                    }, {})
                }
            }, {});

            let sources: any;

            mu.run(platforms, () => {
                let _sources = _.values(platforms);
                let __sources = _.reduce(_sources, (init, item) => {
                    item = mu.map(item, (v) => [v]);
                    mu.each(item, (v, key) => {
                        let _v = init[key];
                        if(_v) {
                            init[key] = _v.concat(v);
                        } else {
                            init[key] = v;
                        }
                        return init;
                    });
                    return init;
                }, {});

                sources = mu.map(__sources, (v) => _.uniq(v));
                // sources = mu.map(__sources, (item, source) => {
                //     return mu.map(item, (platform) => {
                //         return {
                //             __key__: platform,
                //             __val__: source
                //         }
                //     }, {});
                // }, {});
            });

            this.setInitValue({sources});

            this.setInitValue({platforms});

            // set user initValue
            this.setInitValue({user});

            // 账号过期提醒
            mu.run(() => {

                let {passwordExpired} = user;
                let webLogin = (mu.storage($const.LOGIN_TYPE)==='web');

                if((passwordExpired - (+ new Date()) < 15 * 24 * 3600 * 1000)&&webLogin) {
                    notification.warn({
                        message: $intl.t('Reminder'),
                        description: $intl.t('Password will be expired soon, please change your password or login using WeChat.'),
                    });
                }
            });

            // set origins initValue
            origins = mu.map(origins, (o) => {
                let value = o.platform;
                let label = $const.LANG_SOURCE[value].zh;
                let en_label = $const.LANG_SOURCE[value].en;
                let origins = mu.map(o.sources, (r) => {
                    return {
                        name: r,
                        value: r,
                        source: o.platform
                    };
                }, []);

                return {label, en_label, value, origins}
            }, []);

            this.setInitValue({origins});
            this.setInitValue({tenants});

            // set rules initValue && MrServices.setRules
            rules = mu.map(rules, (rule) => {
                return {
                    __key__: rule.name,
                    __val__: rule.status
                }
            }, {});

            this.setInitValue({rules});

            MrServices.setRules(rules);
        });

    };

    generateMixed(n) {
        let res = "";
        for(let i = 0; i < n; i++) {
            let id = Math.ceil(Math.random() * 35);
            res += ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'][id];
        }
        return res;
    };


    // 在一个数组里合并两个固定值相同的json
    arrayMerge(array,item1?:any,item2?:any) {
        const _group = array.reduce(function(prev, item) {
            let g = mu.prop(item, item1);
            let t = item2?mu.prop(item, item2):'';
            if(g+t in prev) {
                prev[g+t].push(item);
            } else {
                prev[g+t] = [item];
            }
            return prev;
        },{});
        const result = mu.map(_group, (res) => {
            let item = {};
            mu.each(res, (e) => {
                item = mu.extend({},item, e);
            });
            return item;
        },[]);
        return result;
    }

}

export default new $service();

