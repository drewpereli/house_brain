const morgan = require('morgan');

morgan.token('req-headers', function (req) {
  return JSON.stringify(req.headers);
});

morgan.token('req-body', function (req) {
  return JSON.stringify(req.body);
});

let requestLogger = morgan(':method :url :status :response-time ms \n :req-headers \n Body: :req-body', {
  immediate: true,
  skip(req) {
    return req.method === 'OPTIONS';
  },
});

let responseLogger = morgan(':method :url :status :response-time ms', {
  skip(req) {
    return req.method === 'OPTIONS';
  },
});

module.exports = { requestLogger, responseLogger };
