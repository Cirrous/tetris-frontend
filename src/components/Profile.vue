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
       .catch((error) => console.log(error, 'Fehler beim Ändern des Namens'))
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
          <form @submit.prevent="changeUserName">
            <input v-model="newname" type="text" :placeholder="user.name" />
            <button type="submit">Change Name</button>
          </form>
          <p class="mail">{{user.highscore}}</p>
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
.top-container{
  display: flex;
  align-items: center;
}

.middle-container{
  background-color: #eee;
  border-radius: 12px;

}
.middle-container:hover {
  border: 1px solid #5957f9;
}
.dollar-div{
  background-color: #5957f9;
  padding: 12px;
  border-radius: 10px;
}
.round-div{
  border-radius: 50%;
  width: 35px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.dollar{
  font-size: 16px !important;
  color: #5957f9 !important;
  font-weight: bold !important;
}


.current-balance{
  font-size: 15px;
  color: #272727;
  font-weight: bold;
}
.amount{
  color: #5957f9;
  font-size: 16px;
  font-weight: bold;
}
.dollar-sign{
  font-size: 16px;
  color: #272727;
  font-weight: bold;
}

.recent-border{
  border-left: 2px solid #5957f9;
  display: flex;
  align-items: center;

}
.recent-border:hover {
  border-bottom: 1px solid #dee2e6!important;
}

.recent-orders{
  font-size: 16px;
  font-weight: 700;
  color: #5957f9;
  margin-left: 2px;
}

.wishlist{
  font-size: 16px;
  font-weight: 700;
  color: #272727;

}
.wishlist-border:hover{
  border-bottom: 1px solid #dee2e6!important;
}
.fashion-studio{
  font-size: 16px;
  font-weight: 700;
  color: #272727;
}
.fashion-studio-border:hover {
  border-bottom: 1px solid #dee2e6!important;
}
</style>