module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}]
  ],
  // This is our new translator for modern JavaScript
  plugins: ['@babel/plugin-transform-modules-commonjs']
};