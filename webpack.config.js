const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
    entry: "./src/index.js", //入口文件，就是在src目录下的index.js文件，
    output: {
      path: path.resolve(__dirname, "./dist"), //输出路径dist目录
      publicPath: "/dist/",
      filename: "index.min.js", //打包后输出的文件名字,这里需要和package.json文件下main应该写为:'dist/index.js'
      libraryTarget: "umd",
      // 　libraryTarget：为了支持多种使用场景，我们需要选择合适的打包格式。libraryTarget 属性。这是可以控制 library 如何以不同方式暴露的选项。
      umdNamedDefine: true
    },
    //这里我们可以剔除掉一些通用包,自己的包不打包这些类库,需要用户环境来提供
    externals: {
      vue: "vue",
    },
    module: {
      rules: [
        {
            test: /\.vue$/,
            loader: "vue-loader",
            exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
            options: {
              modules: true,
              loaders: {
                scss: "vue-style-loader!css-loader!sass-loader",
                sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax",
              },
            },
          },
          {
            test: /\.js?$/,
            loader: "babel-loader",
            exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
          },
          {
            test: /\.(css|scss)$/,
            oneOf: [
              // 这里匹配 `<style module>`
              {
                resourceQuery: /module/,
                use: [
                  "vue-style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      modules: true,
                      //localIdentName: "[local]_[hash:base64:5]",
                    },
                  },
                  {
                    loader: "sass-loader",
                  },
                ],
              },
              // 这里匹配普通的 `<style>` 或 `<style scoped>`
              {
                use: [
                  "vue-style-loader",
                  "css-loader",
                  {
                    loader: "sass-loader",
                  },
                ],
              },
            ],
          },
      ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
  };