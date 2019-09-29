export {nextTick} from './next-tick'
export {microInMacro} from './microAndMacro'

export const triggerEvent = (el, name) => {
  let eventName = ''
  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const e = document.createEvent(eventName)
  e.initEvent(name, true, true)
  el.dispatchEvent ? el.dispatchEvent(e) : el.fireEvent('on' + name, e)
}
