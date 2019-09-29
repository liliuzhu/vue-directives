import {triggerEvent, nextTick} from '@/utils'

const dataHandle = (event, inputEl, binding, vnode, options) => {
  const inputValue = inputEl.value
  let newValue = null
  if (inputValue.length === 0) {
    newValue = options.reqired ? options.reqireValue : ''
  } else {
    const reg = /^[^\d-]|(?!^)[^\d]/g // 不符合整数的字符
    const reg2 = /^([-]?)[0]+/g // 开头有0时
    newValue = inputValue.replace(reg, '').replace(reg2, '$1') || '0'
  }

  if ((Number.isFinite(options.max) || Number.isFinite(options.min)) && newValue) {
    newValue = Number(newValue)
    if ((Number.MAX_SAFE_INTEGER && newValue > Number.MAX_SAFE_INTEGER) || (Number.MIN_SAFE_INTEGER && newValue < Number.MIN_SAFE_INTEGER)) {
      console.warn(`提示：输入值超过±${Number.MAX_SAFE_INTEGER}，无法精确表示这个值`)
    }
    options.warningEvents.indexOf(event.type) > -1 && (newValue > options.max || newValue < options.min) && options.tipFun && options.tipFun()
    if (options.cover && options.coverEvents.indexOf(event.type) > -1) {
      newValue = (Number.isFinite(options.max) && newValue > options.max) ? options.max : (Number.isFinite(options.min) && newValue < options.min) ? options.min : newValue
    }
  }
  newValue = `${newValue}`
  if (inputValue === newValue) return

  nextTick(() => {
    inputEl.value = newValue
    triggerEvent(inputEl, 'input')
  })
}
const EVENTS = ['input', 'blur']

export default {
  name: 'integer',
  // 指令的定义
  bind(el, binding, vnode) { // eslint-disable-line
    const defaultOptions = {
      reqired: false, // 是否必填
      cover: false, // 超出范围是否覆盖
      reqireValue: '0', // 为空时的必填值
      max: Infinity, // 最大值
      min: -Infinity, // 最小值
      coverEvents: ['blur'], // 覆盖时机   ['blur', 'input']
      warningEvents: ['blur'], // 提示时机  ['blur', 'input']
      tipFun: null // 溢出触发提示fn
    }
    const options = {...{}, ...defaultOptions, ...(binding.modifiers || {}), ...(binding.value || {})}
    const inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!inputEl) {
      throw new Error('该指令只能在input元素或者其父元素使用')
      return // eslint-disable-line
    }
    inputEl.keyupHandle = event => { // eslint-disable-line
      // event.isTrusted 事件是否可信，通过createEvent，initEvent的事件不可信
      dataHandle(event, inputEl, binding, vnode, options)
    }
    EVENTS.forEach(event => {
      inputEl.addEventListener(event, inputEl.keyupHandle, false)
    })
  },
  unbind(el) {
    const inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
    if (!inputEl) {
      throw new Error('该指令只能在input元素或者其父元素使用')
      return // eslint-disable-line
    }
    EVENTS.forEach(event => {
      inputEl.removeEventListener(event, inputEl.keyupHandle, true)
    })
    delete inputEl.keyupHandle
  }
}
