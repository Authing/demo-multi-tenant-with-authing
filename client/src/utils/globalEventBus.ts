import { DependencyList, useEffect } from 'react'

const EventBus = require('js-event-bus')

export const globalEventBus = new EventBus()

export const useGlobalEventBus = (
  evt: string,
  cb: Function,
  deps: DependencyList = []
) => {
  useEffect(() => {
    globalEventBus.on(evt, cb)
    return () => globalEventBus.detach(evt, cb)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
