const webpack = require("webpack");
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const addMyPlugin = (config) => {
  config.plugins.push(
    new webpack.EnvironmentPlugin(["NODE_ENV", "BUILD_TARGET"])
  );
  // config.plugins.push(new BundleAnalyzerPlugin());
  return config;
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
  addMyPlugin
);
