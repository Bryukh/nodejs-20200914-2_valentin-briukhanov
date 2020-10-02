const { doesNotMatch } = require('assert');
const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

DEFAULT_LIMIT = 2 ** 16;

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    if (typeof(this.limit) == 'undefined') {
      this.limit = DEFAULT_LIMIT;
    }
    this.bytesTransfered = 0;
  }

  _transform(chunk, encoding, callback) {
    this.bytesTransfered += chunk.length;
    let data; let error;
    if (this.bytesTransfered > this.limit) {
      error = new LimitExceededError();
    } else {
      data = chunk;
    }
    callback(error, data);
  }
}

module.exports = LimitSizeStream;
