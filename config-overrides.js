const {
  override,
  addWebpackAlias,
  addLessLoader,
  addPostcssPlugins,
  addWebpackModuleRule,
} = require("customize-cra");
const path = require("path");

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
    }),
    addWebpackModuleRule({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'postcss-loader',
              options: { 
                postcssOptions:{ 
                  plugins: [ require('postcss-preset-env') ] 
                }
              }
            }
        ]
    }),
    addPostcssPlugins(),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        // Optionally adjust URLs to be relative. When false, URLs are already relative to the entry less file.
        relativeUrls: false,
        modifyVars: { '@primary-color': '#A80000' },
        // cssModules: {
        //   // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
        //   localIdentName: "[path][name]__[local]--[hash:base64:5]",
        // }
      }
    })
  ),
}

