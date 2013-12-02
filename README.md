# lazy-stream

  Lazily created streams.

## Installation

    npm install lazy-stream

## API
### lazyStream.Readable(opts, Factory)
### lazyStream.Readable(Factory)
### lazyStream.Writable(opts, Factory)
### lazyStream.Writable(Factory)
### lazyStream.Duplex(opts, Factory)
### lazyStream.Duplex(Factory)

  Returns a lazy stream.
  It will call `new Factory(opts)` when anyone tries to read from it, and pass data through from the stream returned.

