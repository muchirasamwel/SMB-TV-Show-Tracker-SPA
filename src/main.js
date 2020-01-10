import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuex from 'vuex'
import axios from 'axios';
import ('./assets/bootstrap/js/jquery.js');
import ('./assets/foundation.css')
//import('./assets/bootstrap/js/bootstrap.js');
// import ('./assets/bootstrap/css/bootstrap.css');
Vue.use(Vuex);
Vue.config.productionTip = false;
const store = new Vuex.Store({
  state: {
    loggeduser:{},
    allmovies:[],
    currentmovie:{}
  },
  mutations: {
    setApi: (state, newValue) => {
      state.apiKey = newValue
    },
    setLoggedUser: (state, newValue) => {
      state.loggeduser = newValue
    },
    setCurrentMovie({state},movie)
    {
      state.currentmovie=movie;
    }
  },
  getters: {
    user: function (state) {
      return state.loggeduser;
    },
  }
  , actions: {
    logon({commit}, user){
      console.log(user);
      return new Promise((resolve, reject) => {
        axios({url: 'http://mydbsite:8000/smb_api/accounts/login', data: user, method: 'POST' })
            .then(resp => {
              resolve(resp)
            }).catch(err => {
          console.log(err);
          reject(err)
        })
      })
    },
    fetchMovies({commit,state}){
      axios.get(`http://127.0.0.1:8000/smb_api/accounts`,
          {
            headers: {
              'Content-Type': 'application/json',
              'access-token': state.apiKey},
          })
          .then(response => {
            let resp = response.data;
            console.log(resp);
            if (resp === "Failed to authenticate token."||resp === 'No token Provided') {
              state.allmovies = [];
            } else {
              //console.log('auth success');
              state.allmovies = resp;
            }
          })
          .catch(e => {
            console.log(e);
            state.allmovies = [];
          })
    },
    setUser({commit, state}, newValue){
      commit('setLoggedUser', newValue)
      return state.loggeduser
    },
    getCurrentMovie({state}){
      return state.currentmovie;
    },
    putCurrentMovie({commit, state},movie)
    {
      commit('setCurrentMovie', movie)
      return state.currentmovie;
    },
    subscribeMovie({state}, movie){
      return new Promise((resolve, reject) => {
        //create an object to send data to db api

        axios({url: 'http://mydbsite:8000/subcribemovie', data: movie, method: 'POST' })
            .then(resp => {
              resolve(resp)
            }).catch(err => {
          console.log(err);
          reject(err)
        })
      })
    },
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
