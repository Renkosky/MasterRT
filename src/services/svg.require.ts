declare var require: any;
let theme = process.env.THEME;
let $svg: any = {};

console.log('::::: base svg');

// 支持无svg文件配置
try {
    $svg.drop = require(`src/assets/${theme}/drop.svg`);
    $svg.drop_active = require(`src/assets/${theme}/drop-active.svg`);
    $svg.drop_white = require(`src/assets/${theme}/drop_white.svg`);
    $svg.search = require(`src/assets/${theme}/searchCb.svg`);
    $svg.select = require(`src/assets/${theme}/select.svg`);
    $svg.select_active = require(`src/assets/${theme}/select_active.svg`);
    $svg.warn = require(`src/assets/${theme}/warn.svg`);
    $svg.star = require(`src/assets/${theme}/star.svg`);
    $svg.star_active = require(`src/assets/${theme}/star_active.svg`);
    $svg.risk_active = require(`src/assets/${theme}/risk_active.svg`);
    $svg.risk = require(`src/assets/${theme}/risk.svg`);
    $svg.brand_red = require(`src/assets/${theme}/brand_red.svg`);
    $svg.brand = require(`src/assets/${theme}/brand.svg`);
    $svg.brand_purple = require(`src/assets/${theme}/brand_purple.svg`);
} catch (e) {}

export default $svg;
