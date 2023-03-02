const path = require("path");
module.exports = {
  configureWebpack: {
    entry: "./src/App.vue",
    output: {
      filename: "webcomp-events-today.min.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.(webp|png|svg)$/,
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 1000, // 1kB
            name: '[name].[ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 1000, // 1kB
            name: '[name].[ext]',
          },
        },
      ],
    },
  },
};
