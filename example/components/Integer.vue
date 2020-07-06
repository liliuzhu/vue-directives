<template>
  <div class="integer">
    整数：
    <input type="text" v-integer.cover="integerProp" v-model.lazy="integer">
    <el-input type="text" v-integer.cover="integerProp" v-model="integer"/>
  </div>
</template>

<script>
import {integer} from '@/directives'
// import {integer} from '*/dist/vue-directives.min'

export default {
  directives: {
    integer
  },
  name: 'integer',
  data() {
    return {
      integer: '1',
      integerProp: {
        min: -20,
        max: 20
      }
    }
  },
  watch: {
    integer(n, o) {
      console.log(n, o)
    }
  },
  methods: {}
}
</script>
<style>

</style>
