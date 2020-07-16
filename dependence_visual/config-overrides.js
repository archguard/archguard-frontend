const webpack = require("webpack");
const rewireTypescript = require("react-app-rewire-typescript");
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const addMyPlugin = (config, env) => {
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
  addMyPlugin,
  // rewireTypescript
);
