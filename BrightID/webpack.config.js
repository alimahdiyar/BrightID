const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require("path");

const aliasForWeb = ([folder]) => path.resolve(`./src/.web-aliases/${folder}`);

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  const webAliases = {
    "react-native" /* import to override */: aliasForWeb`react-native` /* the path within the alias folder */
  };
  Object.assign(config.resolve.alias, webAliases);

  config.module.rules.push({
    test: /\.(js|tsx?)$/,
    /**
     * You can exclude the exclude property if you don't want to keep adding individual node_modules
     * just keep an eye on how it effects your build times, for this example it's negligible */
    // exclude: /node_modules[/\\](?!@react-navigation|react-native-gesture-handler|react-native-screens)/,
    use: {
      loader: "babel-loader"
    }
  });
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "svg-url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  });
  return config;
};
