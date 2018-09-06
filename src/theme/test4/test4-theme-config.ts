/**
 * theme test4 config
 * @author ...
 */

import {BaseLayout} from 'src/common/layouts/base-layout';
import Test4Const from 'src/common/const/test4.const';
import Test4Services from 'src/common/services/test4.services';
import Test4Routes from './test4-routes';


class Test4ThemeConfig {
    /**
     * theme name
     * 主题名称
     * @type {string}
     */
    name = 'test4';

    /**
     * website name
     * 网站名称
     */
    website = 'Test4';

    /**
     * base layout
     * 基本布局
     */
    layout = BaseLayout;

    /**
     * routes config
     * 路由配置
     */
    routes = Test4Routes;

    /**
     * providers
     */
    providers = {
        Test4Const,
        Test4Services
    }
}

export default new Test4ThemeConfig();
