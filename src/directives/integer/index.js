const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
const dataHandle = (event, input, binding, options) => {
  const inputValue = input.value
  let newValue = null
  if (inputValue.length === 0) {
    newValue = options.reqired ? options.reqireValue : ''
  } // eslint-disable-line
  // else if (inputValue.length === 1) {
  //   newValue = inputValue.replace(/[^0-9]/g, 0)
  // }
  else {
    console.log(inputValue)
    let reg = /^[^1-9-]|(?!^)[^\d]|^0+/g
    if (options.min >= 0) {
      reg = /[^\d]|^0+/g
    }
    newValue = inputValue.replace(reg, '')
    console.log(newValue)
  }
  input.value = newValue.slice(0, Number.isFinite(options.maxLength) ? undefined : options.maxLength)
  trigger(input, 'input')
}
const EVENTS = ['keyup', 'change']

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
    const input = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!input) {
      throw new Error({ message: '该指令只能在input元素或者其父元素使用' })
      return // eslint-disable-line
    }
    input.keyupHandle = event => { // eslint-disable-line
      dataHandle(event, input, binding, options)
    }
    EVENTS.forEach(event => {
      input.addEventListener(event, input.keyupHandle, true)
    })
  },
  unbind (el) {
    const input = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!input) {
      throw new Error({ message: '该指令只能在input元素或者其父元素使用' })
      return // eslint-disable-line
    }
    EVENTS.forEach(event => {
      input.removeEventListener(event, input.keyupHandle, true)
    })
    delete input.keyupHandle
  }
}
