const { NODE_ENV } = process.env;

const inProduction = NODE_ENV === 'production';

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-syntax-export-default-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.json', '.svg'],
        alias: {
          '^react-native$': 'react-native-web',
          '@': './src',
        },
      },
    ],
    inProduction && ['transform-remove-console'],
  ].filter(Boolean), // this will filter any falsy plugins (such as removing transform-remove-console when not in production)
};
