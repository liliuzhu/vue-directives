import Vue from 'vue'
import {integer} from '@/directives'
// import Integer from 'example/components/Integer'
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

describe('指令 v-integer', () => {
  it('静态状态下失去焦点取整', (done) => {
    const vm = new Vue({
      data: {
        test: '000123.45rt',
        intProp: {}
      },
      directives: {integer},
      template: '<input v-integer="intProp" v-model="test"/>'
    }).$mount()
    trigger(vm.$el, 'blur')
    expect(vm.$el.value).to.equal(vm.test).to.equal('12345')
    setTimeout(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('12345')
      done()
    }, 0)
  })
})
