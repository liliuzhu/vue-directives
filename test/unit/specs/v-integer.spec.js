import Vue from 'vue'
import {integer} from '@/directives'
import {triggerEvent, microInMacro} from '@/utils'

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
    triggerEvent(vm.$el, 'blur')
    setTimeout(() => {
      console.log()
      expect(vm.$el.value).to.equal(vm.test).to.equal('12345')
      done()
    }, 0)
  })

  it('输入下动态取整', (done) => {
    const vm = new Vue({
      data: {
        test: '000123.45rt',
        intProp: {}
      },
      directives: {integer},
      template: '<input v-integer="intProp" v-model="test"/>'
    }).$mount()
    vm.$el.value += '6'
    triggerEvent(vm.$el, 'input')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('123456')
      vm.$el.value += 'r'
      triggerEvent(vm.$el, 'input')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.not.equal('123456r')
      done()
    })
  })
})
