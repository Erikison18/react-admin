const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
  // setWebpackPublicPath,
  // addLessLoader,
  // useEslintRc,
  addWebpackPlugin,
  addWebpackAlias,
  addWebpackModuleRule,
  overrideDevServer,
} = require('customize-cra')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 代码压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css压缩
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 打包进度
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 大文件定位
const path = require('path')
const paths = require('react-scripts/config/paths')
// // 修改打包文件路径为 web 工程的 resources 目录
paths.appBuild = path.join(path.dirname(paths.appBuild), './build')
const produtionMode = process.env.NODE_ENV === 'production'

module.exports = {
  webpack: override(
    (config) => {
      // console.log('config', config)
      // console.log('module', config.module)
      // console.log('rules', config.module.rules[0])
      return config
    },
    // setWebpackPublicPath('/static'),
    addDecoratorsLegacy(),
    // 注意是production环境启动该plugin
    produtionMode &&
      addWebpackPlugin(
        new UglifyJsPlugin({
          sourceMap: false,
          cache: true, // 开启打包缓存
          parallel: true, // 开启多线程打包
          uglifyOptions: {
            warnings: false, // 删除警告
            output: {
              comments: false, // 移除注释
            },
            // 压缩
            compress: {
              drop_console: true, // 移除console
              drop_debugger: true, // 移除debugger
            },
          },
        })
      ),
    addWebpackPlugin(
      new MiniCssExtractPlugin({
        filename:
          'static/css/[name].[hash]time:' + new Date().valueOf() + '.css',
        chunkFilename: 'static/css/[id].[hash].css',
      })
    ),
    addWebpackPlugin(new ProgressBarPlugin()),
    // 判断环境变量ANALYZER参数的值
    process.env.ANALYZER &&
      addWebpackPlugin(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server', // 每次构建时自动打开server  手动打开 disabled
          generateStatsFile: false, // 是否生成stats.json文件
          statsOptions: { source: false },
        })
      ),
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
      '@redux': path.resolve(__dirname, 'src/redux/'),
      '@models': path.resolve(__dirname, 'src/redux/models/'),
      '@router': path.resolve(__dirname, 'src/router/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    }),
    // addLessLoader(),
    addWebpackModuleRule({
      test: /\.less$/,
      use: [
        produtionMode
          ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './../../',
                // emit: false,
              },
            }
          : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
          },
        },
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
              '@primary-color': '#1DA57A',
            },
            // localIdentName: '[local]--[hash:base64:5]',
          },
        },
      ],
    }),
    (config) => {
      // console.log('config', config)
      // console.log('module', config.module)
      // console.log('rules', config.module.rules[0].oneOf)
      // for (
      //   let index = 0;
      //   index < config.module.rules[0].oneOf.length;
      //   index++
      // ) {
      //   const element = config.module.rules[0].oneOf[index]
      //   console.log('rules element', element)
      // }
      return config
    }
  ),
  devServer: overrideDevServer((config) => {
    // console.log('config', config)
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
