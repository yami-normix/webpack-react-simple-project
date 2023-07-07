const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Importamos el plugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Importamos el plugin
const TerserPlugin = require('terser-webpack-plugin'); // Importamos el plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Importamos el plugin

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath:'./',

    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
        }
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx?)$/, // Busca todos los archivos con extensión .js o .jsx
                exclude: /node_modules/, // Ignora la carpeta node_modules  
                use: {
                    loader: 'babel-loader', // Utiliza el loader de babel
                }
            },  
            {
                test: /\.html$/, // Busca todos los archivos con extensión .html
                use: [
                    { loader: 'html-loader' } // Utiliza el loader de html
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/i, // Busca todos los archivos con extensión .scss o .sass
                use: [
                    'style-loader', // Inyecta el css en el DOM
                    'css-loader', // Convierte el css en módulos
                    'sass-loader' // Compila el sass a css

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Indica el archivo HTML de entrada
            filename: './index.html' // Indica el nombre del archivo final
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css' // Indica el nombre del archivo final
        }),
        new CleanWebpackPlugin(),

    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}