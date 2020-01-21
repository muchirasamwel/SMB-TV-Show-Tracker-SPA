<template>
    <div class="text-center available-movies px-2">
        <h2 class="text-center">Subscribed Shows</h2>
        <form class="form-inline search float-lg-right inputsearchmovie">
            <input class="form-control mr-sm-2 searchinput" type="search" v-model="searchval" placeholder="Search">
            <v-btn icon class="searchbtn">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </form>
        <v-badge
                bordered
                color="blue"
                icon="mdi-lock"
                :value="hover">
            <v-hover v-model="hover">
                <h2 class="hidden-sm-and-down">
                    <span class="allmovies genre genre-active" @click="movieSearchGenre('All')">All</span>
                    <span class="border-left border-dark mx-2 "></span>
                    <span class="action genre" @click="movieSearchGenre('action')">Action</span><span
                        class="border-left border-dark mx-2 "></span>
                    <span class="romance genre" @click="movieSearchGenre('romance')">Romance</span>
                    <span class="border-left border-dark mx-2 "></span>
                    <span class="sci-fi genre" @click="movieSearchGenre('sci-fi')">Sci-Fi</span>
                    <span class="border-left border-dark mx-2 "></span>
                    <span class="horror genre" @click="movieSearchGenre('horror')">Horror</span>
                </h2>
            </v-hover>
        </v-badge>
        <div class="row text-center">
            <div class="col-lg-2 col-md-3 mx-auto text-center" v-for="movie in movies " :key="movie.id">
                <Movie :moviedata="movie"></Movie>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .genre {
        cursor: pointer;

        &:hover {
            color: black;
        }
    }

    .genre-active {
        color: red !important;
    }
</style>
<script>
    import Movie from '../components/Movie.vue';
    import $ from '../assets/bootstrap/js/jquery.js';

    export default {
        data() {
            return {
                searchval: '',
                searchgenre: '',
                hover: false
            }
        },
        created() {
            this.$store.dispatch("fetchShows");
            this.$store.dispatch('findUsersSubscribed');
        },
        computed: {
            movies() {

                let allshows = Object.assign({}, this.$store.state.allshows);

                let subscribed = Object.assign({}, this.$store.state.subscribedshows);


                let shows = [];
                for (let show in allshows) {
                    for (let sub in subscribed) {
                        if (subscribed[sub].show_id === allshows[show].id) {
                            shows.push(allshows[show]);
                        }
                    }
                }
                if(this.searchval===""&& this.searchgenre==="")
                    return shows;
                else if(this.searchval!=="" && this.searchgenre!==""){
                    return shows.filter(movie => {
                        return ((movie.title.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.description.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.producer.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.casts.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1))&&
                            (movie.genre.toLowerCase().indexOf(this.searchgenre.toLowerCase()) > -1);
                    })
                }
                else if(this.searchval!==""){
                    return shows.filter(movie => {
                        return (movie.title.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.description.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.producer.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.genre.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.casts.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1);
                    })
                }
                else
                {
                    return shows.filter(movie => {
                        return(movie.genre.toLowerCase().indexOf(this.searchgenre.toLowerCase()) > -1);
                    })
                }
            }
        }
        ,
        components: {
            Movie
        },
        methods: {
            getImg(img) {
                return (this.$store.state.path + img);
            },
            movieSearchGenre(genre) {
                $('.genre-active').removeClass("genre-active");
                if (genre === "All") {
                    $('.allmovies').addClass('genre-active');
                    this.searchgenre = '';
                    return;
                }
                this.searchgenre = genre;
                $('.' + genre).addClass('genre-active');

            }
        }
    }
</script>