(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"./mri/theme.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return u});var a=t("./node_modules/react/index.js"),o=t.n(a),r=t("./node_modules/@mdx-js/tag/dist/index.js");function m(e){return(m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function s(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function p(e,n){return!n||"object"!==m(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,n){return(i=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var u=function(e){function n(e){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=p(this,l(n).call(this,e))).layout=null,t}var t,a,m;return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&i(e,n)}(n,o.a.Component),t=n,(a=[{key:"render",value:function(){var e=this.props,n=e.components;c(e,["components"]);return o.a.createElement(r.MDXTag,{name:"wrapper",components:n},o.a.createElement(r.MDXTag,{name:"h1",components:n,props:{id:"theme"}},"theme"),o.a.createElement(r.MDXTag,{name:"p",components:n},"MRI\u6700\u6838\u5fc3\u7684\u6982\u5ff5\u4e4b\u4e00"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u6bcf\u4e2atheme\u90fd\u8981\u53ef\u4ee5\u5355\u72ec\u53d1\u5e03\u6210\u4e00\u4e2aapp\u53d1\u5e03\uff1b"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u4e5f\u53ef\u4ee5\u5c06\u591a\u4e2atheme\u7ec4\u5408\u6210\u4e00\u4e2a\u65b0\u7684theme\u53d1\u5e03\uff1b"),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"\u521b\u5efa"}},"\u521b\u5efa"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-bash"}},"// \u65b0\u5efa\n$ mri theme themeName\n\n// \u542f\u52a8\n$ mri dev themeName\n\n// \u53d1\u5e03\u6d4b\u8bd5\n$ mri build themeName\n\n// \u53d1\u5e03\u751f\u4ea7\n$ mri prod themeName\n")),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"\u7ec4\u6210"}},"\u7ec4\u6210"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{}},"+ ${theme}/\n    // \u5e38\u89c1\u5f00\u53d1\u4e09\u79cd\u73af\u5883\u7684\u914d\u7f6e\u6587\u4ef6\n    + env/\n        - ${theme}-dev-cont.ts\n        - ${theme}-test-cont.ts\n        - ${theme}-prod-cont.ts\n\n    // umirc.js, mrirc.js \u7684\u914d\u7f6e\u4fe1\u606f\n    - ${theme}-config.js\n    // dva \u7684\u542f\u52a8\u6587\u4ef6\n    - ${theme}-dva.ts\n    // \u5355theme\u7684\u8def\u7531\u5b88\u536b\uff0c\u662f\u5168\u5c40\u8def\u7531\u5b88\u536b\u7684\u8865\u5145\n    - ${theme}-route-guard.ts\n    // ${theme} \u8def\u7531\u914d\u7f6e\u6587\u4ef6\n    - ${theme}-routes.ts\n    // umijs \u548c mri-cli \u7684\u76f8\u5173\u914d\u7f6e\u4fe1\u606f\n    - ${theme}-umi.js\n    // \u914d\u7f6e\u9884\u52a0\u8f7d\u6570\u636e\n    - ${theme}-preload.ts\n")),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"env"}},"env"),o.a.createElement(r.MDXTag,{name:"p",components:n},"MRI \u9884\u8bbe\u4e09\u79cd\u73af\u5883\uff1a"),o.a.createElement(r.MDXTag,{name:"ul",components:n},o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"dev: \u5f00\u53d1\u73af\u5883"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"test: \u6d4b\u8bd5\u73af\u5883"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"prod: \u751f\u4ea7\u73af\u5883")),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u4e09\u79cd\u73af\u5883\u53ef\u80fd\u4f1a\u6709\u4e00\u4e9b\u53c2\u6570\u53d8\u91cf\uff0c\u5728\u4e0d\u540c\u73af\u5883\u4e2d\u6709\u7740\u4e0d\u540c\u7684\u8868\u73b0\uff0c \u5982"),o.a.createElement(r.MDXTag,{name:"ul",components:n},o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"\u6d4b\u8bd5\u8d26\u53f7"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"\u662f\u5426\u6253\u5f00debug\u6a21\u5f0f"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"\u662f\u5426\u6253\u5370\u8c03\u8bd5\u4fe1\u606f\n\u2014 API\u8fde\u63a5\u5730\u5740"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"\u9519\u8bef\u4fe1\u606f\u8f93\u51fa\u5ea6"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"umijs \u6216 mri \u76f8\u5173\u53c2\u6570\u7b49")),o.a.createElement(r.MDXTag,{name:"p",components:n},"env \u5e38\u91cf \u4f1a\u4e0e const \u6570\u636e\u5408\u5e76\u8fdb\u884c\u8c03\u7528(env > const)"),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"configjs"}},"config.js"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u5305\u542b umirc.js, mrirc.js \u7684\u914d\u7f6e \u548c mri-cli\u7684\u73af\u5883\u53d8\u91cf\u914d\u7f6e\uff1b"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u6bcf\u4e2atheme\u90fd\u6709\u53ef\u80fd\u6709\u81ea\u5df1\u5355\u72ec\u7684\u914d\u7f6e\uff0c\u5728\u8fd9\u91cc\u53ef\u4ee5\u914d\u7f6e\u9488\u5bf9\u8be5theme\u7684\u5355\u72ec\u914d\u7f6e\uff1b"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js"}},"// social.config.js\nmodule.exports = {\n\n    // \u914d\u7f6eumirc \u7684\u4ee3\u7406\u670d\u52a1\n    proxy: {\n        '/services': {\n            target: 'http://58.215.174.164:16800/',\n            changeOrigin: true,\n            pathRewrite: {'^/services': ''}\n        }\n    },\n\n    // \u914d\u7f6e mri-cli \u7684\u73af\u5883\u53d8\u91cf\n    mri: {\n        theme: 'social',\n        PORT: '6001'\n    }\n};\n")),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"theme-configts"}},"theme-config.ts"),o.a.createElement(r.MDXTag,{name:"p",components:n},"theme \u7684\u4e3b\u914d\u7f6e\u6587\u4ef6\uff1b"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u4e0e config.js \u4e0d\u540c\u7684\u662f\uff1a"),o.a.createElement(r.MDXTag,{name:"ul",components:n},o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"config.js \u9488\u5bf9\u7684\u662f\u5f53\u524d\u6267\u884c\u73af\u5883(UMIJS, MRI-CLI)"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"theme-config.ts \u9488\u5bf9\u7684\u5f53\u524d\u5f00\u53d1\u73af\u5883(MRI)")),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js"}},"// social-config.ts\nclass SocialThemeConfig  {\n    /**\n     * theme name\n     * \u4e3b\u9898\u540d\u79f0\n     * @type {string}\n     */\n    name = 'social';\n\n    /**\n     * website name\n     * \u7f51\u7ad9\u540d\u79f0\n     */\n    website = 'Social X';\n\n    /**\n     * base layout\n     * \u57fa\u672c\u5e03\u5c40\n     */\n    layout = SocialLayout;\n\n    /**\n     * routes config\n     * \u8def\u7531\u914d\u7f6e\n     */\n    routes = SocialRoutes;\n\n    /**\n     * providers\n     */\n    providers = {\n        SocialConst: {...SocialConst, ...EnvConst},\n        SocialServices\n    };\n\n    /**\n     * derive\n     * \u662f\u5426\u7531\u5176\u4ed6\u9879\u76ee\u6d3e\u751f\u51fa\u6765\n     */\n    extra = {\n        showLogout: true\n    };\n\n}\n")),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"routests"}},"routes.ts"),o.a.createElement(r.MDXTag,{name:"p",components:n},"routes \u662f\u4e0e umi \u7684 pages \u76f8\u5bf9\u5e94\u7684;"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u5b83\u8d1f\u8d23\u6574\u4e2atheme\u7684\u8def\u7531\uff0clayout\uff0c\u6743\u9650 \u7b49"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js"}},"IRoutes = {\n    // module: \u5f53\u524d\u6a21\u5757\u7684\u540d\u79f0\uff0c\u4e0d\u53ef\u91cd\u590d\n    [module: string]: {\n\n        // component: \u5f53\u524d\u8def\u7531\u8c03\u7528\u7684\u4e3b\u7ec4\u4ef6\n        component: React.Component;\n\n        // path: \u5f53\u524d\u8def\u7531\u7684\u8def\u5f84\uff0c\u53ef\u591a\u4e2a\n        path?: string[],\n\n        // token: \u5f53\u524d\u8def\u7531\u662f\u5426\u9700\u8981token, \u5373\u662f\u5426\u9700\u8981\u7528\u6237\u8eab\u4efd\u6743\u9650\n        token: boolean,\n\n        // layout: \u5e03\u5c40layout\n        // \u82e5\u8bbe\u7f6e\u8be5layout, \u5219\u66ff\u6362theme-config\u914d\u7f6e\u7684\u4e3blayout\n        // \u5982\u4e0d\u4e0d\u8bbe\u7f6e\uff0c\u5219\u9ed8\u8ba4\u4f7f\u7528theme-config\u914d\u7f6e\u7684layout\n        layout?: React.Component,\n\n        // subLayout: \u5b50\u5e03\u5c40\u6846\u67b6\n        // \u5373\u5728layout\u7684content\u4e4b\u4e0a, \u518d\u753b\u4e00\u5c42\u5e03\u5c40\n        subLayout?: React.Component,\n\n        // src: \u8be5component\u66fe\u5c5e\u4e8e\u54ea\u4e2atheme\n        // \u5373 \u7ee7\u627f\u6837\u5f0f(\u5982\u679c\u4e0d\u914d\u7f6e\uff0c\u5219\u9488\u5bf9\u6e90theme\u914d\u7f6e\u7684\u6837\u5f0f\u5931\u6548)\n        src: string\n    }\n}\n")),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"dvats"}},"dva.ts"),o.a.createElement(r.MDXTag,{name:"p",components:n},o.a.createElement(r.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"https://github.com/dvajs/dva"}},"DVA")," \u914d\u7f6e\u6587\u4ef6, \u5229\u7528\u5b83\u5728\u7cfb\u7edf\u542f\u52a8\u4e4b\u540e\uff0ccomponent \u6267\u884c\u4e4b\u524d\u542f\u52a8\u7684\u539f\u7406\uff0c"),o.a.createElement(r.MDXTag,{name:"p",components:n},"\u6682\u65f6\u5c06 MRI \u7684 preset \u7684\u4e1c\u897f\u653e\u5728\u6b64\u5904\uff1b"),o.a.createElement(r.MDXTag,{name:"p",components:n},o.a.createElement(r.MDXTag,{name:"strong",components:n,parentName:"p"}," TODO ")," \u5b83\u6700\u7ec8\u5c06\u88ab\u66ff\u6362\uff1b"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js"}},"// \u8fd9\u662f\u4e00\u4e2a\u4f8b\u5b50\n\nimport $theme from '..';\nimport { MrServices } from 'masterrt';\nimport  mu from 'mzmu';\nimport { $pool, $utils, $intl } from '../../services';\n\nexport default function config() {\n    let MriDocConst = $theme.getProviders('MriDocConst');\n\n    MrServices.setHeaders({\n        'X-TOKEN': () => mu.storage(MriDocConst.STORAGE_X_TOKEN) || '',\n        'X-LANG': () => mu.storage(MriDocConst.STORAGE_LOCALE) || MriDocConst.LOCALE,\n        'X-ORIGIN': MriDocConst['X-ORIGIN']\n    });\n\n    MrServices.setResourcePool($pool);\n\n    return {\n        onError(err) {\n            // message.error(err.message);\n            err.preventDefault();\n        },\n\n        initialState: {\n            global: {\n                text: 'hi mri'\n            }\n        }\n    };\n}\n")),o.a.createElement(r.MDXTag,{name:"h3",components:n,props:{id:"theme-preloadts"}},"${theme}-preload.ts"),o.a.createElement(r.MDXTag,{name:"ul",components:n},o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"\u5404theme\u8bbe\u7f6epreload\uff0c\u9884\u52a0\u8f7d\u6570\u636e"),o.a.createElement(r.MDXTag,{name:"li",components:n,parentName:"ul"},"\u5728module.token(\u767b\u5f55\u72b6\u6001)\u65f6\uff0c\u7cfb\u7edf\u9884\u52a0\u8f7duser\u4fe1\u606f")),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{}},"export default (module) => {\n\n    // ...\n    // \u9884\u52a0\u8f7d\u6570\u636e\u5728\u6b64\u5904\u7406\uff0c\u53ef\u5b58\u50a8\u503c StoreServices\n    // \u5e76\u5c06promise\u653e\u7f6e\u4e0e promise.all\n\n    let $$test = $pool.test.get({});\n\n    $$test.then((result) => {\n        // \u5904\u7406\u6570\u636e\n        // \u5c06\u4fe1\u606f\u5b58\u50a8\u81f3 StoreServices\n        StoreServices.setValue('TEST', result);\n    })\n\n    return Promise.all([$$test]);\n\n}\n")))}}])&&s(t.prototype,a),m&&s(t,m),n}()}}]);
//# sourceMappingURL=mri-theme.d68c74e902eeb5f4e6f4.js.map