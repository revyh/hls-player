'use strict';

module.exports = {
  moduleNameMapper: {'\\.(css|scss)$': 'identity-obj-proxy'},
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  modulePaths: ['<rootDir>/src'],
  roots: ['<rootDir>/src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  clearMocks: true,
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/toolsUtils/stubFileByName.js',
  },
  setupFiles: [require.resolve('core-js')],
};
