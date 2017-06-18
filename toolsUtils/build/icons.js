'use strict';

const merge = require('webpack-merge');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

function misc(config, {absSrc}) {
  return merge.smart(config, {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: absSrc,
          options: {
            extract: true,
            spriteFilename: 'icons.svg',
          },
        },
      ],
    },
    plugins: [new SpriteLoaderPlugin()],
  });
}

module.exports = misc;
