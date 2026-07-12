/** A one-shot hand-off slot: `set` stores a value, `consume` returns it once and clears it. */
export interface PendingSlot<T> {
  set: (value: T) => void
  consume: () => T | null
}

/**
 * Create a module-level pending slot, used to pass data (e.g. an uploaded
 * file) from a landing page to a workspace route without persisting it.
 */
export function createPendingSlot<T>(): PendingSlot<T> {
  let pending: T | null = null

  return {
    set(value: T) {
      pending = value
    },
    consume() {
      const value = pending
      pending = null
      return value
    },
  }
}
