/**
 * 基于业务的服务
 * 继承于 BaseService
 *
 * @author ...
 */

import * as moment from 'moment';
import * as _ from 'lodash';
import {MrServices} from 'masterrt';
import * as mu from 'mzmu';
import router from 'umi/router';
import {$utils} from 'src/services';
import {IBaseServices} from 'src/common/services';

class ITest2Services extends IBaseServices {
    constructor() {
        super();
    }
}

export {ITest2Services};

export default new ITest2Services();
