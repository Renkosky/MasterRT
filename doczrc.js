import {css} from 'docz-plugin-css';
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

    typescript: true,
    plugins: [
        css({
            preprocessor: 'less',
            cssmodules: false
        })
    ]
};

