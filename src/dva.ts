import {message} from 'antd';
import {MrServices} from './lib';
import {default as brp} from './services/base-resource-pool';
import {default as mu} from 'mzmu';
import NodataComponent from './components/nodata.component';

/**
 * 系统初始化配置设置页面
 */

export function config() {

    MrServices.setHeaders({
        // 'Content-Type': 'text/json',
        // 'X-TOKEN': () => mu.storage('X-TOKEN')

        'X-ORIGIN': 'test.new-socialx.visualmaster.com.cn',
        'X-TOKEN': '4a7602d0dd985e64822851004456e5df8f8001381639191439316396b79f93'
    });

    MrServices.setRules({
        'list.rose.ring': true,
        'list.word.cloud': false,
    });

    MrServices.setResourcePool(brp);

    MrServices.reqCatch ( (res) => {
        console.debug('::::::::::', res);
        return res;
    });

    MrServices.setNoDataComponent(NodataComponent);

    return {
        onError(err) {
            err.preventDefault();
            message.error(err.message);
        },
        initialState: {
            global: {
                text: 'hi umi + dva',
            },
        },
    };
}



