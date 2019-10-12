const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJs = require("uglifyjs-webpack-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  return {
    entry: ["babel-polyfill", path.join(__dirname, "./src/index.js")],
    output: {
      filename: "js/[name].[chunkhash:7].js",
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "js/[name].[chunkhash:7].js",
      publicPath: ""
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(html)$/, //img的src引入 要用这个插件
          use: {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "img:data-src", "audio:src"],
              minimize: true
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css|.less$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/i,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8000,
                outputPath: "images/",
                name: "[name].[ext]"
              }
            }
          ]
        }
      ]
    },
    devtool: "cheap-module-source-map",
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 6,
        name: true,
        cacheGroups: {
          vendor: {
            name: "vendor",
            chunks: "initial",
            priority: 10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          },
          // styles: {
          //   name: 'styles',
          //   test: /\.(less|css)$/,
          //   chunks: 'all',
          //   minChunks: 1,
          //   reuseExistingChunk: true,
          //   enforce: true
          // },
          common: {
            // 抽离自己写的公共代码，common这个名字可以随意起
            chunks: "initial",
            name: "common", // 任意命名
            minSize: 10 // 只要超出0字节就生成一个新包
          }
        }
      },

      minimizer: [
        new UglifyJs({
          exclude: /\/excludes/,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false
          }
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ["dist"]
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  };
};
