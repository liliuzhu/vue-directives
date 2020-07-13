<template>
  <div class="integer">
    整数：
    <input type="text" v-integer.cover="integerProp" v-model="integer" @input="input($event)">
    <el-input size="mini" type="text" v-integer.cover="integerProp" v-model="integer" clearable/>
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
      // console.log(n, o)
    }
  },
  methods: {
    input(event) {
      // console.log(1, event)
    }
  }
}
</script>
<style>
.integer {
  width: 200px;
  margin: 0 auto;
}
</style>
