module.exports = {
  rewrites() {
    return {
      beforeFiles: [
        // if the host is `app.acme.com`,
        // this rewrite will be applied
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'nye.hidde.me',
            },
          ],
          destination: '/nye/:path*',
        },
         {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'nye.dev.hidde.me',
            },
          ],
          destination: '/nye/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'nye.localhost:3000',
            },
          ],
          destination: '/nye/:path*',
        },
      ]
    }
  }
}
