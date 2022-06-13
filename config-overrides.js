const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
  setWebpackPublicPath,
  // addLessLoader,
  // useEslintRc,
  addWebpackAlias,
  addWebpackModuleRule,
} = require("customize-cra");
const path = require("path");

module.exports = {
  webpack: override(
    setWebpackPublicPath('/'),
    addDecoratorsLegacy(),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      "@image": path.resolve(__dirname, "src/assets/image"),
      "@style": path.resolve(__dirname, "src/assets/style"),
      "@common": path.resolve(__dirname, "src/components/common/"),
      "@layout": path.resolve(__dirname, "src/components/layout/"),
      "@pages": path.resolve(__dirname, "src/components/pages/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    }),
    addWebpackModuleRule({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            // webpack5.0中postcss添加plugins
            postcssOptions: {
              plugins: [require("postcss-preset-env")],
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
    }),
  ),
};
