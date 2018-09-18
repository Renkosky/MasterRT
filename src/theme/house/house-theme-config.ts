/**
 * theme house config
 * @author ...
 */

import {BaseLayout} from 'src/common/layouts/base-layout';
import HouseConst from 'src/common/const/house.const';
import HouseServices from 'src/common/services/house.services';
import HouseRoutes from './house-routes';
import EnvConst from 'src/theme/const-env.mri';



class HouseThemeConfig {
    /**
     * theme name
     * 主题名称
     * @type {string}
     */
    name = 'house';

    /**
     * website name
     * 网站名称
     */
    website = 'House';

    /**
     * base layout
     * 基本布局
     */
    layout = BaseLayout;

    /**
     * routes config
     * 路由配置
     */
    routes = HouseRoutes;

    /**
     * providers
     */
    providers = {
        HouseConst: {...HouseConst, ...EnvConst},
        HouseServices
    }
}

export default new HouseThemeConfig();
