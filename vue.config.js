module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  configureWebpack: {
    entry: ["babel-polyfill", "./src/main.ts"]
  },
  publicPath: './',
  productionSourceMap: false
}
