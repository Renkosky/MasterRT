/**
 * 默认的样式变量设置
 * 其实这是一个ES6的JS文件，只基于JS语法
 * @type {{}}
 *
 * 如果要覆盖 ant-design 默认的样式 则无需在此定义
 * 若需要查antd默认样式
 * https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
 *
 * 这里定义的是系统自定义样式，请添加前缀 mri 以区分与 antd 的样式名
 *
 */

const themeUI = {
    'primary-color': '#1890ff',
    'primary-1': 'tint(@primary-color, 90%)',
    'success-color': '#52c41a',
    'error-color': '#f5222d',
    'warning-color': '#faad14',
    'info-color': '#1890ff',
    'font-size-base': '14px',
    'text-color': 'fade(#000, 65%)',
    'layout-header-background': '#001529',
    'layout-sider-background': '@layout-header-background',
    'layout-trigger-background': '#002140',
    // 'layout-sider-background': '#001529',

    // Menu
    // ---
    'menu-inline-toplevel-item-height': '40px',
    'menu-item-height': '40px',
    'menu-collapsed-width': '80px',
    'menu-bg': '#fff',
    'menu-item-color': '@text-color',
    'menu-highlight-color': '@primary-color',
    'menu-item-active-bg': '@primary-1',
    'menu-item-group-title-color': 'fade(#000, 45%)',

    // dark theme
    'menu-dark-color': 'fade(#fff, 65%)',
    'menu-dark-bg': '@layout-header-background',
    'menu-dark-arrow-color': '#fff',
    'menu-dark-submenu-bg': '#000c17',
    'menu-dark-highlight-color': '#fff',
    'menu-dark-item-active-bg': '@primary-color',


    'mri-header-color': '#aaa',
    'mri-sub-color': '#aaa',
    'mri-footer-color': '#aaa',
    'mri-side-color': '#aaa',
    'mri-main-color': '#aaa',
    'mri-main-width': '85%',
    'mri-border-color': '#aaa'
};

module.exports = themeUI;
