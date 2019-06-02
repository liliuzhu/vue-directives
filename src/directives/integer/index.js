const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
const dataHandle = (inputEl, binding, options) => {
  const inputValue = inputEl.value
  let newValue = null
  if (inputValue.length === 0) {
    newValue = options.reqired ? options.reqireValue : ''
  } // eslint-disable-line
  // else if (inputValue.length === 1) {
  //   newValue = inputValue.replace(/[^0-9]/g, 0)
  // }
  else {
    let reg = /^[^1-9-]|(?!^)[^\d]|^0+/g
    if (options.min >= 0) {
      reg = /[^\d]|^0+/g
    }
    newValue = inputValue.replace(reg, '')
  }
  console.log(newValue)
  inputEl.value = newValue.slice(0, Number.isFinite(options.maxLength) ? undefined : options.maxLength)
  trigger(inputEl, 'input')
}
const EVENTS = ['input']

export default {
  name: 'integer',
  // 指令的定义
  bind (el, binding, vnode) { // eslint-disable-line
    const defaultOptions = {
      reqired: false,
      cover: false,
      reqireValue: 0,
      max: Infinity,
      maxLength: Infinity,
      min: -Infinity,
      minWarning: null,
      manWarning: null,
    }
    const options = { ...{}, ...defaultOptions, ...(binding.modifiers || {}), ...(binding.value || {}) }
    const inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!inputEl) {
      throw new Error({ message: '该指令只能在input元素或者其父元素使用' })
      return // eslint-disable-line
    }
    inputEl.keyupHandle = event => { // eslint-disable-line
      event.isTrusted && dataHandle(inputEl, binding, options)
    }
    EVENTS.forEach(event => {
      inputEl.addEventListener(event, inputEl.keyupHandle, true)
    })
  },
  unbind (el) {
    const inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!inputEl) {
      throw new Error({ message: '该指令只能在input元素或者其父元素使用' })
      return // eslint-disable-line
    }
    EVENTS.forEach(event => {
      inputEl.removeEventListener(event, inputEl.keyupHandle, true)
    })
    delete inputEl.keyupHandle
  }
}
