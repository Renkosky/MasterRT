console.warn('/** 2355 */ -> src/theme/theme.ts');

import router from 'umi/router';
import * as mu from 'mzmu';

export default class Theme {

    constructor() {
    }

    reRoutes() {
        let {routes} = this as any;
        let _routes = {};

        mu.each(routes, (o, key) => {
            o.name = key;
            if (typeof  o.path === 'string') {
                _routes[o.path] = o;
            } else {
                mu.each(o.path, (path) => {
                    _routes[path] = o;
                })
            }
        });

        return _routes;
    }

    getModuleWithPath(path?: string): any {
        let {pathname} = path || router['location'];
        pathname = mu.trim(pathname || '');
        return this.reRoutes()[pathname];
    }

    getModule(name?: string): any {
        return this['routes'][name] || this.getModuleWithPath();
    }

    getLayout() {
        let module = this.getModuleWithPath() || {};
        return module.layout || this['layout'];
    }

}

// export default new Theme();