'use strict';

const {resolve} = require('path');
const merge = require('webpack-merge');

function css(config, {absSrc}) {
  const inlineStyles = resolve(absSrc, 'styles.scss');

  return merge.smart(config, {
    module: {
      rules: [
        {
          include: absSrc,
          exclude: inlineStyles,
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                camelCase: 'only',
                // _rstd_ - ugly hack for reset styles
                localIdentName: '_rstd_[folder]_[local]_[hash:base64:4]',
                sourceMap: true,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [absSrc],
              },
            },
          ],
        }, {
          test: inlineStyles,
          use: [
            'raw-loader',
            'extract-loader',
            {
              loader: 'css-loader',
              options: {
                'import': false,
                modules: false,
                importLoaders: 2,
                sourceMap: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [absSrc],
              },
            },
          ],
        }, {
          exclude: absSrc,
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {sourceMap: true},
            },
          ],
        },
      ],
    },
  });
}

module.exports = css;
