const path = require('path');

const root = path.resolve(__dirname, '..');
const environment = process.env.NODE_ENV || 'production';

module.exports = {
    mode: environment,
    target: 'node',
    entry: path.join(root, 'index.js'),
    output: {
        filename: 'index.js',
        path: path.join(root, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: root,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};
