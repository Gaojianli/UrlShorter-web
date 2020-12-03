module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [['prismjs', {
    languages: ['json'],
    plugins: ['line-numbers'],
    theme: 'twilight',
    css: true,
  }]],
};
