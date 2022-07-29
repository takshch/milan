// port for http request
const PORT = 80;

const baseURL = '';

const serviceURL = (port) => {
  return `${baseURL}:${port}`;
};

const config = {
  port: PORT,
  baseURL: baseURL,
  servicesURL: {
    peopleSuggestionURL: serviceURL(3001),
    postsURL: serviceURL(3002),
    friendURL: serviceURL(3003),
    feedURL: serviceURL(3004),
  },
};

module.exports = config;