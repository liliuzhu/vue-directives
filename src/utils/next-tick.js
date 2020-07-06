/* globals MutationObserver */

const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
const timerFunc = () => {
  setTimeout(flushCallbacks, 0)
}

export function nextTick (cb) {
  callbacks.push(() => {
    if (cb) {
      try {
        cb()
      } catch (e) {
        console.error(e.message)
      }
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}
