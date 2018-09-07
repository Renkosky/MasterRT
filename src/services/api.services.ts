declare var require: any;
let theme = process.env.THEME;
let $api: any = {};

// console.log('::::: base api');

// 支持无api文件配置
try {
    $api = require(`src/theme/${theme}/${theme}-server.ts`);
    $api = $api.default;
} catch (e) {
    // console.log('e', e);
}

export default $api;
