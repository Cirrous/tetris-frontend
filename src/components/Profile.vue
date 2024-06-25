<script>
 import {  userData } from '@/stores/AuthStore.ts'
 import api from '@/api.ts'

 export default {
   data() {
     return {
       name: 'Profile',
       user: [],
       newname: ''
     }
   },
   methods: {
     loadUser() {
       api.getData(userData.identifier)
         .then(response => {
           this.user = response.data
           this.newname = this.user.name
         })
         .catch((error) => console.log(error, 'Fehler beim Laden der Nutzerdaten'))
     },

   changeUserName() {
     api.newName(userData.identifier, this.newname)
       .then(response => {
         console.log(response)
       })
       .catch((error) => console.log(error, 'Fehler beim ändern des Namens'))
   }
 },

   mounted() {
     this.loadUser()
   }
 }
</script>

<template>
  <div class="container d-flex justify-content-center mt-5">

    <div class="card">

      <div class="top-container">

        <div class="ml-3">
          <h2>Username</h2>
          <form @submit.prevent="changeUserName" class='form'>
            <input v-model="newname" type="text" :placeholder="user.name"  class='input' />
            <button type="submit" class='button'>Change Name</button>
          </form>
          <h2>Highscore</h2>
          <p  class = "form">{{user.highscore}}</p>
        </div>
      </div>



      </div>

    </div>

</template>

<style scoped>
.card{
  background-color: #0d1117;
  width: 280px;
  border-radius: 33px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 2rem !important;
}

.form{
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  background-color: #161b22;
  color: white;
}

.button {
  background-color: #19751d;;
  border: none;
  color: #c9d1d9;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #45a049;
}
.input {
  font-size: 1rem;
  display: flex;
  background-color: #161b22;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  width: 90%;
  margin-bottom: 0.5rem;
}
</style>