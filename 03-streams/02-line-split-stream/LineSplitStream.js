const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.remained = null;
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split(os.EOL);
    if (this.remained && lines.length) {
      lines[0] = this.remained + lines[0];
    }
    this.remained = lines.pop();
    for (const line of lines) {
      this.push(line);
    }
    callback();
  }

  _flush(callback) {
    callback(null, this.remained);
  }
}

module.exports = LineSplitStream;
