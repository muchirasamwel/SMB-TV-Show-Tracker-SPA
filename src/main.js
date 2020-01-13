import $ from './assets/bootstrap/js/jquery.js';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuex from 'vuex'
import axios from 'axios';

//import ('./assets/foundation.css')
import('./assets/bootstrap/js/bootstrap.js');
import ('./assets/bootstrap/css/bootstrap.css');
Vue.use(Vuex);
Vue.config.productionTip = false;
function searchMovie(){
    let txt= $(this).text();
    $(".available-movies").children().each(function(){
        let content=$(this).text();
        if(content.indexOf(txt)==-1)
        {
            $(this).hide();
        }
        else
        {
            $(this).show();
        }
    });
}
window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    shout(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback)
    }
};
const store = new Vuex.Store({
    state: {
        searchval:"",
        loggeduser: {},
        latestmovies: [
            {
                mimage: 'bootcamp.jpg',
                mname: "King Kong",
                mdate: "Dec 21 2019",
                mdescription: ' A group gets lost in the jungle',
                mrating: '6.1'
            },
            {
                mimage: 'field.jpg',
                mname: "Jungle Danger",
                mdate: "Dec 05 2019",
                mdescription: ' Experince the jungle',
                mrating: '6.1'
            },
            {
                mimage: 'dream.jpg',
                mname: "Sleep Beauty",
                mdate: "August 16 2019",
                mdescription: ' Love story that will give you chills',
                mrating: '6.1'
            },
            {
                mimage: 'code back.jpeg',
                mname: "Black Coder",
                mdate: "Jan 02 2020",
                mdescription: ' Take programing to the next level',
                mrating: '6.1'
            },
            {mimage: 'peace.jpg',
                mname: "Feel Happy",
                mdate: "Nov 11 2019",
                mdescription: ' Laugh your shit out ',
                mrating: '6.1'}
        ],
        allmovies: [{
            id: '1',
            mgenre:'Horror,Fantasy,Action',
            mcasts:'Jack paow, Joy Mendi, Gend firtson, Marie Pop',
            mimage: 'bootcamp.jpg',
            mname: "King Kong",
            mdate: "Dec 21 2019",
            mdescription: ' A group gets lost in the jungle',
            msynopsis: 'Some things are too slow',
            mproducer: 'SMB',
            mrating: '6.1'
        }, {
            id: '3',
            mgenre:'Romance,Fantasy',
            mcasts:'Jack paow, Joy Mendi, Gend firtson, Marie Pop',
            mimage: 'dream.jpg',
            mname: "Sleep Beauty",
            mdate: "August 16 2019",
            mdescription: ' Love story that will give you chills',
            msynopsis: 'Some things are too slow',
            mproducer: 'SMB',
            mrating: '4.7'
        }, {
            id: '2',
            mgenre:'Fantasy',
            mcasts:'Jack paow, Joy Mendi, Gend firtson, Marie Pop',
            mimage: 'code back.jpeg',
            mname: "Black Coder Backers parker",
            mdate: "Jan 02 2020",
            mdescription: ' Take programing to the next level',
            msynopsis: 'Some things are too slow',
            mproducer: 'SMB',
            mrating: '8.0'
        }, {
            id: '4',
            mgenre:'Romance,Fantasy',
            mcasts:'Jack paow, Joy Mendi, Gend firtson, Marie Pop',
            mimage: 'peace.jpg',
            mname: "Feel Happy",
            mdate: "Nov 11 2019",
            mdescription: ' Laugh your shit out ',
            msynopsis: 'Some things are too slow',
            mproducer: 'SMB',
            mrating: '4.5'
        } ,{
            id: '5',
            mgenre:'Horror,Action',
            mcasts:'Jack ,  Mendi, Gend dung, Marie Pop',
            mimage: 'code back.jpeg',
            mname: "Do the Thing",
            mdate: "Nov 11 2019",
            mdescription: ' Boom Its Done',
            msynopsis: 'Some things are too slow',
            mproducer: 'SMB',
            mrating: '4.5'
        }
        ],
        currentmovie: {}
    },
    mutations: {
        setApi: (state, newValue) => {
            state.apiKey = newValue
        },
        setLoggedUser: (state, newValue) => {
            state.loggeduser = newValue
        },
        setCurrentMovie(state, movie) {
            state.currentmovie = movie;
        }
    },
    getters: {
        user: function (state) {
            return state.loggeduser;
        },
        getMovies: function (state) {
            return state.allmovies;
        }
    }
    , actions: {
        logon:({commit}, user) =>{
            console.log(user);
            return new Promise((resolve, reject) => {
                axios({url: 'http://mydbsite:8000/smb_api/accounts/login', data: user, method: 'POST'})
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        fetchMovies:({commit, state})=> {
            axios.get(`http://127.0.0.1:8000/smb_api/accounts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': state.apiKey
                    },
                })
                .then(response => {
                    let resp = response.data;
                    console.log(resp);
                    if (resp === "Failed to authenticate token." || resp === 'No token Provided') {
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
        setUser:({commit, state}, newValue) =>{
            commit('setLoggedUser', newValue)
            return state.loggeduser
        },
        putCurrentMovie:({commit, state}, movie)=> {
            commit('setCurrentMovie', movie)
            return state.currentmovie;
        },
        subscribeMovie:({state}, movie)=> {
            return new Promise((resolve, reject) => {
                //create an object to send data to db api

                axios({url: 'http://mydbsite:8000/subcribemovie', data: movie, method: 'POST'})
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        rateMovie:(state, movie, rating) =>{
            return new Promise((resolve, reject) => {
                //create an object to send data to db api

                axios({url: 'http://mydbsite:8000/subcribemovie', data: movie, method: 'POST'})
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
