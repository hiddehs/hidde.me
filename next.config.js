module.exports = {
  redirects () {
    return [
      {
        source: '/:path((?!nye).*)',
        permanent: false,
        has: [
          {
            type: 'host',
            value: 'nye.localhost',
          },
        ],
        destination: '/nye',
      },
      {
        source: '/:path((?!nye).*)',
        permanent: false,
        has: [
          {
            type: 'host',
            value: 'nye.dev.hidde.dev',
          },
        ],
        destination: '/nye',
      },
      {
        source: '/:path((?!nye).*)',
        permanent: false,
        has: [
          {
            type: 'host',
            value: 'nye.hidde.me',
          },
        ],
        destination: '/nye',
      },
    ]
  },
}
