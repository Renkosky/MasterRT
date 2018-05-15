import {message} from 'antd';
import {MrServices} from 'src/lib';
import {default as brp} from './services/base-resource-pool';
import {default as mu} from 'mzmu';

/**
 * 系统初始化配置设置页面
 */

export function config() {

    MrServices.setHeaders({
        'Content-Type': 'text/json',
        'X-TOKEN': mu.storage('X-TOKEN')
    });

    MrServices.setRules({
        'list.rose.ring': true,
        'list.word.cloud': false,
    });

    MrServices.setResourcePool(brp);

    MrServices.reqCatch ( (res) => {
        console.debug('::::::::::', res);
    });

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

