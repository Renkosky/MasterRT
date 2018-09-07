import * as mu from 'mzmu';
import $pool from '../../services/base.resources';
import $theme from '../../theme/index';
import { MrServices } from 'masterrt';
import * as _ from 'lodash';
import router from 'umi/router';
import { notification } from 'antd';
import { $intl, $preload } from '../../services/index';
import StoreServices from './store.services';

class IBaseServices {
    // constructor(themeService: string) {
    //     this.__where__ = themeService;
    // }

    get $const(): any {
        return $theme.getProviders('$const');
    }

    /**
     * 获得身份
     */
    identity(res: any, cb: any): void {
        // 存储token
        mu.run(_.get(res, 'data.token'), (token) => {
            mu.storage(this.$const.STORAGE_X_TOKEN, token);
        });

        // 存储相应的租户信息
        mu.run(_.get(res, 'data.tenants'), (tenants) => {
            mu.storage(this.$const.TENANTS, tenants);
        });

        // ajax 头部设置 X-TOKEN
        MrServices.setHeaders({
            'X-TOKEN': mu.storage(this.$const.STORAGE_X_TOKEN)
        });

        $preload.preload(true, (response) => {
            // todo 预加载数据
            cb && cb(res);
        });
    }

    /**
     * 用户登录
     * @param values
     * @param cb
     */
    login(values: any, cb?: any): void {
        $pool.login.post(values).then((res) => {
            this.identity(res, cb);
        });
    }

    logout(): void {
        // 清楚系统缓存信息
        // 清楚预加载信息
        // 返回登录页
        mu.storage(this.$const.STORAGE_X_TOKEN, '');
        StoreServices.initValue = {};
        router.push('/');
    }

    /**
     * 默认添加还是替换
     * @param value
     * @param type
     */
    setInitValue(value: any, type?: string): void {
        StoreServices.initValue = type === 'replace' ? value : mu.extend(StoreServices.initValue, value);
    }

    getInitValue(key?: string): any {
        return key ? _.get(StoreServices.initValue, key) : StoreServices.initValue;
    }

    setUserResponseInitValue(res): void {
        mu.run(mu.storage(this.$const.STORAGE_X_TOKEN), (token) => {
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

            let platforms = mu.map(
                origins,
                (item) => {
                    return {
                        __key__: item.platform,
                        __val__: mu.map(
                            item.sources,
                            (name, inx) => {
                                return {
                                    __key__: name,
                                    __val__: item.platform
                                };
                            },
                            {}
                        )
                    };
                },
                {}
            );

            let sources: any;

            mu.run(platforms, () => {
                let _sources = _.values(platforms);
                let __sources = _.reduce(
                    _sources,
                    (init, item) => {
                        let _item = mu.map(item, (v) => [v]);
                        mu.each(_item, (v, key) => {
                            let _v = init[key];
                            if (_v) {
                                init[key] = _v.concat(v);
                            } else {
                                init[key] = v;
                            }
                            return init;
                        });
                        return init;
                    },
                    {}
                );

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

            this.setInitValue({ sources });

            this.setInitValue({ platforms });

            // set user initValue
            this.setInitValue({ user });

            // 账号过期提醒
            mu.run(() => {
                let { passwordExpired } = user;
                let webLogin = mu.storage(this.$const.LOGIN_TYPE) === 'web';

                if (passwordExpired - +new Date() < 15 * 24 * 3600 * 1000 && webLogin) {
                    notification.warn({
                        message: $intl.t('Reminder'),
                        description: $intl.t('Password will be expired soon, please change your password or login using WeChat.')
                    });
                }
            });

            // set origins initValue
            origins = mu.map(
                origins,
                (o) => {
                    let value = o.platform;
                    let label = _.get(this.$const, `LANG_SOURCE[${value}].zh`) || 'zh';
                    let en_label = _.get(this.$const, `LANG_SOURCE[${value}].en`) || 'en';
                    let origins = mu.map(
                        o.sources,
                        (r) => {
                            return {
                                name: r,
                                value: r,
                                source: o.platform
                            };
                        },
                        []
                    );

                    return {
                        label,
                        en_label,
                        value,
                        origins
                    };
                },
                []
            );

            this.setInitValue({ origins });
            this.setInitValue({ tenants });

            // set rules initValue && MrServices.setRules
            rules = mu.map(
                rules,
                (rule) => {
                    return {
                        __key__: rule.name,
                        __val__: rule.status
                    };
                },
                {}
            );

            this.setInitValue({ rules });

            MrServices.setRules(rules);
        });
    }
}

export { IBaseServices };
export default new IBaseServices();
