const path = require('path');
const _ = require('lodash');
const theme = process.env.THEME || 'aaa';
const env = process.env.MRI_ENV || 'bbb';
const device = process.env.MRI_DEVICE || 'ccc';

let umirc = {
    /**
     * umi 插件配置
     */
    plugins: [
        [
            'umi-plugin-react',
            {
                dva: {
                    immer: true
                },

                antd: true,

                dynamicImport: {
                    webpackChunkName: true
                },

                pwa: true,

                title: 'Loading'
            }
        ]
    ],

    /**
     * 驱动器支持
     * + umi@2.1.0
     */
    targets: {
        ie: 9
    },

    /**
     * 路由守卫地址
     */
    // pages: {
    //     '/': {Route: './src/theme/route-guard.tsx'}
    // },

    /**
     * 使用#， hash形式显示路径
     */

    history: 'hash',

    /**
     * webpack
     */

    hash: true,

    proxy: {
        '/services': {
            target: 'http://58.215.174.164:16800/',
            changeOrigin: true,
            pathRewrite: {'^/services': ''}
        }
    },

    theme: {
        'primary-color': '#1890ff'
    },

    /**
     * 打包路径
     */
    outputPath: path.join('./', 'dist', theme),

    /**
     * 路径引用别名
     */
    alias: {
        src: path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets'),
        common: path.resolve(__dirname, 'src/common'),
        containers: path.resolve(__dirname, 'src/containers'),
        layouts: path.resolve(__dirname, 'src/layouts'),
        models: path.resolve(__dirname, 'src/models'),
        pages: path.resolve(__dirname, 'src/pages'),
        services: path.resolve(__dirname, 'src/services'),
        utils: path.resolve(__dirname, 'src/utils'),
        components: path.resolve(__dirname, 'src/components')
    },

    // webpack-defined
    define: {
        'process.env.THEME': theme,
        'process.env.MRI_ENV': env,
        'process.env.MRI_DEVICE': device
    },

    // 禁用Css Modules 模式
    disableCSSModules: true,

    // 忽略momentjs 的本地化文件
    ignoreMomentLocale: true,

    urlLoaderExcludes: [/assets(.*)\.svg$/],

    chainWebpack(config) {
        config.module
            .rule('svg')
            .test(/.svg(\?v=\d+.\d+.\d+)?$/)
            .use([
                {
                    loader: 'babel-loader'
                },
                {
                    loader: '@svgr/webpack',
                    options: {
                        babel: false,
                        icon: true
                    }
                }
            ])
            .loader(require.resolve('@svgr/webpack'));
    }
};

export default umirc;
