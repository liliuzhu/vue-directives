import Vue from 'vue'
import {float} from '@/directives'
import {triggerEvent, microInMacro} from '@/utils'

describe('指令 v-float', () => {
  it('静态状态下失去焦点取整', (done) => {
    const vm = new Vue({
      data: {
        test: '000123.45rt',
        intProp: {}
      },
      directives: {float},
      template: '<input v-float="intProp" v-model="test"/>'
    }).$mount()
    triggerEvent(vm.$el, 'blur')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('123.45')
      done()
    })
  })

  it('输入下动态取整', (done) => {
    const vm = new Vue({
      data: {
        test: '000123.45rt',
        intProp: {}
      },
      directives: {float},
      template: '<input v-float="intProp" v-model="test"/>'
    }).$mount()
    vm.$el.value += '6'
    triggerEvent(vm.$el, 'input')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('123.456')
      vm.$el.value += 'r'
      triggerEvent(vm.$el, 'input')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.not.equal('123.456r')
      vm.$el.value += '.'
      triggerEvent(vm.$el, 'input')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('123.456')
      done()
    })
  })

  it('参数判断-required-toFixed', (done) => {
    const vm = new Vue({
      data: {
        test: '',
        intProp: {toFixed: 2}
      },
      directives: {float},
      template: '<input v-float.required="intProp" v-model="test"/>'
    }).$mount()
    triggerEvent(vm.$el, 'blur')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('0.00')
      vm.$el.value = '2'
      triggerEvent(vm.$el, 'blur')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('2.00')
      done()
    })
  })

  it('参数判断-cover-max-tipFun-min-toFixed', (done) => {
    const vm = new Vue({
      data: {
        test: '',
        intProp: {
          max: 20,
          min: -20,
          toFixed: 3,
          tipFun: () => {
            console.log('最大值不能超过±20')
          }
        }
      },
      directives: {float},
      template: '<input v-float.cover="intProp" v-model="test"/>'
    }).$mount()
    vm.$el.value += '6'
    triggerEvent(vm.$el, 'input')
    microInMacro().then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('6')
      vm.$el.value += '8.'
      triggerEvent(vm.$el, 'input')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('68.')
      vm.$el.value += '8'
      triggerEvent(vm.$el, 'blur')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('20.000')
      vm.$el.value = '-38R'
      triggerEvent(vm.$el, 'blur')
      return microInMacro()
    }).then(() => {
      expect(vm.$el.value).to.equal(vm.test).to.equal('-20.000')
      done()
    })
  })
})
