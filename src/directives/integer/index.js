const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
let timer = null
const dataHandle = (event, inputEl, binding, vnode, options) => {
  const inputValue = inputEl.value
  let newValue = null
  if (inputValue.length === 0) {
    newValue = options.reqired ? options.reqireValue : ''
  } else {
    const reg = /^[^\d-]|(?!^)[^\d]/g
    // if (options.min >= 0) {
    //   reg = /[^\d]/g
    // }
    newValue = inputValue.replace(reg, '')
  }
  newValue = newValue && Number(newValue)
  console.log(newValue)
  newValue !== '' && options.warningEvents.includes(event.type) && (newValue > options.max || newValue < options.min) && options.tipFun && options.tipFun()
  if (newValue !== '' && options.cover && options.coverEvents.includes(event.type)) {
    newValue = (Number.isFinite(options.max) && newValue > options.max) ? options.max : (Number.isFinite(options.min) && newValue < options.min) ? options.min : newValue
  }
  const maxFigures = !Number.isFinite(options.maxFigures) ? undefined : newValue < 0 ? options.maxFigures + 1 : options.maxFigures
  newValue = newValue.toString().slice(0, maxFigures)
  timer = setTimeout(() => {
    inputEl.value = newValue
    trigger(inputEl, 'input')
    clearTimeout(timer)
    timer = null
  }, 0)
}
const EVENTS = ['input', 'blur']

export default {
  name: 'integer',
  // 指令的定义
  bind (el, binding, vnode) { // eslint-disable-line
    const defaultOptions = {
      reqired: false, // 是否必填
      cover: false, // 超出范围是否覆盖
      reqireValue: '0', // 为空时的必填值
      max: Infinity, // 最大值
      maxFigures: Infinity, // 最大位数
      min: -Infinity, // 最小值
      coverEvents: ['blur'], // 覆盖时机   ['blur', 'input']
      warningEvents: ['blur'], // 提示时机  ['blur', 'input']
      tipFun: null, // 溢出触发提示fn
    }
    const options = { ...{}, ...defaultOptions, ...(binding.modifiers || {}), ...(binding.value || {}) }
    console.log(options)
    const inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!inputEl) {
      throw new Error({ message: '该指令只能在input元素或者其父元素使用' })
      return // eslint-disable-line
    }
    inputEl.keyupHandle = event => { // eslint-disable-line
      // event.isTrusted 事件是否可信，通过createEvent，initEvent的事件不可信
      event.isTrusted && dataHandle(event, inputEl, binding, vnode, options)
    }
    EVENTS.forEach(event => {
      inputEl.addEventListener(event, inputEl.keyupHandle, false)
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
