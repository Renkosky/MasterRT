let umirc = {
    plugins: ['umi-plugin-dva'],
    hashHistory: true,

    proxy: {
        '/services': {
            target: 'http://58.215.174.164:16800/',
            changeOrigin: true,
            pathRewrite: {'^/services': ''}
        }
    }
};

export default umirc;