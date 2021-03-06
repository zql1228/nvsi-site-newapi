"use strict";

const webpack = require("webpack");

const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const env = require("../config/prod.env");
const LoadJSBeforeHTMLProcessing = require("./plugin.load");
/* const MiniCssExtractPlugin = require('mini-css-extract-plugin'); */
/* const ImageminPlugin = require('imagemin-webpack-plugin').default//压缩工具 */

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const prefixUrl =
  process.env.NODE_ENV === "production"
    ? `${config.build.assetsPublicPath}${config.build.assetsSubDirectory}`
    : `${config.dev.assetsPublicPath}${config.dev.assetsSubDirectory}`;

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: ["./node_modules/babel-polyfill/dist/polyfill.js", "./src/main.js"] //兼容IE
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      static: resolve("static")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      "process.env": env,
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    }),
    // new webpack.DllReferencePlugin({
    //   //分离第三方插件
    //   context: __dirname,
    //   manifest: require("./vendor-manifest.json")
    // }),
    new LoadJSBeforeHTMLProcessing({
      paths: [
        // `${prefixUrl}/dll.vendor.js`,
        `${prefixUrl}/js/MarkerClusterer_min.js`,
        `${prefixUrl}/js/idangerous.swiper.min.js`,
        `${prefixUrl}/js/axios.min.js`,
        `${prefixUrl}/js/vue-lazyload.js`,
        `${prefixUrl}/js/sweetalert.min.js`,
        `${prefixUrl}/js/cropper.js`,
        `${prefixUrl}/js/crypto-js.min.js`,
        `${prefixUrl}/js/echarts.min.js`,
        `${prefixUrl}/js/china.js`,
        `${prefixUrl}/js/statistics.js`
      ]
    })
    /*.png'),
        destination: 'src/public/images',
        fileName: '[path][name].[ext]' // (filePath) => filePath.replace('jpg', 'webp') is also possible
      } 
    }) */ //,
    /*,
    new ImageminPlugin({// Imagemin压缩图片   
      test: /\.(jpe?g|png|gif|svg)$/i,//为图片才压缩，若是需要存放在img文件夹里面，则是 /img\/.*\.(jpe?g|png|gif|svg)$/i
      disable: process.env.NODE_ENV !== 'production', //不是生产环境时，禁用
      minFileSize:5000, //5k以上压缩
      //maxFileSize: 10000,//小于或等于10k才压缩
      jpegtran: { progressive: true },//使用jpeg
      pngquant: {//设置压缩图片的质量，设置95-100的质量是最好的
        quality: '95'
      },
       externalImages: {
        context: 'src', // Important! This tells the plugin where to "base" the paths at
        sources: glob.sync('src/images/**/
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: "babel-loader?cacheDirectory=true", // 通过设置cacheDirectory缓存loader执行结果，提升打包速度
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ],
        exclude: /node_modules/ // 不去查找的文件夹路径，node_modules下的代码是编译过得，没必要再去处理一遍
      },
      /*  {// 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 200000,// 小于200K的图片转成base64编码的dataURL字符串写到代码中
          fallback: 'file-loader',
          name: utils.assetsPath('img/[name].[hash:7].[ext]')// 其他的图片转移到静态资源文件夹
        },
        exclude: /node_modules///剥离node_modules文件
       // loaders: ['url-loader?limit=20000&name=utils.assetsPath(img/[name].[hash:7].[ext])','image-webpack']   //不可用
      },  */
      {
        // 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000, // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath("media/[name].[hash:7].[ext]") // 其他的图片转移到静态资源文件夹
        },
        exclude: /node_modules/ //剥离node_modules文件
      },
      {
        // 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000, // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]") // 其他的资源转移到静态资源文件夹
        },
        exclude: /node_modules/ //剥离node_modules文件
      },
      {
        // 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000, // 小于10K的图片转成base64编码的dataURL字符串写到代码中
              fallback: "file-loader",
              name: utils.assetsPath("img/[name].[hash:7].[ext]") // 其他的图片转移到静态资源文件夹
            }
          },
          {
            loader: "image-webpack-loader", // 压缩图片
            options: {
              mozjpeg: {
                //jpeg压缩  压缩导致头部背景会失真，所以暂时将jpge的压缩配置从65修改至100（项目用到的jpg图片很少，影响不大）
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                //png压缩
                enabled: false
              },
              pngquant: {
                //png压缩
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                //gif压缩
                interlaced: false
              }
              // the webp option will enable WEBP
              //webp: {
              // quality: 75
              //}
            }
          }
        ]
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
