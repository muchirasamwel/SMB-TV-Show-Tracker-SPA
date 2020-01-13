<template>
    <v-card
            max-width="200px"
            class="mx-auto movie-t"
    >
        <div class="movie-image pt-1" v-bind:style="{height:'230px'}" >
            <v-img
                    :src="getImg(moviedata.mimage)"
                    height="210"
            ></v-img>
        </div>
        <span class="m-rating">
            {{moviedata.mrating}}
        </span>
        <div class="m-info w-100">
            <v-list-item>
                <v-list-item-content class="">
                    <div class="text-end " >
                        <v-list-item-subtitle class="m-info-d ">{{moviedata.mdate}}</v-list-item-subtitle>
                    </div>
                    <v-list-item-title class="headline m-info-d">{{moviedata.mname}}</v-list-item-title>
                    <v-list-item-subtitle class="m-info-d">from {{moviedata.mproducer}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <p class="m-hidden">
                {{moviedata.msynopsis}}.
            </p>
        </div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="black" class="m-show" @click="mShow(moviedata)">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon color="red" class="m-subscribe">
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
<script>
    export default {
        props: {
            moviedata: Object
        },
        computed:{
            image(){
                return this.getImg(this.moviedata.mimage);
            }
        },
        methods: {
            getImg(img) {
                return require('@/assets/images/' + img);
            },
            mShow(movie){
                Event.shout('showmovie',movie)
            }
        }
    }
</script>