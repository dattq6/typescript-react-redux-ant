const { override, addLessLoader, fixBabelImports } = require("customize-cra");

const rewiredSourceMap = () => (config) => {
  config.devtool = config.mode === "development" ? "source-map" : false;
  return config;
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: {
        "@primary-color": "#0a9b94",
      },
      javascriptEnabled: true,
    },
  }),
  rewiredSourceMap()
);
