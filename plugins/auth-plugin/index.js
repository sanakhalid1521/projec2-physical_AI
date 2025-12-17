// @ts-check

const path = require('path');

module.exports = function (context) {
  const { siteDir } = context;

  return {
    name: 'docusaurus-plugin-better-auth',

    getPathsToWatch() {
      return [];
    },

    async contentLoaded({ content, actions }) {
      // This plugin is primarily for authentication integration
      // Actual auth logic will be handled in pages
    },

    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            '@auth': path.resolve(__dirname, './src/auth'),
          },
        },
      };
    },
  };
};