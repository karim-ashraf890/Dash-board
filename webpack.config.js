const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    // 1) one entry per page
    entry: {
        common: './pages/common/sideMenu.ts',
        home: './pages/home.ts',
        login: './pages/login/login.ts',
        settings: './pages/settings/settings.ts',
        admins: './pages/Admins/admins.ts'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            }
        ],
    },

    // 2) one HtmlWebpackPlugin per page, inject only its chunk
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',          // dist/index.html
            template: './pages/home.html',   // source
            chunks: ['home'],                // inject ONLY home.js
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './pages/login/login.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            filename: 'settings.html',
            template: './pages/settings/settings.html',
            chunks: ['settings'],
        }),
        new HtmlWebpackPlugin({
            filename: 'admins.html',
            template: './pages/Admins/admins.html',
            chunks: ['admins'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
            ],
        }),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: '[name].js', // home.js, login.js, settings.js
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },

    devServer: {
        port: 9090,
        client: {
            logging: 'none',
            overlay: {
                warnings: false,
                errors: true,
            },
        },
    },
};
