<script setup lang="ts">

import { RouterLink } from 'vue-router'
</script>

<template>
  <div class='welcome'>
 <h1>Welcome to Tetris!</h1>
    <div>
  <h4>By Christian Raisch</h4><RouterLink to="/game" id='game-button'>Start new Game</RouterLink>
  </div>
  </div>

</template>

<style>
.welcome {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}



#game-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
}

#game-button:hover {
  background-color: #45a049;
}
</style>
