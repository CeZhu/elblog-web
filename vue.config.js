module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        utils: '@/utils'
      }
    }
  },
  css: {
    requireModuleExtension: true
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '/'
  //     }
  //   }
  // }
}

