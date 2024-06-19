import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { ref } from 'vue';
import  api from '@/api';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref({});
  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        const uid = userDetails.uid;
        user.value = { email: userDetails.email, uid };
      } else {
        user.value = {};
      }
    });
  };
  const registerUser = (credentials : any) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        // ..
      });
  };

  const loginUser = (credentials : any) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        //Sending user data to backend
        api.sendLogin(credentials)
          .then(response => console.log(response))
          .catch(error => console.error(error));
        // ...
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('loggedout');
        user.value = {};
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };


  return {
    registerUser,
    loginUser,
    logoutUser,
    init,
    user
  };
});