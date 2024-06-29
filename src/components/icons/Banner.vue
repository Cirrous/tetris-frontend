<script setup lang='ts'>
import { defineProps } from 'vue'

const props = defineProps({
  color: String,
  text: String,
  icon: String
})
</script>

<template>
  <div :style="{ backgroundColor: color }">
    <img :src="icon" alt="Icon" />
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
/* Hier können Sie zusätzliche Styles hinzufügen */
</style>