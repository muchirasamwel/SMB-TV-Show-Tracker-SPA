<template>
    <div class="main">
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
                            :src="getImg(slide.mimage)"
                    >
                        <div class="s-data">
                            <h2 class="s-title">{{slide.mname}}</h2>
                            <p class="s-date my-1">{{slide.mdate}}</p>
                            <p class="s-message">{{slide.mdescription}}</p>
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
                    <v-tab class="text-white w-100" v-for="(slide, i) in slides"
                           :key="i">
                        <img :src="getImg(slide.mimage)" width="100%">
                        <span class="float-right position-absolute font-weight-bold slidename">{{slide.mname}}</span>
                        <span class="m-rating">
                                {{slide.mrating}}
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
                <form action="" class="subscribe-form bg-secondary">
                    <div class="form-inline d-flex justify-content-center">
                        <label class=" font-weight-bold labelsubscribe">Email</label>
                        <input type="text" placeholder="Your Email " class="form-control inputsubscribe">
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

    export default {
        name: "Main",
        components: {
            Movies, Movie
        },
        created() {
            Event.listen('showmovie', (movie) => {
                this.$store.dispatch('putCurrentMovie', movie);
                // alert("You want the movie" + id);
                this.component = Movie;
            })
            Event.listen('backToTheater', () => {
                this.component = Movies;
            })
            Event.listen('navigateMovies', ($event) => {
                if ($event == 0) {
                    this.component = Movies;
                } else
                    this.component = Movie;
            })
        },
        data() {
            return {
                component: "Movies",
                showpop: false,
                scrolled: false,
                name: 'Home',
            }
        },
        computed: {
            slides() {
                return this.$store.state.latestmovies;
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
            getImg(img) {
                return require('@/assets/images/' + img);
            },

        },
    }
</script>