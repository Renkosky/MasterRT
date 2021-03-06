import {resolve} from 'path';

export default {
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
