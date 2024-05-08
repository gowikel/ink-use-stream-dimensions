import React from "react"
import test from "ava"
import { render } from "ink-testing-library"
import { useStreamDimensions } from "./index.js"
import type { ConsoleStream } from "./index.js"
import { act } from "@testing-library/react"
import sinon from "sinon"

type Instance = {
  unmount: () => void
}

function setup(stdout: ConsoleStream): [[number, number], Instance] {
  const dimensions: [number, number] = [0, 0]

  function Wrapper() {
    const result = useStreamDimensions(stdout)
    dimensions.splice(0, dimensions.length, ...result)
    return null
  }

  const component = render(<Wrapper />)

  return [dimensions, component]
}

test("it gets the right columns and rows", (t) => {
  const mockedStdout = {
    columns: 12,
    rows: 34,
    on: sinon.fake(),
    off: sinon.fake(),
  }

  const [result] = setup(mockedStdout)

  t.deepEqual(result, [12, 34])
})

test("it subscribes to changes", (t) => {
  const mockedStdout = {
    columns: 12,
    rows: 34,
    on: sinon.fake(),
    off: sinon.fake(),
  }

  act(() => {
    setup(mockedStdout)
  })

  t.true(mockedStdout.on.calledOnce, "It should subscribe to changes")
})

test("it cleans the stream subscription", (t) => {
  const mockedStdout = {
    columns: 12,
    rows: 34,
    on: sinon.fake(),
    off: sinon.fake(),
  }
  let component: Instance | null = null

  act(() => {
    ;[, component] = setup(mockedStdout)
  })

  act(() => {
    component!.unmount()
  })

  t.true(mockedStdout.off.calledOnce, "It should remove the event on unmount")
})
