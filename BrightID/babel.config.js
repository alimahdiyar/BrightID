const { NODE_ENV } = process.env;

const inProduction = NODE_ENV === 'production';

module.exports = {
  presets: [
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    ['@babel/preset-env', { modules: false }],
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ['react-native-web', { commonjs: true }],
    'babel-plugin-flow-to-typescript',
    '@babel/plugin-transform-modules-commonjs',
    'add-module-exports',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
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
