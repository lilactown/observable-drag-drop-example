module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
            }
        ],
    },
    resolve: {
        fallback: __dirname + '/node_modules'
    },
    resolveLoader: {
        fallback: __dirname + '/node_modules'
    }
};