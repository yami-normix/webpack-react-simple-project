const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Importamos el plugin


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),

    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development',
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
        })

    ],
    devServer: {
        static: path.join(__dirname, 'dist'), // Indica el directorio donde se encuentra el contenido
        compress: true, // Habilita la compresión gzip para todos los archivos servidos
        port: 3006, // Puerto del servidor
        open: true, // Abre el navegador al iniciar el servidor
    }
}