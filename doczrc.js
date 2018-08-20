import {css} from 'docz-plugin-css';
export default {
    typescript: true,
    plugins: [
        css({
            preprocessor: 'less',
            cssmodules: false
        })
    ]
};

