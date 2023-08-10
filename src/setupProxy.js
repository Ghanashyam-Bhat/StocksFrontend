const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://2b02-14-142-151-66.ngrok-free.app',
      changeOrigin: true,
    })
  );
};
