module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env.development',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }],
    'react-native-reanimated/plugin',
  ],
};
