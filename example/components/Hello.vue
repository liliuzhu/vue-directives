<template>
  <div class="hello">
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
  name: 'hello',
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
