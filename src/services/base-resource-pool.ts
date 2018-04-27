import {MrResource} from "../lib";
let uri = (window['resourceBaseUrl'] || '').replace(/\/$/g, '');
class BaseResourcePool {
    pie = MrResource.pool(`${uri}/assets/pie.json`);
    line = MrResource.pool(`${uri}/assets/line.json`);
}

export default new BaseResourcePool();