const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://eli5-ai.herokuapp.com/',
      changeOrigin: true,
    })
  );
};