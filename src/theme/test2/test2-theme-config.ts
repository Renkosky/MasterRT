/**
 * theme test2 config
 * @author ...
 */

import {BaseLayout} from 'src/common/layouts/base-layout';
import Test2Const from 'src/common/const/test2.const';
import Test2Services from 'src/common/services/test2.services';
import Test2Routes from './test2-routes';


class Test2ThemeConfig {
    /**
     * theme name
     * 主题名称
     * @type {string}
     */
    name = 'test2';

    /**
     * website name
     * 网站名称
     */
    website = 'Test2';

    /**
     * base layout
     * 基本布局
     */
    layout = BaseLayout;

    /**
     * routes config
     * 路由配置
     */
    routes = Test2Routes;

    /**
     * providers
     */
    providers = {
        Test2Const,
        Test2Services
    }
}

export default new Test2ThemeConfig();
