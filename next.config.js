const withPWA = require('next-pwa');

module.exports = withPWA({
  pageExtensions: ["page.tsx"],
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
});
