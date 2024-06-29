<script setup lang='ts'>
import TheWelcome from '../components/TheWelcome.vue'
import AuthView from '@/components/Login_register.vue'
import Login_register from '@/components/Login_register.vue'
</script>

<template>
  <main>
    <div class='c'>
    <TheWelcome />
      <div id = "space"> </div>
    </div>
  </main>
</template>

<style>
.c {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

#space {
  margin: 0px 30px 0px 30px;
}
</style>
