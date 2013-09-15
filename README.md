# lazy-stream

  Lazily created streams.

## Installation

    npm install lazy-stream

## API
### LazyStream(opts, factory)
### LazyStream(factory)

  Returns a lazy stream.
  It will call factory when anyone tries to read from it, and pass data through from the stream returned.

