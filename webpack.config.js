const webpack = require('webpack');

const path = require('path');

const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv !== 'development';

// Common pluginslet plugins = [new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(nodeEnv),},}),new webpack.NamedModulesPlugin()];

if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}

const entry = isProduction ? ['babel-polyfill', path.resolve(path.join(__dirname, './index.js'))] : ['webpack/hot/poll?1000', 'babel-polyfill', path.resolve(path.join(__dirname, './index.js'))];



const TerserPlugin=require('terser-webpack-plugin');
module.exports={
    entry:'./index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist'),
        publicPath: "/public/"
    },
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "querystring": false,
            "url": false,
            "util": false,
            "url": false,
            "crypto": false,
        }
      },
    mode:'none',
    module:{
        rules:[
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
              }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader"
              },
            {
                test:/\.(jpg|png)$/,
                exclude: /node_modules/,
                use:['file-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            }

        ]
    },
    plugins:[
        new TerserPlugin()
    ]
}