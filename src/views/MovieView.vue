<template>
    <div class="movie-details">
        <button class="font-weight-bolder btn btn-danger float-right py-1" @click="backTheater">X</button>
        <h1 class="text-center">{{movie.mname}} Details</h1>
        <div class="row">
            <div class="col-md-6 m-image-section overflow-x-hidden">
                <img :src="getImg(movie.mimage)" alt="" height="100%">
            </div>
            <div class="col-md-6 ">
                <span class="headin">Title</span>
                <h2 class="m-title">{{movie.mname}}</h2>
                <div><span class="headin">Release Date : </span><span class="m-casts">{{movie.mdate}}</span>
                </div>
                <div><span class="headin">Genre : </span><span class="m-casts">{{stripeValue(movie.mgenre)}}</span>
                </div>
                <div><span class="headin">Casts : </span><span class="m-casts">{{stripeValue(movie.mcasts)}}</span>
                </div>
                <div><span class="headin">Producer : </span> <span class="m-producer">{{movie.mproducer}}</span></div>
                <div><span class="headin">Description : </span> <span
                        class="m-description">{{movie.mdescription}}</span></div>
                <div><span class="headin">Rating : </span> <span class="m-rating">{{movie.mrating}}</span></div>
                <div class="row">
                    <v-rating color="red" background-color="black" v-model="myrating" @click="updaterate"></v-rating>
                    <button class="btn btn-success btn-sm py-1 m-1" @click="rateshow=!rateshow">Rate This Show</button>

                    <button class="btn btn-secondary btn-sm py-1 m-1" @click="subscribe=!subscribe">Subscribe To This
                        Show
                    </button>
                    <Dialog v-if="subscribe" @choiceMade="subscribeShow($event,movie)">
                        <template slot="title">
                            Subscribe to show <b>{{movie.mname}}</b>
                        </template>
                        <template slot="quiz">
                            You will be receiving Updated in your mail.
                            Are you sure to Subscribe ?
                        </template>

                    </Dialog>

                    <Dialog v-if="rateshow" @choiceMade="rateShow($event,movie)">
                        <template slot="title">
                            Rate Show {{movie.mname}}
                        </template>
                        <template slot="quiz">
                            Rate show <strong>{{movie.mname}}</strong>
                            <span class="text-primary font-weight-bold"> {{myrating}} </span>
                            Stars
                        </template>

                    </Dialog>
                </div>
            </div>
        </div>
        <!--                    <v-alert-->
        <!--                            border="left"-->
        <!--                            colored-border-->
        <!--                            color="green"-->
        <!--                            type="info"-->
        <!--                            elevation="2"-->
        <!--                            dismissible-->
        <!--                            dense-->
        <!--                    >-->
        <!--                        each star = 2 points-->
        <!--                    </v-alert>-->
        <h4>Movie Synopsis</h4>
        <v-alert
                border="left"
                colored-border
                color="green"
                type="error"
                elevation="2"
                icon="mdi-firework"
                dense
        >
            {{movie.msynopsis}}
        </v-alert>
    </div>
</template>
<style lang="scss">
    .movie-details {
        height: 100%;
        border-radius: 5px;
        background-color: white;
        padding: 10px;

        img {
            border-radius: 5px;
            box-shadow: 2px 1px 5px black;
        }

        .m-image-section {
            height: 400px;

        }

        .headin {
            font-weight: bolder;
            font-size: 1.3em;
        }

        .m-producer {
            color: blue;
            font-weight: bold;
        }

        .m-rating {
            color: red;
            font-weight: bold;
        }

        .m-title {
            color: black;
        }
    }
</style>
<script>
    import Dialog from "../components/dialog";

    export default {
        components: {
            Dialog
        },
        data() {
            return {
                myrating: '5',
                subscribe: false,
                rateshow: false
            }
        },
        computed: {
            movie() {
                return this.$store.state.currentmovie;
            }
        }, methods: {
            getImg(img) {
                return require('@/assets/images/' + img);
            },
            backTheater() {
                Event.shout('backToTheater');
            },
            rateShow(choice,movie) {
                if (choice == 1) {
                    let rate = parseInt(this.myrating) * 2;
                    alert('You rate the show ' + rate + ' out of 10');
                } else {
                    alert('Rating show cancelled')
                }
                this.rateshow = !this.rateshow
            },
            subscribeShow(choice, movie) {
                if (choice == 1) {
                    alert('Subscribe to ' + movie.mname);
                } else {
                    alert('Subscribe Cancelled');
                }
                this.subscribe = !this.subscribe
            },
            stripeValue(value) {
                let newVal = value.replace(/ /g, "");
                return newVal.replace(/,/g, ", ")
            }
        }
    }
</script>