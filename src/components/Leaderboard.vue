<template>
    <div class="l-wrapper">
      <div class="c-header">
      </div>
      <div class="l-grid">
        <div class="l-grid__item l-grid__item--sticky">
          <div class="c-card u-bg--light-gradient u-text--dark">
            <div class="c-card__body">
              <div class="u-display--flex u-justify--space-between">
                <div class="u-text--left">
                  <div class="u-text--small">My Rank</div>
                  <h2>3rd Place</h2>
                </div>
                <div class="u-text--right">
                  <div class="u-text--small">My Score</div>
                  <h2>24</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="l-grid__item">
          <div class="c-card">
            <div class="c-card__header">
              <h1>Leaderboard</h1>
              <div class = "score-item">
                <div>Rank</div>
                <div>Name</div>
                <div>Score</div>
            </div>
            <div class="c-card__body">
              <ul class="c-list" id="list" v-if='highscores.length'>
                <li class="c-list__item" v-for="(scoreObj, index) in highscores" :key="scoreObj.highScore" :class="getRankClass(index)">
                  <div> {{ scoreObj.rank }}</div>
                  <div>  {{ scoreObj.name }}</div>
                  <div> {{ scoreObj.highScore }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Leaderboard',
      highscores: [{"name":"DPlayer6", "highScore":120},{"name":"Player6", "highScore":120},{"name":"Player7", "highScore":300},{"name":"Player8", "highScore":12},{"name":"Playeer", "highScore":99},{"name":"Player2", "highScore":88},{"name":"Player3", "highScore":77},{"name":"Player4", "highScore":111},{"name":"Player5", "highScore":55}],
    };
  },
  methods: {
    sortHighscores() {
      this.highscores.sort(((a, b) => {
      const scoreDifference = b.highScore - a.highScore;
      if (scoreDifference !== 0) return scoreDifference;
        return a.name.localeCompare(b.name);
      }));
    },
    calculateRanks() {
      let rank = 1;
      let prevScore = this.highscores[0].highScore;

      for (let i = 0; i < this.highscores.length; i++) {
        if (i > 0 && this.highscores[i].highScore < prevScore) {
          rank++;
        }
        this.highscores[i].rank = rank;
        prevScore = this.highscores[i].highScore;
      }
    },
    getRankClass(index) {
      if (index === 0) return 'first-rank';
      if (index === 1) return 'second-rank';
      if (index === 2) return 'third-rank';
      return '';
    },
    loadHighscoresLocal() {
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
    },
    loadHighscoresRender() {
      const endpoint = 'https://tetris-backend-re5u.onrender.com/highscores';
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
    this.loadHighscoresLocal();
    this.loadHighscoresRender();
    this.sortHighscores();
    this.calculateRanks();
  }
};
</script>

<style>

.score-item {
  display: flex;
  justify-content: space-between;
}

.l-wrapper {
  max-width: 960px;
  margin: auto;
  padding: 20px;
}

.c-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.l-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
}

.c-card {
  position: relative;
  background-color: #252222;
  padding: 30px;
  border-radius: 2px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12);
  max-height: 70vh; /* Adjust this value as needed */
  overflow: auto;
}


.c-card__body {
  display: flex;
  justify-content: space-between;
}

.c-list {
  padding: 0;
  width: 100%
}

.c-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px ;

}

/* Hides scrollbar for Chrome, Safari and Opera */
.c-card::-webkit-scrollbar {
  display: none;
}

/* Hides scrollbar for IE, Edge and Firefox */
.c-card {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.first-rank {
  color: gold;
  font-weight: bold;
}

.second-rank {
  color: silver;
  font-weight: bold;
}

.third-rank {
  color: #cd7f32;
  font-weight: bold;
}
</style>