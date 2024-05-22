<script setup lang='ts'>

import { RouterLink } from 'vue-router'
</script>

<template>
  <ul>
    <li class='logo'><img alt="Tetris logo" src="/src/components/icons/tetris_logo.png" width="42" height="42" /></li>
    <li class='home'><RouterLink to="/">Home</RouterLink></li>
    <li><RouterLink to="/game">Game</RouterLink></li>
    <li><a href="#about">Shop</a></li>
    <li><a href="#about">Settings</a></li>
  </ul>

</template>

<style scoped>

.logo {
  float: left;
  height: 42px;
  width: 42px;
  margin-down: 300px;

}

.home {
  float: left;
}

ul {
  font-family: Arial, sans-serif;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: black;
}
</style>