/**
 * theme test5 config
 * @author ...
 */

import {BaseLayout} from 'src/common/layouts/base-layout';
import Test5Const from 'src/common/const/test5.const';
import Test5Services from 'src/common/services/test5.services';
import Test5Routes from './test5-routes';
import EnvConst from 'src/theme/const-env.mri';



class Test5ThemeConfig {
    /**
     * theme name
     * 主题名称
     * @type {string}
     */
    name = 'test5';

    /**
     * website name
     * 网站名称
     */
    website = 'Test5';

    /**
     * base layout
     * 基本布局
     */
    layout = BaseLayout;

    /**
     * routes config
     * 路由配置
     */
    routes = Test5Routes;

    /**
     * providers
     */
    providers = {
        Test5Const: {...Test5Const, ...EnvConst},
        Test5Services
    }
}

export default new Test5ThemeConfig();
