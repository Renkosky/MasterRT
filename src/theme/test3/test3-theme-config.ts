/**
 * theme test3 config
 * @author ...
 */

import {BaseLayout} from 'src/common/layouts/base-layout';
import Test3Const from 'src/common/const/test3.const';
import Test3Services from 'src/common/services/test3.services';
import Test3Routes from './test3-routes';


class Test3ThemeConfig {
    /**
     * theme name
     * 主题名称
     * @type {string}
     */
    name = 'test3';

    /**
     * website name
     * 网站名称
     */
    website = 'Test3';

    /**
     * base layout
     * 基本布局
     */
    layout = BaseLayout;

    /**
     * routes config
     * 路由配置
     */
    routes = Test3Routes;

    /**
     * providers
     */
    providers = {
        Test3Const,
        Test3Services
    }
}

export default new Test3ThemeConfig();
