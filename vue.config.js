const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module.rule("images").set("parser", {
      dataUrlCondition: {
        maxSize: 15 * 1024,
      },
    });
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      css: {
        import: true,
      },
    },
  },
});
