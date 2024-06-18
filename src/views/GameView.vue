<template>
  <div>
    <Game></Game>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import Game from '@/components/Game.vue'

export default {
  name: 'game-view',
  components: {
    Game
  }
}

</script>
