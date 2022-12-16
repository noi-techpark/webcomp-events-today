module.exports = {
  chainWebpack: (config) => {
    config.module.rule("images").use("url-loader").loader("url-loader");
  },
  productionSourceMap: false,
};
