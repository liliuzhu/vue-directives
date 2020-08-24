<template>
  <div class="float">
    浮点数：
    <input type="number" v-float.cover="{min:0, max: parseFloat(float2) || 9999, toFixed:2}" v-model="float">
    <input type="number" v-float.cover="{min: parseFloat(float), max:9999, toFixed:2}" v-model="float2">
  </div>
</template>

<script>
import {float} from '@/directives'
// import {integer} from '*/dist/vue-directives.min'

export default {
  directives: {
    float
  },
  name: 'float',
  data() {
    return {
      float: '1.3',
      float2: '1.3',
      floatProps: {
        max: 20,
        min: -20,
        toFixed: 2
      }
    }
  },
  methods: {}
}
</script>
<style>

</style>
