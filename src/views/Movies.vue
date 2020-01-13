<template>
    <div class="text-center available-movies px-2">
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
                    :value="hover"

            >
                <v-hover v-model="hover" >
                <h2 class="hidden-sm-and-down">
                    <span class="allmovies genre genre-active" @click="movieSearchGenre('All')">All</span>
                    <span class="border-left border-dark mx-2 "></span>
                    <span class="action genre" @click="movieSearchGenre('action')">Action</span><span class="border-left border-dark mx-2 "></span>
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
    .genre{
        cursor: pointer;
        &:hover{
            color: black;
        }
    }
    .genre-active{
        color: red !important;
    }

</style>
<script>
    import Movie from '../components/Movie.vue';
    import $ from '../assets/bootstrap/js/jquery.js';
    export default {
        data() {
            return {
                searchval:'',
                searchgenre:'',
                hover:false
            }
        },
        created() {

        },
        computed:{
            movies(){
                if(this.searchval===""&& this.searchgenre==="")
                    return this.$store.state.allmovies;
                else if(this.searchval!=="" && this.searchgenre!==""){
                    return this.$store.state.allmovies.filter(movie => {
                        return ((movie.mname.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mdescription.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mproducer.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mcasts.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1))&&
                            (movie.mgenre.toLowerCase().indexOf(this.searchgenre.toLowerCase()) > -1);
                    })
                }
                else if(this.searchval!==""){
                    return this.$store.state.allmovies.filter(movie => {
                        return (movie.mname.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mdescription.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mproducer.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mgenre.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1)||
                            (movie.mcasts.toLowerCase().indexOf(this.searchval.toLowerCase()) > -1);
                    })
                }
                else
                {
                    return this.$store.state.allmovies.filter(movie => {
                        return(movie.mgenre.toLowerCase().indexOf(this.searchgenre.toLowerCase()) > -1);
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
                return require('@/assets/images/' + img);
            },
            movieSearchGenre(genre){
                $('.genre-active').removeClass("genre-active");
                if(genre==="All"){
                    $('.allmovies').addClass('genre-active');
                    this.searchgenre='';
                    return;
                }
                this.searchgenre=genre;
                $('.'+genre).addClass('genre-active');

            }
        }
    }
</script>