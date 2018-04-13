import { message } from 'antd';
import {MrServices} from 'src/lib';
import * as mu from 'mzmu';

/**
 * 系统初始化配置设置页面
 */

export function config() {


    MrServices.setHeaders({
        'X-TOKEN': mu.storage('X-TOKEN')
    });

    MrServices.setRules({
        'list.rose.ring': true,
        'list.word.cloud': false,
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