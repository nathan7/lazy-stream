'use strict';
var ReadableStream = require('stream').Readable
  , inherits = require('utils').inherit

inherits(LazyStream, ReadableStream)
function LazyStream(opts, factory) {
  if (!(this instanceof LazyStream))
    return new LazyStream(opts, factory)
  if (typeof opts === 'function') {
    factory = opts
    opts = {}
  }
  ReadableStream.call(this, opts)
  this._factory = factory
  this._stream = null
  this._opts = opts
}

LazyStream.prototype._read = function(size) {
  var self = this
    , stream = this._stream
  if (stream === null) {
    stream = this._stream = new this._factory(this._opts)
    this._factory = null
    this._opts = null
  }
  stream.on('readable', function() {
    self.push(stream.read(size))
  })
}
