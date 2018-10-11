let umirc =  {
    plugins: [
        [
            'umi-plugin-react',
            {
                dva: {
                    immer: true,
                },

                antd: true,

                dynamicImport: {
                    webpackChunkName: true,
                },

                pwa: true,

                title: 'mri pro',
            }
        ]
    ],

    history: 'hash',

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

    // publicPath: '.',
    disableCSSModules: true,

    // ant design Icon 支持自定义图标
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