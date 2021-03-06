import { createContext, useCallback, useContext, useEffect } from 'react'
import mitt, { Emitter, EventType, Handler } from 'mitt'

const globalBus = mitt()
const BusContext = createContext(globalBus)

export const BusProvider: React.FC<{ bus: Emitter }> = ({ bus, children }) => {
  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>
}

export const useBus = () => {
  return useContext(BusContext)
}

export function useBusEmit<T>(eventType: EventType) {
  const bus = useBus()
  return useCallback((event: T) => bus.emit(eventType, event), [bus, eventType])
}

export function useBusEvent<T>(event: EventType, func: Handler<T>) {
  const bus = useBus()
  useEffect(() => {
    bus.on(event, func)
    return () => bus.off(event, func)
  }, [bus, event, func])
}
