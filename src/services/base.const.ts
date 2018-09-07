declare var require: any;
let theme = process.env.THEME;
let $const: any = {};


// 支持无const文件配置
try {
    $const = require(`src/theme/${theme}/${theme}-const.ts`).default;
} catch (e) {
    console.error(e);
}

export default $const;
