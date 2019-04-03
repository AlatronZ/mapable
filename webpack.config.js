// input,entry,output
const path = require('path');

module.exports = {
    entry: './src/react-app.js',
    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.s?css/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpe?g|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'dirname/[hash].[ext]'
                    }
                }]
        }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};

