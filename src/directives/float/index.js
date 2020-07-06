import {triggerEvent, nextTick} from '@/utils'

const addZero = (number = 0) => { // 添加0
  let num = Number.parseInt(number)
  if (num <= 0) return ''
  let arr = []
  while (num--) {
    arr.push('0')
  }
  return arr.join('')
}
const handleFixed = (string = '', toFixed = 0) => { // 去除多余小数, value 要处理的数， num 需要保留的小数位
  // const string = `${value}`
  if (!string || toFixed < 0) return string
  const tempArray = string.split('.')
  tempArray[1] = tempArray[1] || ''
  if (tempArray[1].length < toFixed) {
    tempArray[1] += addZero(toFixed - tempArray[1].length)
  } else if (tempArray[1].length > toFixed) {
    tempArray[1] = tempArray[1].slice(0, toFixed)
  }
  return tempArray.join('.')
}

const dataHandle = (event, inputEl, binding, vnode, options) => {
  const inputValue = inputEl.value
  let newValue = null
  if (inputValue.length === 0) {
    newValue = options.required ? options.requireValue : ''
  } else {
    const reg = /^[^\d-]|(?!^)[^\d.]/g // 不符合整数的字符
    const reg2 = /^([-]?)([0]+)([\d]+[.]?[\d]?)/g // 开头有0时
    const reg3 = /[.]{2,}/g // 多个相连的.
    newValue = inputValue.replace(reg, '').replace(reg3, '.').replace(reg2, '$1$3') || '0'
    const tempArray = newValue.split('.')
    newValue = tempArray.slice(0, 2).join('.') + tempArray.slice(2).join('')
  }

  if ((Number.isFinite(options.max) || Number.isFinite(options.min)) && newValue) {
    if ((Number.MAX_SAFE_INTEGER && newValue > Number.MAX_SAFE_INTEGER) || (Number.MIN_SAFE_INTEGER && newValue < Number.MIN_SAFE_INTEGER)) {
      console.warn(`提示：输入值超过±${Number.MAX_SAFE_INTEGER}，无法精确表示这个值`)
    }
    options.warningEvents.indexOf(event.type) > -1 && (newValue > options.max || newValue < options.min) && options.tipFun && options.tipFun()
    if (options.cover && options.coverEvents.indexOf(event.type) > -1) {
      newValue = (Number.isFinite(options.max) && newValue > options.max) ? options.max : (Number.isFinite(options.min) && newValue < options.min) ? options.min : newValue
    }
  }
  newValue = `${newValue}`
  if (options.toFixedEvents.indexOf(event.type) > -1) {
    newValue = handleFixed(newValue, options.toFixed)
  }
  if (inputValue === newValue) return

  nextTick(() => {
    inputEl.value = newValue
    triggerEvent(inputEl, 'input')
  })
}
const EVENTS = ['input', 'blur']

export default {
  name: 'float',
  // 指令的定义
  bind(el, binding, vnode) { // eslint-disable-line
    const defaultOptions = {
      required: false, // 是否必填
      cover: false, // 超出范围是否覆盖
      requireValue: '0', // 为空时的必填值
      max: Infinity, // 最大值
      // maxFigures: Infinity, // 最大位数
      toFixed: -1, // 小数位数,为负数时不限
      min: -Infinity, // 最小值
      coverEvents: ['blur'], // 覆盖时机   ['blur', 'input']
      warningEvents: ['blur'], // 提示时机  ['blur', 'input']
      toFixedEvents: ['blur'], // 计算小数位的时机  ['blur']
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
