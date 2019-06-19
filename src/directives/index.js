/* @license
 需要保留的信息
 */
import integer from './integer'

const directives = [
  integer
]
const install = Vue => {
  if (install.installed) return
  directives.forEach(directive => {
    Vue.directive(directive.name, directive)
  })
}

export {
  install,
  integer
}
export default {
  install
}
