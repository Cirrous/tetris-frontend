<template>
  <div class = "form">
    <form @submit.prevent="onSubmit">
      <div class="card auth-form, logout-button-container">
        <div class="card-content">
          <button class="button is-danger, logout-button" @click.prevent="onLogout">Logout</button>
          <div class="title has-text-centered">{{ formTitle }}</div>
          <div class="content">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Email Address" v-model="credentials.email" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="Password"
                  placeholder="Enter Password"
                  v-model="credentials.password"
                />
              </div>
            </div>

            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button class="button is-danger">{{ formTitle }}</button>
              </p>
            </div>
          </div>
          <div class="tabs">
            <ul>
              <li :class="{ 'is-active': !register }"><a @click.prevent="register = false">Login </a></li>
              <li > <a>|</a></li>
              <li :class="{ 'is-active': register }"><a @click.prevent="register = true">Register</a></li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '../stores/AuthStore.ts';

const register = ref(false);

const authStore = useAuthStore();

const credentials = reactive({
  email: '',
  password: ''
});

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login';
});

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter email and password');
    return;

  }

  if (register.value) {
    authStore.registerUser(credentials);
  } else {
    authStore.loginUser(credentials);
  }
};
const onLogout = () => {
  authStore.logoutUser();
};
</script>


<style>

li {
  display: inline;
  margin-right: 10px;
}
li:hover {
  text-decoration: underline;
  cursor: pointer;
}

.tabs {
  margin-top: 20px;
}

.card {
  background-color: #0d1117;
  color: #c9d1d9;
}



.button {
  background-color: #19751d;
  color: #c9d1d9;
}

.button:hover {
  background-color: #45a049;
}

.logout-button-container {
  position: relative;
}

.logout-button {
  position: absolute;
  top: 10px;
  left: 10px;
}

.title {
  font-size: 2em; /* Adjust this value to your preference */
  padding-bottom: 30px;
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

div.card button.button {
  border-radius: 5px;
}

</style>