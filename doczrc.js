import {css} from 'docz-plugin-css';
const path = require('path');

export default {
    themeConfig: {
        styles: {
            container: {
                width: '80%',
                minWidth: 920,
                padding: ['20px 30px', '0 40px 40px'],
            },

            blockquote: {
                background: '#7D899C',
                borderLeft: '1px solid #0B5FFF'
            }
        }
    },

    dest: 'dist/docz',

    typescript: true,
    hashHistory: false,
    plugins: [
        css({
            preprocessor: 'less',
            cssmodules: false
        })
    ],

    // modifyBundlerConfig: (config) => {
    //     config.output.publicPath = './public/';
    //     return config;
    // }
};

