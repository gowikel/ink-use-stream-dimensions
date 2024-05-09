import { useLayoutEffect, useState } from "react"

export type ConsoleStream = {
  columns: number
  rows: number
  on: (event: "resize", callback: () => void) => void
  off: (event: "resize", callback: () => void) => void
}

export function useStreamDimensions(stdout: ConsoleStream): [number, number] {
  const [dimensions, setDimensions] = useState<[number, number]>([
    stdout.columns,
    stdout.rows,
  ])

  useLayoutEffect(() => {
    const handler = () => {
      setDimensions([stdout.columns, stdout.rows])
    }

    stdout.on("resize", handler)
    return () => {
      stdout.off("resize", handler)
    }
  }, [stdout])

  return dimensions
}
