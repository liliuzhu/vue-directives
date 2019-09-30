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
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('12345')
      done()
    })
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
      vm.$el.value += '.'
      triggerEvent(vm.$el, 'input')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('123456')
      done()
    })
  })

  it('参数判断-reqired', (done) => {
    const vm = new Vue({
      data: {
        test: '',
        intProp: {}
      },
      directives: {integer},
      template: '<input v-integer.reqired="intProp" v-model="test"/>'
    }).$mount()
    triggerEvent(vm.$el, 'blur')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('0')
      done()
    })
  })

  it('参数判断-reqired', (done) => {
    const vm = new Vue({
      data: {
        test: '',
        intProp: {}
      },
      directives: {integer},
      template: '<input v-integer.reqired="intProp" v-model="test"/>'
    }).$mount()
    triggerEvent(vm.$el, 'blur')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.not.equal('')
      done()
    })
  })
})
