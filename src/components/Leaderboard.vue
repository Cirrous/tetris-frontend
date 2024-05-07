<template>
  <div>
    <h1>Leaderboard</h1>
    <input type="number" v-model="newHighscore" placeholder="Type in your highscore">
    <button @click="addHighscore">Add</button>

    <ul v-if='highscores.length'>
      <li v-for="scoreObj in highscores" :key="scoreObj.highScore">{{ scoreObj.highScore }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Leaderboard',
      highscores: [],
      newHighscore: null
    };
  },
  methods: {
    addHighscore() {
      if (this.newHighscore !== null && !isNaN(this.newHighscore)) {
        this.highscores.push(parseInt(this.newHighscore));
        this.highscores.sort((a, b) => b - a);
        this.newHighscore = null;
      } else {
        alert('Please enter a valid number!');
      }
    },
    loadHighscores() {
      const endpoint = 'http://localhost:8080/highscores';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => data.forEach(scoreObj => {
          this.highscores.push(scoreObj)
        }))
        .catch (error => console.log('error', error));
    }
  },
  mounted() {
    this.loadHighscores();
  }
};
</script>