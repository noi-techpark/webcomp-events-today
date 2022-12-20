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
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
  },
};
