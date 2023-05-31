// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module.rule("images").set("parser", {
      dataUrlCondition: {
        maxSize: 300 * 1024,
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
