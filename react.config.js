const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {

  webpack (config) {
    const { NODE_ENV } = process.env

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    config.resolve.alias = {
      ...config.resolve.alias,

      '@components': path.resolve(__dirname, 'src/components/'),
      '@scss': path.resolve(__dirname, 'src/scss/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@src': path.resolve(__dirname, 'src/')
    }


    if (NODE_ENV == 'production') {

      config.optimization.splitChunks = { cacheGroups: { default: false } }
      config.optimization.runtimeChunk = false

      config.output.filename = 'static/js/constructor.[contenthash].js'
      config.plugins.forEach(plug => {
        if (plug instanceof MiniCssExtractPlugin) {
          plug.options.filename = 'static/css/constructor.[contenthash].css'
        }
      })
    }

    return config
  }
}
