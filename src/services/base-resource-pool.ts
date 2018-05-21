import {MrResource} from "../lib";
let uri = (window['resourceBaseUrl'] || '').replace(/\/$/g, '');
class $pool {
    pie = MrResource.pool(`${uri}/assets/pie.json`);
    line = MrResource.pool(`${uri}/assets/line.json`);
    nodata = MrResource.pool(`${uri}/assets/nodata.json`);
}

export default new $pool();