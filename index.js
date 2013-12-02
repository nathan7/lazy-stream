'use strict';
var ReadableStream = require('stream').Readable
  , WritableStream = require('stream').Writable
  , DuplexStream = require('stream').Duplex
  , inherits = require('utils').inherit

function LazyStream(opts, factory) {
  if (typeof opts === 'function') {
    factory = opts
    opts = {}
  }
  this._factory = factory
  this._stream = null
  this._opts = opts
}

function think(lazy) {
  var stream = lazy._stream
  if (stream === null) {
    stream = lazy._stream = new lazy._factory(lazy._opts)
    lazy._factory = null
    lazy._opts = null
    stream.on('error', function(err) {
      lazy.emit('error', err)
    })
    stream.on('end', function() {
      lazy.push(null)
    })
    stream.on('close', function() {
      lazy.emit('close')
    })
  }
  return lazy
}

exports.Readable = LazyReadableStream
inherits(LazyReadableStream, ReadableStream)
function LazyReadableStream(opts, factory) {
  if (!(this instanceof LazyReadableStream))
    return new LazyReadableStream(opts, factory)
  ReadableStream.call(this, opts)
  LazyStream.call(opts, factory)
}

LazyReadableStream.prototype._read = function(size) { var self = this
  think(this).once('readable', function() {
    self.push(this.read(size))
  })
}

exports.Writable = LazyWritableStream
inherits(LazyWritableStream, WritableStream)
function LazyWritableStream(opts, factory) {
  if (!(this instanceof LazyWritableStream))
    return new LazyWritableStream(opts, factory)
  WritableStream.call(this, opts)
  LazyStream.call(opts, factory)
}

LazyWritableStream.prototype._write = function(chunk, encoding, callback) {
  think(this).write(chunk, encoding, callback)
}

exports.Duplex = LazyDuplexStream
inherits(LazyDuplexStream, DuplexStream)
function LazyDuplexStream(opts, factory) {
  if (!(this instanceof LazyDuplexStream))
    return new LazyDuplexStream(opts, factory)
  DuplexStream.call(this, opts)
  LazyStream.call(opts, factory)
}

LazyDuplexStream.prototype._read = LazyReadableStream.prototype._read
LazyDuplexStream.prototype._write = LazyWritableStream.prototype._write
