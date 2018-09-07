/**
 * 基于业务的服务
 * 继承于 BaseService
 *
 * @author ...
 */

import {IBaseServices} from 'src/common/services';

class IDemoServices extends IBaseServices {
    constructor() {
        super();
    }
}

export {IDemoServices};

export default new IDemoServices();
