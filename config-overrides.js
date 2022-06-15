const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
  // setWebpackPublicPath,
  // addLessLoader,
  // useEslintRc,
  addWebpackAlias,
  addWebpackModuleRule,
  overrideDevServer,
} = require('customize-cra')
const path = require('path')

module.exports = {
  webpack: override(
    // setWebpackPublicPath('/static'),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '@image': path.resolve(__dirname, 'src/assets/image'),
      '@style': path.resolve(__dirname, 'src/assets/style'),
      '@common': path.resolve(__dirname, 'src/components/common/'),
      '@layout': path.resolve(__dirname, 'src/components/layout/'),
      '@pages': path.resolve(__dirname, 'src/components/pages/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    }),
    addWebpackModuleRule({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            // webpack5.0中postcss添加plugins
            postcssOptions: {
              plugins: [require('postcss-preset-env')],
            },
          },
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: {
              // '@primary-color': '#1DA57A',
            },
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      ],
    })
  ),
  devServer: overrideDevServer((config) => {
    return {
      ...config,
      proxy: {
        '/github': {
          target: 'https://api.github.com',
          changeOrigin: true,
          pathRewrite: {
            '^/github': '', // remove base path
          },
        },
        '/tenapi': {
          target: 'https://tenapi.cn',
          changeOrigin: true,
          pathRewrite: {
            '^/tenapi': '', // remove base path
          },
        },
      },
    }
  }),
}
