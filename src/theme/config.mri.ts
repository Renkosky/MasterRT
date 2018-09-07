/**
 * 该文件使用 mri-cli 生成, 不要修改该文件内容
 * require + expression (动态路劲)，引入资源文件，导致所有的模块都被打包
 */

// console.log('::::: theme index');
// declare var require: any;
// let theme = process.env.THEME;
// const themeConfig = require(`src/theme/${theme}/${theme}-config.ts`).default;
// export default themeConfig;

/**
 * theme 下列文件清单
 *
 * !-> 必须有
 * ?-> 可有可无
 * ${THEME} 主题名称
 */

//!-> social-config.js 每个项目webpack配置文件，定义该theme的名称以及配色方案等
//!-> ${THEME}-theme-config.ts 每个主题配置文件，已经相关路由配置信息
//?-> ${THEME}-dva.ts dva启动文件，包含部分系统设置
//?-> ${THEME}-const.ts 该主题全局常量文件
//?-> ${THEME}-routes.ts 该主题route配置信息（也可直接写在themeConfig文件）
//!-> layout 文件夹，该主题布局配置


import {default as $config} from 'src/theme/demo/demo-theme-config';
export default $config;
