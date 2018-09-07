import * as _ from 'lodash';

const $PRELOAD_SOTRAGE = {};

class $preloadStorage {
    setItem(key, value) {
        $PRELOAD_SOTRAGE[_.toString(key)] = value;
    }

    getItem(key) {
        return _.cloneDeep($PRELOAD_SOTRAGE[_.toString(key)]);
    }
}

export default new $preloadStorage();
