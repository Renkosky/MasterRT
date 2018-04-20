import {MrResource} from "../lib";

class BaseResourcePool {
    pie = MrResource.pool('/assets/pie.json');
    line = MrResource.pool('/assets/line.json');
}

export default new BaseResourcePool();