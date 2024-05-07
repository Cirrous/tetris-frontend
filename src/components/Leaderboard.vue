<template>
  <div>
    <h1>Leaderboard</h1>
    <input type="number" v-model="newHighscore" placeholder="Type in your highscore">
    <button @click="addHighscore">Add</button>

    <ul>
      <li v-for="(score, index) in highscores" :key="index">{{ score }}</li>
    </ul>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      highscores: [1000, 800, 600, 400, 200], // Beispiel-Highscore-Liste
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
      const endpoint = 'https://localhost:8080/highscores';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          this.highscores = data;
        })
        .catch (error => console.log('error', error));
    }
  },
  mounted() {
    this.loadHighscores();
  }
});
</script>