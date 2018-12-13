import { css } from 'docz-plugin-css';
const _ = require('lodash');
const path = require('path');

export default {
    themeConfig: {
        themeConfig: {
            mode: 'dark'
        },

        styles: {
            container: {
                width: '80%',
                minWidth: 920,
                padding: ['20px 30px', '0 40px 40px']
            }

            //     blockquote: {
            //         background: '#7D899C',
            //         borderLeft: '1px solid #0B5FFF'
            //     }
            // }
        }
    },

    dest: 'dist/docz',

    typescript: true,
    hashRouter: true,
    codeSandbox: false,
    plugins: [
        css({
            preprocessor: 'less',
            cssmodules: false,
            loaderOpts: {
                javascriptEnabled: true
            }
        })
    ]

    // modifyBundlerConfig: (config) => {
    //     config.module.rules.push({
    //         loader: 'less-loader',
    //         options: { javascriptEnabled: true }
    //     });
    //     return config;
    // }
};
