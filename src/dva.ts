import { message } from 'antd';
import { MrServices } from './lib';
import { default as brp } from './services/base-resource-pool';
import * as moment from 'moment';
import echartsTheme from './assets/csi.echarts-theme-new';
import * as Mock from 'mockjs';
import * as mu from 'mzmu';
// require('./assets/csi.echarts-theme.js');

/**
 * 系统初始化配置设置页面
 */

export function config() {
    /* 
    * 方式一--------------单独调用各配置方法
    */
    /*MrServices.setHeaders({
        // 'Content-Type': 'text/json',
        // 'X-TOKEN': () => mu.storage('X-TOKEN')

        // 'X-ORIGIN': 'test.new-socialx.visualmaster.com.cn',
        // 'X-TOKEN': '4a7602d0dd985e64822851004456e5df8f8001381639191439316396b79f93'

        'X-ORIGIN': 'test.loreal.visualmaster.com.cn/ksidashboard',
        'X-TOKEN': 'c09332fed385bbd55a2cdc4b495e6e0bd0e002b1164a6eed39a16bfe9fff99'
    });

    MrServices.setRules({
        'list.rose.ring': true,
        'list.word.cloud': false
    });

    MrServices.setResourcePool(brp);

    MrServices.reqCatch((res) => {
        console.debug('::::::::::', res);
        return Promise.reject(res);
    });

    MrServices.setEchartsTheme(echartsTheme.themeName, echartsTheme.themeConfig);
    */
    /**
     * 方式二--------------所有配置方法一起
     */
    MrServices.setConfig({
        headers: {
            'X-ORIGIN': 'test.loreal.visualmaster.com.cn/ksidashboard',
            'X-TOKEN': 'c09332fed385bbd55a2cdc4b495e6e0bd0e002b1164a6eed39a16bfe9fff99'
        },
        rules: {
            'list.rose.ring': true,
            'list.word.cloud': false
        },
        resourcePool: brp,
        reqCatch: (res) => {
            console.debug('::::::::::', res);
            return Promise.reject(res);
        },
        mrEchartsTheme: echartsTheme,
        mrEchartsColors: {
            base: echartsTheme.themeConfig.color
        }
    });

    moment.defineLocale('en-us', {
        week: {
            dow: 4, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });



    return {
        onError(err) {
            // err.preventDefault();
            // message.error(err.message);
        },

        initialState: {
            global: {
                text: 'hi umi + dva'
            }
        }
    };
}
