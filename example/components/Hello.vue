<template>
  <div class="hello">
    <input type="text" v-integer v-model="integer">
  </div>
</template>

<script>
import {integer} from '../../src/directives'

export default {
  directives: {
    integer
  },
  name: 'hello',
  data () {
    return {
      integer: '1'
    }
  },
  methods:{

  }
}
</script>
<style>

</style>
