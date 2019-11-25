module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'commons': '@/commons',
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}