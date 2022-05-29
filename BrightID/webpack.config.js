module.exports = {
  // ...the rest of your config

  module: {
    rules: [{
      test: /\.(js|ts|tsx?)$/,
      // exclude: /node_modules[/\\](?!@react-navigation|react-native-gesture-handler|react-native-screens)/,
      use: {
        loader: "babel-loader"
      }
    }],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    }
  }
}