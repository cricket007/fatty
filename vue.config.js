const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        "/mnt/c/Work/fatty/src/styles/_variables.scss",
        "/mnt/c/Work/fatty/src/styles/_mixins.scss"
      ]
    },
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ["/", "/about", "/progress"],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      customRendererConfig: {
        args: ["--disable-extensions"]
      }
    }
  },

  configureWebpack: {
    plugins: [
      new CopyPlugin([
        { from: "src/assets/content", to: "./api" },
        { from: "src/assets/weight-graph.svg", to: "./img/weight-graph.svg" }
      ])
    ]
  },

  pwa: {
    name: "Fatty",
    themeColor: "#0a1d2d",
    msTileColor: "#22292f",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {}
  }
};
