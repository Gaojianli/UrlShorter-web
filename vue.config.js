module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.md$/,
          use: 'text-loader',
        },
      ],
    },
  },
};
