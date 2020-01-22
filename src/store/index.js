import Vue from 'vue'
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import header from "vuetify/lib/components/VDataTable/mixins/header";
import $ from "jquery";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        searchval: "",
        thismovierated: false,
        path: 'http://showdb.ms/images/',
        mailer:'http://showdb.ms/Notification/sendNotification.php',
        bulkmailer:'http://showdb.ms/Notification/bulkNotify.php',
        subscribed: false,
        loggeduser: {},
        pathtodb:'http://showdb.ms/database/',
        allshows: [],
        subscribedshows: [],
        currentcomments: [],
        allusers: [],
        errors: '',
        success: '',
        newssubscriptions: [],
        showsubscriptions: [],
        currentmovie: {}
    },
    mutations: {
        setLoggedUser: (state, newValue) => {
            state.loggeduser = newValue
        },
        setAllShows(state, shows) {
            state.allshows = shows;
        },
        setSubscribedShows(state, shows) {
            state.subscribedshows = shows;
        },
        setAllUsers(state, users) {
            state.allusers = users;
        },
        setCurrentComments(state, comments) {
            state.currentcomments = comments;
        },
        setCurrentMovie(state, movie) {
            state.currentmovie = movie;
        },
        setSubscribed(state, newval) {
            state.subscribed = newval;
        },
        setNewsSubscriptions(state, newdata) {
            state.newssubscriptions = newdata;
        },
        setShowSubscriptions(state, newdata) {
            state.showsubscriptions = newdata;
        },
        setError(state, error) {
            state.errors = error;
        },
        setSuccess(state, success) {
            state.success = success;
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
        getLoggedUser: ({commit, state}) => {
            let user = decodeURIComponent(document.cookie);
            user = user.replace("currentLanguage=en; ", "")
            user = JSON.parse(user);
            commit('setLoggedUser', user);

        },
        logout: ({commit}) => {
            document.cookie = "{}"
        },
        login: ({commit, state}, user) => {
            const users = Object.assign({}, user);
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: users, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        if (resp.data !== "no results") {
                            commit('setLoggedUser', resp.data[0]);
                            document.cookie = JSON.stringify(resp.data[0]);
                            commit('setSuccess', 'Login Successful');
                            //router.currentRoute=router.go(0);
                            router.replace("/");
                            commit('setSuccess', '');
                            commit('setError', '');
                        } else {
                            commit('setSuccess', '');
                            commit('setError', 'These credentials does not match any of our records');
                        }
                        resolve(resp)
                    }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    reject(err)
                })
            })
        },
        signUp: ({commit,state}, user) => {
            const users = Object.assign({}, user);
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: users, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        //  console.log(resp);
                        resolve(resp);
                        if (resp.data.indexOf('success') >= 0) {
                            users.role = "user";
                            commit('setLoggedUser', users);
                            commit('setSuccess', 'Registration Successful');
                        } else {
                            commit('setError', 'Account Creation Error');
                            commit('setSuccess', '');

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        actOnShow: ({commit,state}, show) => {
            const newshow = Object.assign({}, show);
            if (newshow.action !== "del") {
                newshow.casts = newshow.casts.join(', ');
                newshow.genre = newshow.genre.join(', ');
            }
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: newshow, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        resolve(resp);
                        if (resp.data.indexOf('success') >= 0) {
                            if (newshow.action === 'ins')
                                commit('setSuccess', 'Show "' + newshow.title + '" added Successfully');
                            else if (newshow.action === 'up')
                                commit('setSuccess', 'Show "' + newshow.title + '" updated Successfully');
                            else
                                commit('setSuccess', 'Show "' + newshow.title + '" Deleted Successfully');

                        } else {
                            let err = resp.data;
                            console.log(resp.data)
                            if (err.indexOf('Duplicate entry ') >= 0)
                                commit('setError', 'This Show ' + newshow.title + ' Alreasy Exists');
                            else
                                commit('setError', 'An Error Occurred');
                            commit('setSuccess', '');

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        actOnUser: ({commit,state}, user) => {
            const newuser = Object.assign({}, user);
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: newuser, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        resolve(resp);
                        if (resp.data.indexOf('success') >= 0) {
                            if (newuser.action === 'up')
                                commit('setSuccess', 'User "' + newuser.name + '" updated Successfully');
                            else
                                commit('setSuccess', 'User "' + newuser.name + '" Deleted Successfully');

                        } else {
                            console.log(resp.data)
                            commit('setSuccess', '');

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        actOnSubscriptions: ({commit,state}, subscription) => {
            const newsubscription = Object.assign({}, subscription);
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: newsubscription, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        resolve(resp);
                        if (resp.data.indexOf('success') >= 0) {
                            if (newsubscription.show_id)
                                commit('setSuccess', 'Subscription to show "' + newsubscription.show_id + '" deleted Successfully');
                            else
                                commit('setSuccess', 'News Subscription for "' + newsubscription.email + '" deleted Successfully');
                        } else {
                            console.log(resp.data)
                            commit('setSuccess', '');

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        uploadImage: ({commit,state}, imagefile) => {
            let data = new FormData();
            data.append('image', imagefile);

            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'uploader.php',
                    data: data, method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(resp => {
                        resolve(resp);
                        console.log(resp.data)
                        if (resp.data.indexOf('success') >= 0) {
                            commit('setSuccess', 'file Uploaded');
                        } else {
                            commit('setError', 'upload Error');
                            commit('setSuccess', '');

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        fetchShows: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'/master.php',
                    data: {'table': 'shows', 'action': 'sel'}, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        // console.log(resp.data);
                        if (resp.data !== "no results") {
                            commit('setAllShows', resp.data);
                        } else {
                            commit('setError', 'No Shows Created Yet');
                        }
                        resolve(resp)
                    }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    reject(err)
                })
            })
        },
        async fetchShow({commit, state}, id) {
            return await axios({
                url: state.pathtodb+'master.php',
                data: {'table': 'shows', 'action': 'sel', 'id': id}, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    // console.log(resp.data);
                    if (resp.data !== "no results") {
                        commit('setCurrentMovie', resp.data[0]);
                        return resp.data[0];
                    }
                    return [];
                }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    return [];
                })
        },
        async fetchRating({commit, state}, id) {
            return await axios({
                url: state.pathtodb+'master.php',
                data: {
                    'table': 'ratings',
                    'action': 'sel',
                    'show_id': id,
                    'user_id': state.loggeduser.id
                }, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    return resp.data !== "no results";
                }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    return false;
                })
        },
        async fetchUsers({commit, state}) {
            return await axios({
                url: state.pathtodb+'master.php',
                data: {'table': 'users', 'action': 'sel'}, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    // console.log(resp.data);
                    if (resp.data !== "no results") {
                        commit('setAllUsers', resp.data);
                        return resp.data;
                    } else {
                        commit('setError', 'No Users Found');
                        return [];
                    }
                }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    return [];
                })
        },
        fetchNewsSubscriptions: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: {'table': 'newssubscription', 'action': 'sel'}, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        // console.log(resp.data);
                        if (resp.data !== "no results") {
                            commit('setNewsSubscriptions', resp.data);
                        } else {
                            commit('setError', 'No News Subscription Records Found');
                        }
                        resolve(resp)
                    }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    reject(err)
                })
            })
        },
        fetchShowSubscriptions: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: {'table': 'showsubscriptions', 'action': 'sel'}, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        // console.log(resp.data);
                        if (resp.data !== "no results") {
                            commit('setShowSubscriptions', resp.data);
                        } else {
                            commit('setError', 'No Show Subcription Records Found');
                        }
                        resolve(resp)
                    }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    reject(err)
                })
            })
        },
        async findUsersSubscribed({commit, state}) {
            //alert(show.title);
            return await axios({
                url: state.pathtodb+'master.php',
                data: {
                    'table': 'showsubscriptions',
                    'action': 'sel',
                    'user_id': state.loggeduser.id
                }, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    //  console.log(resp.data)
                    if (resp.data !== "no results") {
                        commit('setSubscribedShows', resp.data);
                    } else {
                        commit('setSubscribedShows', []);

                        return false;
                    }
                }).catch(err => {
                    console.log(err);
                    commit('setSubscribedShows', []);
                    return false;
                })
        },
        async findSubscribed({commit, state}, show) {
            //alert(show.title);
            return await axios({
                url: state.pathtodb+'master.php',
                data: {
                    'table': 'showsubscriptions',
                    'action': 'sel',
                    'show_id': show.id,
                    'user_id': state.loggeduser.id
                }, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    //  console.log(resp.data)
                    if (resp.data !== "no results") {
                        commit('setSubscribed', true);
                        return true;
                    } else {
                        commit('setSubscribed', false);

                        return false;
                    }
                }).catch(err => {
                    console.log(err);
                    commit('setSubscribed', false);
                    return false;
                })
        },
        putCurrentMovie: ({commit}, movie) => {
            commit('setCurrentMovie', movie);
        },
        async subscribeToShow ({state, commit}, show){
            let hassubscribed=false;
            let now=new Date().toLocaleString();
            let sendmail =  await axios({
                    url: state.pathtodb+'master.php',
                    data: {
                        'show_id': show.id,
                        'user_id': state.loggeduser.id,
                        'email': state.loggeduser.email,
                        'const': +state.loggeduser.id + "-" + show.id,
                        'created_at': new Date().toLocaleString(),
                        'table': 'showsubscriptions',
                        'action': 'ins'
                    },
                    method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(resp => {
                    resolve(resp);
                    if (resp.data.indexOf('success') >= 0) {
                        hassubscribed = true;
                        commit('setSubscribed', true);
                        commit('setSuccess', 'You have successfully subscribed to the Show ' + show.title);
                    } else {
                        if (resp.data.indexOf('Duplicate ') >= 0)
                            commit('setError', 'You have already subscribed to the show');
                        commit('setError', 'Error during subscription');
                        console.log(resp.data);
                    }
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            if(hassubscribed)
            return  await axios({
                url: state.mailer,
                data: {
                    'to': loggeduser.email,
                    'subject': "Subscribed To Show "+show.id,
                    'message': "You have subscribed to the show "+show.title+" at "+now,
                },
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(resp => {
                console.log(resp.data);
            }).catch(err => {
                console.log(err);
            })
        },
        unsubscribeFromShow: ({state, commit}, show) => {
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: {
                        'show_id': show.id,
                        'user_id': state.loggeduser.id,
                        'table': 'showsubscriptions',
                        'action': 'del'
                    },
                    method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(resp => {
                    resolve(resp);
                    if (resp.data.indexOf('success') >= 0) {
                        commit('setSubscribed', false);
                        commit('setSuccess', 'You have successfully unsubscribed from the Show ' + show.title);
                    } else {
                        commit('setError', 'Error during subscription');
                        console.log(resp.data);
                    }
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        async subscribeToNews({state, commit}, email) {
            const emaildata = Object.assign({}, email);
            let hassubscribed = false;
            let sendmail = await axios({
                url: state.pathtodb+'master.php',
                data: {
                    'email': email.to,
                    'table': "newssubscription",
                    'action': "ins",
                    'created_at': new Date().toLocaleString(),

                },
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(resp => {
                if (resp.data.indexOf('success') >= 0) {
                    //commit('setSuccess', ' Subscription done Check Your Email To Confirm ');
                } else {
                    hassubscribed = true;
                    if (resp.data.indexOf('Duplicate ') >= 0) {
                        commit('setError', 'This email has already subscribed. Thank You');
                    } else
                        commit('setError', 'Error during subscription');
                    console.log(resp.data);
                }
            }).catch(err => {
                hassubscribed = true;
                console.log(err);
            })
            if (!hassubscribed)
                return await axios({
                    url: state.mailer,
                    data: emaildata,
                    method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(resp => {
                    if (resp.data.indexOf('success') >= 0) {
                        commit('setSuccess', ' Subscription done Check Your Email To Confirm ');
                    } else {
                        commit('setError', 'Error during subscription');
                        console.log(resp.data);
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        recordRating: ({commit, state}, rating) => {
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: {
                        "user_id": state.loggeduser.id,
                        "show_id": state.currentmovie.id,
                        "rating": rating,
                        "table": 'ratings',
                        "action": 'ins',
                    }, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        //  console.log(resp);
                        resolve(resp);
                        if (resp.data.indexOf('success') >= 0) {
                            console.log('Rating captured successfully')
                        } else {
                            console.log("unexpected error");
                            console.log(resp.data)

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        addComment: ({commit, state}, comment) => {
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: {
                        "user_id": state.loggeduser.id,
                        "show_id": state.currentmovie.id,
                        "comment": comment,
                        "created_at": new Date().toLocaleString(),
                        "table": 'comments',
                        "action": 'ins',
                    }, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        resolve(resp);
                        if (resp.data.indexOf('success') >= 0) {
                            console.log('Comment captured successfully')
                        } else {
                            if (resp.data.indexOf('Duplicate entry ') >= 0) {
                                commit("setError", "This comment already exists");
                            }
                            console.log("unexpected error");
                            console.log(resp.data)

                        }
                    }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        },
        async bulkMailTo({state, commit},payload) {
            return axios({
                url: state.bulkmailer,
                data:payload,
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    // console.log(resp.data.indexOf('Successfully') >= 0);
                    if (resp.data.indexOf('Successfully') >= 0) {
                        commit("setSuccess","Emails sent succesfully");
                    } else {
                        commit("setSuccess", '');
                        commit("setError", 'Mails Sending hand errors');
                        console.log(resp.data);
                    }
                }).catch(err => {
                    console.log(err);
                    commit("setSuccess", '');
                    commit("setError", 'Mails Sending hand errors');
                })
        },
        async fetchComments({state, commit}) {
            return axios({
                url: state.pathtodb+'master.php',
                data: {
                    "show_id": state.currentmovie.id,
                    "table": 'comments',
                    "action": 'sel',
                }, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {

                    if (resp.data !== "no results") {
                        commit("setCurrentComments", resp.data);
                        return resp.data;
                    } else {
                        commit("setCurrentComments", []);
                        return [];
                    }
                }).catch(err => {
                    console.log(err);
                    commit("setCurrentComments", []);
                    return [];
                })
        },
        async fetchUser({state, commit}, id) {
            return await axios({
                url: state.pathtodb+'master.php',
                data: {
                    "id": id,
                    "table": 'users',
                    "action": 'sel',
                }, method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(resp => {
                    //  console.log(resp);
                    if (resp.data !== "no results") {
                        return resp.data[0];
                    } else {

                        console.log("unexpected error");
                        return {}
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        rateMovie: ({state, commit}, rating) => {
            //  console.log(state.searchedshow);
            let id = state.currentmovie.id;
            let total_rating = parseInt(state.currentmovie.total_rating) + rating;
            let total_users = parseInt(state.currentmovie.total_raters) + 1;
            let newrating = total_rating / total_users;
            newrating = newrating.toFixed(1);
            //console.log(newrating);
            return new Promise((resolve, reject) => {
                axios({
                    url: state.pathtodb+'master.php',
                    data: {
                        'table': 'shows',
                        'action': 'up',
                        'id': id,
                        'rating': newrating,
                        'total_raters': total_users,
                        'total_rating': total_rating
                    }, method: 'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(resp => {
                        if (resp.data.indexOf('success') >= 0) {
                            commit('setSuccess', "Show Rating successful");
                        } else {
                            commit('setError', 'Unexpected error occurred in rating');
                            console.log(resp.data);
                        }
                        resolve(resp)
                    }).catch(err => {
                    commit('setError', 'Unexpected Error occurred');
                    console.log(err);
                    reject(err)
                })
            })
        },

    }

});