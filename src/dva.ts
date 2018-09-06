import {message} from 'antd';

/**
 * 系统初始化配置设置页面
 */

export function config() {

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



