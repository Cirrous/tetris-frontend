<template>
  <div>
    <h1>Leaderboard</h1>
    <input type="number" v-model="newHighscore" placeholder="Type in your highscore">
    <button @click="addHighscore">Add</button>

    <ul>
      <li v-for="score in highscores" :key="score.id">{{ score }}</li>
    </ul>
  </div>
</template>

<script>
export default ({
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
        .then(data => data.forEach(score => {
          this.highscores.push(score)
        }))
        .catch (error => console.log('error', error));
    }
  },
  mounted() {
    this.loadHighscores();
  }
});
</script>