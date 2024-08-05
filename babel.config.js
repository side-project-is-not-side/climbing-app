module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env.local',
        blocklist: null,
        allowlist: null,
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',     
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'], 
        root: ['.'],
        alias: {
          "@app": ["./src/app"],
          "@entities": ["./src/entities"],
          "@features": ["./src/features"],
          "@screens": ["./src/screens"],
          "@shared": ["./src/shared"],
          "@widgets": ["./src/widgets"]
        },
      },
    ],
  ],
};
