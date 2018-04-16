const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:path.join(__dirname,'src/app.js'),
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'bulid')
    },
    module:{
        rules:[{
                test: /\.js$/,
                use: "babel-loader"
            }, {
                test: /\.html$/,
                use: "html-loader"
            }, {
                test: /\.css$/,
                // use:["style-loader","css-loader"]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.(eot|svg|ttf|woff|woff2|otf)/,
                use: "url-loader?limit=50000&name=[path][name].[ext]"
            },
            {
                test: /\.(jpg|jpeg|png|gif)/,
                loader: "file-loader"
            }]
    },
    devServer:{
        host:'localhost',
        port:8090,
        contentBase:'.', //本地服务器所加载的页面所在的目录
        open:true,
        inline:true, //实时刷新
        hot:true,
        setup(app){
            app.get("/data", function(req, res) {
                res.writeHead(200, {
                    "Content-type": "text/json;charset=utf8",
                    "Access-Control-Allow-Origin": "*"
                });
                let filepath = path.join(__dirname, "src/data/data.json");
                fs.readFile(filepath, function(err, data) {
                    if (err) return console.error(err);
                    res.end(data);
                });
            });
        }
    },
   plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            //生成的html文档的标题
            title: "index",
            //输出文件的文件名称
            filename: 'index.html',
            //本地模板文件的位置
            //template: "./index.html",
            //可以指定模板的内容
            //templateContent
            //注入模板位置
            inject: "body",
            hash: true
        })
    ]
}
