const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackMerge = require("webpack-merge");
const Webpack = require("webpack");
const path = require("path");
const webAppPath = "./src/webApp";
const appEntry='/index.js';
const htmlTemplatePath = '/index.html' 

const devConfig =() => ({
     devtool: "eval-source-map",
      devServer:{
    //  contentBase: path.resolve(__dirname,'dist'),
       contentBase: 'dist',
      compress: true,
      port:process.env.port,
      stats:"errors-only",
      open:true,
      inline:true,
      historyApiFallback: true
     
    }
});
const prodConfig = () => ({
  devtool: "source-map"
})

const commonConfig = () => ({
    entry: {bundle:webAppPath + appEntry, vendor:[ "axios","react","react-bootstrap","react-dom"] },
    output:{
        filename:'[name].[chunkhash].js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/'
    },
    module:{
      rules:[
         {test: /\.js$/, use: 'babel-loader',exclude: ['node_modules']},
         {test: /\.css$/, use: ['style-loader','css-loader','sass-loader']},
         {test: /\.scss$/, use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
         })},
         {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: 'file-loader'
        },
         {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[ext]?[hash]'
          }
        }],        
      }
      ]  
    },
   
    plugins:[
        new HtmlWebpackPlugin({
         template: webAppPath + htmlTemplatePath
        }),
       new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname), 
            verbose: true,
            dry: false,
            exclude: ['node_modules']
        }),
        new ExtractTextPlugin("styles.[chunkhash].css"),
        new CopyWebpackPlugin([
      { from: __dirname + '/src/webApp/images', to: __dirname + '/dist/images/' }
    ]),
 //   new BundleAnalyzerPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }) 
    ]
})

module.exports = (env) =>{
  if(env.prod === 'true'){
      return  WebpackMerge(commonConfig(),prodConfig());
  }
  return  WebpackMerge(commonConfig(),devConfig());
}