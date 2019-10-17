<template>
  <div class="float">
    浮点数：
    <input type="text" v-float.cover="floatProps" v-model="float">
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
      floatProps: {
        max: 20,
        min: -20,
        toFixed: 3
      }
    }
  },
  methods: {}
}
</script>
<style>

</style>
