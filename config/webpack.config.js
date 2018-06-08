module.exports = (srcBase) => {

    let jsPath = srcBase + '/web/js-webpack';

    return {
        entry: {
            global: jsPath + '/global.js',
            product: jsPath + '/product-page.js',
        },
        output: {
            filename: '[name].bundle.js'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    query: {
                        presets: ['babel-preset-env'].map(require.resolve)
                    }
                }
            ]
        }
    };

};