// input,entry,output
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: './src/react-app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new MiniCSSExtractPlugin({
                filename: 'styles.css'
            })
        ],
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css/,
                    use: [
                        {
                            loader: MiniCSSExtractPlugin.loader,
                            options: {
                                sourceMap: true
                            }
                        },
                        "css-loader",
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
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
        devtool: isProduction ? 'cheap-source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
        }
    }
}

