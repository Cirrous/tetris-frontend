<script setup lang='ts'>
import TheWelcome from '../components/TheWelcome.vue'
import AuthView from '@/components/Login_register.vue'
import Login_register from '@/components/Login_register.vue'
</script>

<template>
  <main>
    <div class='c'>
    <TheWelcome />
    <Login_register />
    </div>
  </main>
</template>

<style>
.c {
  display: flex;
  justify-content: center; /* horizontal zentrieren */
  align-items: center; /* vertikal zentrieren */
  height: 80vh
}
</style>
