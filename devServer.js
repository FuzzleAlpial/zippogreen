module.exports = function overrideDevServer(config) {
    return {
      ...config,
      allowedHosts: 'all', // This fixes the error
    };
  };
  