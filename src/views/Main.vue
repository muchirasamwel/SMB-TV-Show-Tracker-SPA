<template>
    <div class="main">
        <v-snackbar
                v-model="haserror"
                color="red"
                :timeout="3000"
        >
            {{ errors }}
            <v-btn
                    color="red"
                    text
                    @click="haserror = false"
            >
                X
            </v-btn>
        </v-snackbar>
        <v-snackbar
                v-model="hassuccess"
                color="green"
                :timeout="3000"
        >
            {{ success }}
            <v-btn
                    color="green"
                    text
                    @click="hassuccess = false"
            >
                X
            </v-btn>
        </v-snackbar>

        <div id="carousel">
            <v-app>
                <v-carousel
                        cycle
                        height="500"
                        hide-delimiter-background
                        show-arrows-on-hover
                >
                    <v-carousel-item
                            v-for="(slide, i) in slides"
                            :key="i"
                            :src="getImg(slide.image)"
                    >
                        <div class="s-data">
                            <h2 class="s-title">{{slide.title}}</h2>
                            <p class="s-date my-1">{{slide.date}}</p>
                            <p class="s-message">{{slide.description}}</p>
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-app>
        </div>
        <div id="trending">
            <h1>TRENDING</h1>
            <v-card class="w-100">
                <v-tabs
                        background-color="black"
                        center-active
                        dark
                        height="300px"
                        class="w-100"
                >
                    <v-tab class="text-white w-100" v-for="(trend, i) in trending"
                           :key="i">
                        <img :src="getImg(trend.image)" width="100%">
                        <span class="float-right position-absolute font-weight-bold slidename">{{trend.title}}</span>
                        <span class="m-rating">
                                {{trend.rating}}
                        </span>
                    </v-tab>

                </v-tabs>
            </v-card>
        </div>
        <div id="movies">
            <keep-alive>
                <component v-bind:is="component"/>
            </keep-alive>
        </div>
        <div id="foot">
            <div>
                <form @submit.prevent="sendMail" class="subscribe-form bg-secondary">
                    <div class="form-inline d-flex justify-content-center">
                        <label class=" font-weight-bold labelsubscribe">Email</label>
                        <input type="text" placeholder="Your Email " class="form-control inputsubscribe" v-model="email.to">
                        <button class="btn btn-light btnsubscribe">Subscribe</button>
                    </div>
                    <h3 class="text-white">Subscribe To Our News Channel</h3>
                </form>
                <div class="row">
                    <div class="col text-white">
                        <p class="p-0">get Your Latest Show Information Here</p>
                        <p class="py-0">Reach out to SMB Tv Shows</p>
                    </div>
                    <div class="col text-white">

                    </div>
                </div>
            </div>
<!--            <h1>FOOTER and subscribe to news channel</h1>-->

        </div>
    </div>
</template>
<style lang="scss">
    @media (min-width: 600px) {
        .subscribe-form{
            display: inline-block;
            background-color: black;
            margin-top: -25px;
            margin-right: 20px;
            padding: 20px;
            z-index: 4;
            float: right;
        }
    }
    @media (max-width: 600px) {
        .s-data {
            margin-top: 80% !important;
        }
        .inputsubscribe{
            margin: 10px;
        }
    }

    .main {
        background-color: blue;
        text-align: center;
        height: 180vh;

        h1, h2 {
            color: white;
            text-shadow: 2px 2px 3px black;
        }

        #carousel {
            height: 35%;
            overflow: hidden;
        }

        #trending {
            padding-top: 5%;
            height: 32%;
            width: 100%;
            background-color: black;
            overflow-y: hidden;
            overflow-x: auto;

            .v-slide-group__prev, .v-slide-group__next {
                @media (max-width: 600px) {
                    display: none;
                }
            }

            .v-tab--active {
                img {
                    opacity: 1 !important;
                }

                background-color: white !important;
            }

            .v-tab {
                img {
                    opacity: .5;
                }
            }

            .m-rating {
                position: absolute;
                font-weight: bold;
                color: red;
                top: 10px;
                right: 10px;
                background-color: white;
                border: 1px solid black;
                border-radius: 20px;
                padding: 5px;
            }

            .slidename {
                text-shadow: 2px 2px 3px black;
                font-size: 1.2em;
            }
        }

        #movies {
            background-color: wheat;
            height: 60%;
            padding-top: 5%;
            text-align: start;
            overflow-y: scroll;
            overflow-x: initial;
        }

        .s-data {
            background-color: rgba(0, 0, 0, .2);
            margin-top: 25%;

            .s-date {
                color: cyan;
                text-shadow: 2px 2px 3px black;
                font-size: 1.2em;
            }

            .s-message {
                color: white;
                text-shadow: 1px 1px 3px black;

            }
        }
        #foot{

            background-color: black;
            .inputsubscribe{
                border-radius:0px!important;
                border: 2px solid white;
                &:focus ~ .btnsubscribe{
                    background-color: black;
                    border-color: white;
                    color: white;
                }

            }
            .labelsubscribe{
                border-color: white;
                color: white;
                background-color: black;
                border-radius:0px!important;
                border-bottom-left-radius: 25px !important;
                border-top-left-radius: 25px !important;
                border-top:1px solid white!important;
                border-left:1px solid white!important;

                border-bottom:1px solid white!important;
                padding: 6px;
                margin-right: -3px;
                z-index: 4;
            }
            .btnsubscribe{
                border-radius:0px!important;
                border-bottom-right-radius: 25px !important;
                border-top-right-radius: 25px !important;
                margin-left: -3px;
                &:hover{
                    background-color: black;
                    border-color: white;
                    color: white;
                }
            }

        }
    }
</style>
<script>
    import Movies from "./Movies.vue";
    import Movie from "./MovieView.vue";
    import Subcribed from "./Subcribed";
    import $ from "../assets/bootstrap/js/jquery";

    export default {
        name: "Main",
        components: {
            Movies, Movie, Subcribed
        },
        created() {
            Event.shout('navigateUser');
            Event.listen('showmovie', (movie) => {
                this.$store.dispatch('putCurrentMovie', movie);
                this.component = Movie;
            })
            Event.listen('backToTheater', () => {
                this.component = Movies;
            })
            Event.listen('navigateMovies', ($event) => {
                if ($event === 0) {
                    this.component = Movies;
                    $(".active").removeClass('active');
                    $(".movies").addClass('active');
                } else {
                    this.component = Subcribed;
                    $(".active").removeClass('active');
                    $(".subscribed").addClass('active');
                }
            })
            this.$store.dispatch('fetchShows');
            this.$store.dispatch('getLoggedUser');

        },
        data() {
            return {
                hassuccess: false,
                haserror: false,
                component: "Movies",
                showpop: false,
                scrolled: false,
                name: 'Home',
                email:{}
            }
        },
        computed: {
            trending(){
                return this.$store.state.allshows.filter(show => {
                    return (parseFloat(show.rating) > 5.4)
                });
            },
            slides() {
                return this.$store.state.allshows.filter(show => show.status === "hot");
            },
            errors() {
                return this.$store.state.errors;
            },
            success() {
                return this.$store.state.success;
            }
        },
        methods: {
            switchhome: function () {
                // alert("got it");
                if (this.component === Movies) {
                    this.component = Movie;
                } else {
                    this.component = Movies;
                }
            },
            updateStatus() {
                if (this.success) {
                    this.hassuccess = true;
                } else {
                    this.hassuccess = false;
                }
                if (this.errors) {
                    this.haserror = true;
                } else {
                    this.haserror = false;
                }
            },
            getImg(img) {
                return (this.$store.state.path + img);
            },
           async sendMail(){
                this.email.subject="welcome to SMB Tv shows";
                this.email.message="You have successfully Subscribed to SMB news Channel. \n Thank  You.";
                await this.$store.dispatch("subscribeToNews",this.email);
                this.updateStatus();
            }

        },
    }
</script>