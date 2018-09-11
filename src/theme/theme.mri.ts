import * as _ from 'lodash';
import router from 'umi/router';
import * as mu from 'mzmu';

console.debug(router);

class ThemeMri {
    get config() {
        try {
            return require('./config.mri').default;
        } catch (e) {
            console.debug(e);
            return {};
        }
    }

    get name() {
        let config = this.config;
        return _.get(config, 'name') || '~~~~~';
    }

    get website() {
        let config = this.config;
        return _.get(config, 'website');
    }

    get theme() {
        return process.env.THEME;
    }

    get extra() {
        let config = this.config;
        return mu.ifnvl(config.derive, {});
    }

    constructor() {
    }

    // 获取注入器
    getProviders(key?: string): any {
        let config = this.config;

        if (!config) {
            return void 0;
        }

        if (key) {
            let provider = _.get(config, `providers.${key}`);
            if (provider) {
                return provider;
            } else {
                if (/^\$(.*)$/.test(key)) {
                    let _key = key.replace(/^\$(.*)$/, '$1');
                    _key = `${this.theme}-${_key}`;
                    _key = _.upperFirst(_.camelCase(_key));
                    // console.log(`${key} -> ${_key}`);
                    return this.getProviders(_key);
                }

                console.error(`${key} not found`);
            }
        } else {
            return _.get(config, 'providers');
        }
    }

    reRoutes() {
        let {routes} = this.config;
        let _routes = {};

        _.each(routes, (o, key) => {
            o.name = key;
            if (typeof o.path === 'string') {
                _routes[o.path] = o;
            } else {
                _.each(o.path, (path) => {
                    _routes[path] = o;
                });
            }
        });

        return _routes;
    }

    getModuleWithPath(path?: string): any {
        let {pathname} = path || router['location'];
        pathname = _.trim(pathname || '');
        return this.reRoutes()[pathname];
    }

    getModule(name?: string): any {
        let {routes} = this.config;
        return routes[name] || this.getModuleWithPath();
    }

    getLayout() {
        const config = this.config;
        let module = this.getModuleWithPath() || {};
        return module.layout || config['layout'];
    }

    getSubLayout() {
        const config = this.config;
        let module = this.getModuleWithPath() || {};
        let subLayout = mu.ifnvl(module.subLayout, config.subLayout);

        // todo support more layout
        // if(mu.type(subLayout) !== 'array') {
        //     subLayout = [subLayout];
        // }

        return subLayout;
    }
}

export default new ThemeMri();
