declare var require: any;
let theme = process.env.THEME;
let $bus: any = {};
console.log('::::: base const', `${theme}${+new Date()}`);

// 支持无const文件配置
try {
    $bus = require(`src/theme/${theme}/${theme}-bus.ts`).default;
} catch (e) {}

export default $bus;
