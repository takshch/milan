const config = require('config');

const servicesURL = config.get('servicesURL');

if (!servicesURL) {
  throw new Error('servicesURL is not available in config');
}

const {
  peopleSuggestionURL,
  postsURL,
  friendURL,
  feedURL
} = servicesURL;

if (!(peopleSuggestionURL && postsURL && friendURL && feedURL)) {
  throw new Error('services url is not available in config');
}

const ROUTES = [
  {
    url: '/people_suggestions',
    proxy: {
      target: peopleSuggestionURL,
      changeOrigin: true,
      pathRewrite: {
        [`^/people_suggestions`]: '',
      },
    }
  },
  {
    url: '/posts',
    proxy: {
      target: postsURL,
      changeOrigin: true,
      pathRewrite: {
        [`^/posts`]: '',
      },
    }
  },
  {
    url: '/friend_request',
    proxy: {
      target: friendURL,
      changeOrigin: true,
    }
  },
  {
    url: '/friend_requests',
    proxy: {
      target: friendURL,
      changeOrigin: true,
    }
  },
  {
    url: '/feed',
    proxy: {
      target: feedURL,
      changeOrigin: true,
      pathRewrite: {
        [`^/feed`]: '',
      },
    }
  },
]

module.exports = ROUTES;