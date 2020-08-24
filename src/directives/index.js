/* @license
 目前integer和float两个指令存在bug，当输入的数值大于Number.MAX_SAFE_INTEGER会造成精度丢失的问题
 */
import integer from './integer'
import float from './float'

const directives = [
  integer,
  float
]
const install = Vue => {
  if (install.installed) return
  install.installed = true
  directives.forEach(directive => {
    Vue.directive(directive.name, directive)
  })
}

export {
  install,
  integer,
  float
}
export default {
  install
}
