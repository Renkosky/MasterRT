/**
 * RouteGuard
 * 路由守卫
 *
 * @return {boolean} 返回 true 守卫放行， 返回false 守卫阻止
 *
 * @author ...
 */

import router from 'umi/router';
import * as mu from 'mzmu';
import $theme from 'src/theme';
import * as _ from 'lodash';

export default function RouteGuard(module: any, props?: any): boolean {
    const HouseConst: any = $theme.getProviders('HouseConst');

    /**
     * 模块不存在
     * 即路由地址错误
     */
    if (!module) {
        router.replace('/404');
        return false;
    }
    
    let token = mu.storage(HouseConst.STORAGE_X_TOKEN);

    if (module.token) {
        if (!token) {
            console.warn('用户登录信息失效');

            mu.run(HouseConst.INDEX_PAGE, (page) => {
                router.push(page)
            }, () => {
                if(_.get(router, 'location.pathname') !== '/') {
                    router.push('/');
                }
            });

            return false;
        }
    }

    return true;
}

