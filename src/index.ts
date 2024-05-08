import { useEffect, useState } from "react"

export type ConsoleStream = {
  columns: number
  rows: number
  on: (event: "resize", cb: () => void) => void
  off: (event: "resize", cb: () => void) => void
}

export function useStreamDimensions(stdout: ConsoleStream): [number, number] {
  const [dimensions, setDimensions] = useState<[number, number]>([
    stdout.columns,
    stdout.rows,
  ])

  useEffect(() => {
    const handler = () => setDimensions([stdout.columns, stdout.rows])

    stdout.on("resize", handler)
    return () => {
      stdout.off("resize", handler)
    }
  }, [stdout])

  return dimensions
}
