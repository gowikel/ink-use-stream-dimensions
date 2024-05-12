# ink-use-stream-dimensions

> React hook to get the columns and rows of a stream (likely stdout) in [Ink](https://github.com/vadimdemedes/ink)

## Install

```
npm install ink-use-stream-dimensions
```

## API

### `useStreamDimensions(stdout: ConsoleStream): [number, number]`

`ConsoleStream` is any type that contais:

- rows as a `number`
- columns as a `number`
- on, handler with signature `(event: "resize", callback: () => void) => void`
- off, handler with signature `(event: "resize", callback: () => void) => void`

(`useStdout` returns the `stdout` object which already has that signature)

It returns the columns and rows, and subscribes to changes to them

## Example

```javascript
import React from 'react'
import { Box, Text, useStdout } from "ink"
import { useStreamDimensions } from "ink-use-stream-dimensions"


function MyApp() {
   const { stdout } = useStdout()
   const [columns, rows] = useStreamDimensions(stdout)

   return (
    <Box>
      <Text>
        {columns}x{rows}
      </Text>
    </Box>
   )
}

export default MyApp
```

## License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.
