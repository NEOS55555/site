const path = require('path')
const { override, adjustStyleLoaders, addWebpackAlias } = require("customize-cra");

module.exports = override(
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes("scss")) {
      rule.use.push({
        loader: require.resolve("sass-resources-loader"),
        options: {
          resources: "./src/assets/css/default.scss" //这里是你自己放公共scss变量的路径
        }
      });
    }
  }),
  addWebpackAlias({
    '@': path.resolve('src'),
  }),

);

/*module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve('src'),

	};
  // console.log(config)
  return config;
}*/