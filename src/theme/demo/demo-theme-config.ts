/**
 * theme demo config
 * @author ...
 */

import {BaseLayout} from 'src/common/layouts/base-layout';
import DemoConst from 'src/common/const/demo.const';
import DemoServices from 'src/common/services/demo.services';
import DemoRoutes from './demo-routes';


class DemoThemeConfig {
    /**
     * theme name
     * 主题名称
     * @type {string}
     */
    name = 'demo';

    /**
     * website name
     * 网站名称
     */
    website = 'Demo';

    /**
     * base layout
     * 基本布局
     */
    layout = BaseLayout;

    /**
     * routes config
     * 路由配置
     */
    routes = DemoRoutes;

    /**
     * providers
     */
    providers = {
        DemoConst,
        DemoServices
    }
}

export default new DemoThemeConfig();
