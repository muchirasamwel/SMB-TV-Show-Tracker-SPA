<template>

    <v-card
            max-width="200px"
            class="mx-auto movie-t"
    >

        <div class="movie-image pt-1" v-bind:style="{height:'230px'}">
            <v-img
                    :src="getImg(moviedata.image)"
                    height="210"
            ></v-img>
        </div>
        <Warning v-if="warning" @warningComplete="warning=false">
            <template slot="title">
                View Movie
            </template>
            <template slot="quiz">
                Please login To view movie details.
            </template>
        </Warning>
        <span class="m-rating">
            {{moviedata.rating}}
        </span>
        <div class="m-info w-100">
            <v-list-item>
                <v-list-item-content class="">
                    <div class="text-end ">
                        <v-list-item-subtitle class="m-info-d ">{{moviedata.release_date}}</v-list-item-subtitle>
                    </div>
                    <v-list-item-title class="headline m-info-d">{{moviedata.title}}</v-list-item-title>
                    <v-list-item-subtitle class="m-info-d">from {{moviedata.producer}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="black" class="m-show" @click="mShow(moviedata)" title="More about this Show">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon color="red" class="m-subscribe subscribe-heart" v-if="hasRated(moviedata.id)"
                   title="You Rated This Show">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon color="grey" class="m-subscribe normal-heart " title="Please Rate This Show" v-else>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <!--            <v-rating></v-rating>-->
            <!--            <v-btn icon color="white" class="v-rating">-->
            <!--                <v-icon>mdi-star</v-icon>-->
            <!--            </v-btn>-->
            <v-btn icon color="black" class="m-share">
                <v-icon>mdi-share-variant</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<style lang="scss">
    .normal-heart {
        //text-shadow:0px 0px 3px black;
    }
</style>
<script>
    import Warning from "./warning.vue";

    export default {
        components: {
            Warning
        },
        data() {
            return {
                hassuccess: false,
                haserror: false,
                israted: false,
                warning: false,
            }
        },
        props: {
            moviedata: Object
        },
        computed: {
            image() {
                return this.getImg(this.moviedata.image);
            },
            subscribed() {
                return '';
            },
        },
        methods: {
            getImg(img) {
                return (this.$store.state.path + img);
            },
            mShow(movie) {
                if (this.$store.state.loggeduser.name) {
                    this.$store.dispatch('putCurrentMovie', movie);
                    this.$store.dispatch('fetchComments');
                    this.$store.dispatch('findSubscribed', movie);
                    Event.shout('showmovie', movie)
                } else
                    this.warning = true;
            },
            hasRated(showid) {
                this.$store.dispatch('fetchRating', showid).then((status) => {
                    this.israted = status;
                })
                return this.israted;
            }
        }
    }
</script>