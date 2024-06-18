<script setup lang='ts'>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar></Navbar>
  <header>


    <div class='wrapper'>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

#background {
  background-color: #f0f0f0;
}
</style>
