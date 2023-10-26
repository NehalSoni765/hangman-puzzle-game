const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"], //start process
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/scripts"),
  },
  module: {
    rules: [
      {
        test: /\.js$/, //before .js and afterfor $
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "public/"),
    devMiddleware: {
      publicPath: "/scripts/",
    },
    port: 3002,
  },
  devtool: "source-map", // it converts babel code to our code in browser devtool
};
