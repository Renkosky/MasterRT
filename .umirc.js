let umirc =  {
    plugins: [
        [
            'umi-plugin-react',
            {
                dva: {
                    immer: true,
                },

                antd: true,

                polyfills: ['ie9'],

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
    disableCSSModules: true
};

export default umirc;