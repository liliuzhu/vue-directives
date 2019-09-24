<template>
  <div class="integer">
    整数：
    <input type="text" v-integer v-model="integer">
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
      integer: '1'
    }
  },
  methods: {}
}
</script>
<style>

</style>
