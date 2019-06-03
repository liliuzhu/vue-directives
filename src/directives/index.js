import integer from './integer'

const directives = [
  integer
]
const install = Vue => {
  directives.forEach(directive => {
    Vue.directive(directive.name, directive)
  })
}

export {
  integer
}
export default {
  install,
  integer
}