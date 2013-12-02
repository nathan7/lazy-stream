# lazy-stream

  Lazily created streams.

## Installation

    npm install lazy-stream

## API
### LazyStream(opts, Factory)
### LazyStream(Factory)

  Returns a lazy stream.
  It will call `new Factory(opts)` when anyone tries to read from it, and pass data through from the stream returned.

