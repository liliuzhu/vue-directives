<template>
  <div class="integer">
    整数：
    <input type="text" v-integer.cover="integerProp" v-model="integer" @input="input($event)">
    <el-input size="mini" type="text" v-integer.cover="integerProp" v-model="integer" clearable/>

    <input type="text" v-integer.cover="{min: 0, max: parseFloat(integer2 || 9999)}" v-model="integer"/>
    -
    <input type="text" v-integer.cover="{min: parseFloat(integer || 0), max: 9999 }" v-model="integer2"/>
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
      integer: '',
      integer2: '',
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
  width: 400px;
  margin: 0 auto;
}
</style>
