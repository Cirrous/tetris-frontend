import axios from 'axios';
const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

interface ScoreData {
 email: string;
  id: number;
  name: string;
  highscore: number;
}

interface newUser {
  email: string;
  password: string;
  id: number;
  name: string;
  highscore: number;
}

const apiClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getRoot() {
    return apiClient.get('/');
  },
  postScore(scoreData: ScoreData) { // Sendet ein post req an backend, um neuen score zu speichern
    return apiClient.post('/newhighscore', scoreData);          // daten werden als Parameter übergeben und müssen dem ScoreData-Interface entsprechen.
  },
  getScores() {                 // Ruft die Liste aller Scores vom Backend ab. Diese Methode gibt ein Array von ScoreResponse zurück,
    return apiClient.get<ScoreData[]>('/highscores'); // basierend auf scoreResponse-Interface

  }
};