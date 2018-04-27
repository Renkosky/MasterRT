import {MrResource} from "../lib";
let uri = (window['resourceBaseUrl'] || '').replace(/\/$/g, '');
class $pool {
    pie = MrResource.pool(`${uri}/assets/pie.json`);
    line = MrResource.pool(`${uri}/assets/line.json`);
}

export default new $pool();