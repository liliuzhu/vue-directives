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

  it('参数判断-required', (done) => {
    const vm = new Vue({
      data: {
        test: '',
        intProp: {}
      },
      directives: {integer},
      template: '<input v-integer.required="intProp" v-model="test"/>'
    }).$mount()
    triggerEvent(vm.$el, 'blur')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('0')
      done()
    })
  })

  it('参数判断-cover-max-tipFun-min', (done) => {
    const vm = new Vue({
      data: {
        test: '',
        intProp: {
          max: 20,
          min: -20,
          tipFun: () => {
            console.log('最大值不能超过±20')
          }
        }
      },
      directives: {integer},
      template: '<input v-integer.cover="intProp" v-model="test"/>'
    }).$mount()
    vm.$el.value += '6'
    triggerEvent(vm.$el, 'input')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('6')
      vm.$el.value += '8R'
      triggerEvent(vm.$el, 'blur')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('20')
      vm.$el.value = '-38R'
      triggerEvent(vm.$el, 'blur')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('-20')
      done()
    })
  })
})
