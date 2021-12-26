const withPWA = require('next-pwa');

module.exports = withPWA({
  pageExtensions: ["page.tsx"],
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});
