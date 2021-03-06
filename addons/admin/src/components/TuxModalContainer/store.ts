export interface Modal {
  id: number
  element: any
  onClose: (result?: any) => void
}

export type State = Array<Modal>

// State.
let state: State = []
let onChangeListener: (() => void) | null = null
let counter = 0

/**
 * Gets the current stack of open modals.
 */
export function getState() {
  return state
}

/**
 * Restore to initial
 */
export function resetState() {
  state = []
  onChangeListener = null
  counter = 0
}

/**
 * Removes a modal from the state.
 */
function removeModal(modalToRemove: Modal) {
  state = state.filter(modal => modal !== modalToRemove)
  if (onChangeListener) {
    onChangeListener()
  }
}

/**
 * Opens a modal.
 */
export function openModal(element: any) {
  return new Promise((resolve, reject) => {
    const id = counter++
    const modal = {
      element,
      id,
      onClose: (result: any) => {
        removeModal(modal)
        resolve(result)
      },
    }
    state = state.concat([modal])

    if (onChangeListener) {
      onChangeListener()
    }
  })
}

/**
 * Registers a modal stack listener. This is a singleton as the
 * modals should only be rendered in one place.
 */
export function setListener(handler: () => void) {
  onChangeListener = handler

  // Dispose function
  return () => {
    if (onChangeListener === handler) {
      onChangeListener = null
    }
  }
}
