<template>
  <div class='l-wrapper'>
    <div class='c-header'>
    </div>
    <div class='l-grid'>
      <div class='l-grid__item l-grid__item--sticky'>
        <div class='c-card u-bg--light-gradient u-text--dark'>
          <div class='c-card__body'>
            <div class='u-display--flex u-justify--space-between'>
              <div class='u-text--left'>
                <div class='u-text--small'>My Rank</div>
                <h2>#{{getUserRankAndScore().rank}}</h2>
              </div>
              <div class='u-text--right'>
                <div class='u-text--small'>My Score</div>
                <h2>{{getUserRankAndScore().score}}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='l-grid__item'>
        <div class='c-card'>
          <div class='c-card__header'>
            <h1>Leaderboard</h1>
            <div class='score-item'>
              <div>Rank</div>
              <div>Name</div>
              <div>Score</div>
            </div>
            <div class='c-card__body'>
              <ul class='c-list' id='list' v-if='highscores.length'>
                <li class='c-list__item' v-for='(scoreObj, index) in highscores' :key='index'
                    :class='getRankClass(index)'>
                  <div> {{ scoreObj.rank }}</div>
                  <div> {{ scoreObj.name }}</div>
                  <div> {{ scoreObj.highscore }}</div>
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
import axios from 'axios'
import api from '@/api.ts'
import { userData } from '@/stores/AuthStore.ts'


export default {
  data() {
    return {
      name: 'Leaderboard',
      highscores: []
    }
  },
  methods: {
    loadHighscores() {
      api.getScores()
        .then(response => {
          this.highscores = response.data
          this.sortHighscores()
        })
        .catch((error) => console.log(error, 'Fehler beim Laden der Highscores'))
    },

    sortHighscores() {
      this.highscores.sort((a, b) => b.highscore - a.highscore)
      this.highscores.forEach((scoreObj, index) => {
        scoreObj.rank = index + 1
      })
    },
    getRankClass(index) {
      if (index === 0) return 'first-rank'
      if (index === 1) return 'second-rank'
      if (index === 2) return 'third-rank'
      return ''
    },

    getUserRankAndScore() {
      const userScoreObj = this.highscores.find(scoreObj => scoreObj.identifier === userData.identifier);
      return userScoreObj ? { rank: userScoreObj.rank, score: userScoreObj.highscore } : { rank: 'N/A', score: 'N/A' };
    },
  },
  mounted() {
    this.loadHighscores()
  }
}
</script>

<style>

.c-card__header {
  margin-top: -30px;
}
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
  background-color: #0d1117;
  border: 1px solid #30363d;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12);
}


.c-card__body {
  display: flex;
  justify-content: space-between;
  max-height: 60vh; /* Adjust this value as needed */
  overflow: auto;
}

.c-list {
  padding: 0;
  width: 100%
}

.c-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

}

/* Hides scrollbar for Chrome, Safari and Opera */
.c-card__body::-webkit-scrollbar {
  display: none;
}

/* Hides scrollbar for IE, Edge and Firefox */
.c-card__body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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