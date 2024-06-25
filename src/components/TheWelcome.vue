<script setup lang='ts'>

import { RouterLink } from 'vue-router'
</script>

<template>
  <div class='cont'>
    <div class='card'>
      <h1>Welcome to Tetris!</h1>
      <div>
        <h4>By Christian Raisch</h4>
        <RouterLink to='/game' id='game-button'>Start Game</RouterLink>
      </div>
      <h5>Login to save your highscore and compete angainst others</h5>
    </div>
  </div>
</template>

<style>

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10vh;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 15px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12);
}

#game-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #19751d;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

#game-button:hover {
  background-color: #45a049;
}

.cont {
  display: flex;
  justify-content: center; /* horizontal zentrieren */
  align-items: center; /* vertikal zentrieren */
  height: 80vh
}

h5 {
  margin-top: 54px;
}
</style>
