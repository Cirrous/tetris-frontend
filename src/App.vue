<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { onMounted } from 'vue'

const authStore = useAuthStore()
onMounted(() => {
  authStore.init()
})
</script>

<template>
  <Navbar></Navbar>
  <header>


    <div class="wrapper">
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
#background{
background-color: #f0f0f0;
}
</style>
