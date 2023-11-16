<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Zeinabs Website!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

// css ab hier
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
