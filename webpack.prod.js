const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "webcomp-noi-events.min.js",
    path: path.resolve(__dirname, "dist"),
  },
};
