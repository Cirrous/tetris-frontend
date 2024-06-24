import axios from 'axios'

const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

const apiClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
})

interface ScoreData {
  identifier: string
  highscore: number
  name: string

}

export default {
  getRoot() {
    return apiClient.get('/')
  },
  sendLogin(user: { identifier: string }) { // Sendet ein post req an backend, um neuen user zu speichern
    return apiClient.post('/login', user)          // daten werden als Parameter übergeben und müssen dem newUser-Interface entsprechen.
  },

  newHighscore(identifier: string, highscore: number){
    return apiClient.post('/newhighscore', {identifier, highscore})
  },

  getScores() {                 // Ruft die Liste aller Scores vom Backend ab. Diese Methode gibt ein Array von ScoreResponse zurück,
    return apiClient.get<ScoreData[]>('/highscores') // basierend auf scoreResponse-Interface

  },
  getData(identifier: string) {
    return apiClient.get<ScoreData>(`/highscores/${identifier}`)
  }
}