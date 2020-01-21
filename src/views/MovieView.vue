<template>
    <div class="movie-details">
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
        <button class="font-weight-bolder btn btn-danger float-right py-1" @click="backTheater">X</button>
        <h1 class="text-center">{{movie.title}}</h1>
        <div class="row">
            <div class="col-md-6 m-image-section overflow-x-hidden" >
                <div class="w-100 h-100" id="imagery">
                    <img :src="getImg(movie.image)" alt="" height="100%">
                </div>
                <div id="cover" class="w-100 h-100">
                    <button class="btn btn-light" @click="watchnow=true">Watch Trailer</button>
                </div>
            </div>
            <div class="col-md-6 ">
                <span class="headin">Title</span>
                <h2 class="m-title">{{movie.title}}</h2>
                <div><span class="headin">Release Date : </span><span class="m-casts">{{movie.release_date}}</span>
                </div>
                <div><span class="headin">Genre : </span><span class="m-casts">{{stripeValue(movie.genre)}}</span>
                </div>
                <div><span class="headin">Casts : </span><span class="m-casts">{{stripeValue(movie.casts)}}</span>
                </div>
                <div><span class="headin">Producer : </span> <span class="m-producer">{{movie.producer}}</span></div>
                <div><span class="headin">Description : </span> <span
                        class="m-description">{{movie.description}}</span></div>
                <div><span class="headin">Rating : </span> <span class="m-rating">{{movie.rating}}</span></div>
                <div class="row">
                    <v-rating color="red" background-color="black" v-model="myrating"></v-rating>
                    <button class="btn btn-success btn-sm py-1 m-1" @click="rateshow=!rateshow">Rate This Show</button>

                    <button v-show="hassubscribed" class="btn btn-warning btn-sm py-1 m-1" @click="unsubscribe=!unsubscribe">UnSubscribe From This
                        Show
                    </button>
                    <button v-show="!hassubscribed"  class="btn btn-secondary btn-primary btn-sm py-1 m-1" @click="subscribe=!subscribe">Subscribe To This
                        Show
                    </button>
                    <Dialog v-if="subscribe" @choiceMade="subscribeShow($event,movie)">
                        <template slot="title">
                            Subscribe to show <b>{{movie.title}}</b>
                        </template>
                        <template slot="quiz">
                            You will be receiving Updated in your mail.
                            Are you sure to Subscribe ?
                        </template>

                    </Dialog>
                    <Dialog v-if="unsubscribe" @choiceMade="unsubscribeShow($event,movie)">
                        <template slot="title">
                            UnSubscribe From show <b>{{movie.title}}</b>
                        </template>
                        <template slot="quiz">
                            You will no longer receive updates about this show.
                            Continue to unsubscribe ?
                        </template>

                    </Dialog>

                    <Dialog v-if="rateshow" @choiceMade="rateShow($event,movie)">
                        <template slot="title">
                            Rate Show {{movie.title}}
                        </template>
                        <template slot="quiz">
                            Rate show <strong>{{movie.title}}</strong>
                            <span class="text-primary font-weight-bold"> {{myrating}} </span>
                            Stars
                        </template>
                    </Dialog>
                </div>
            </div>

        </div>

        <h4>Movie Synopsis</h4>
        <v-alert
                border="left"
                colored-border
                color="green"
                type="error"
                elevation="2"
                icon="mdi-information"
                dense
        >
            {{movie.synopsis}}
        </v-alert>
        <div class="comments p-3">
            <h3>COMMENTS</h3>
            <div v-for="comment in comments" :key="comment.id">
            <v-alert
                    border="right"
                    colored-border
                    color="blue"
                    width="90%"
                    type="info"
                    elevation="2"
                    icon="mdi-account"
                    dense
                    v-if="comment.user_id===user.id"
            >
                <p>{{comment.comment}}</p>
                <div class="">
                    <span class="text-dark font-weight-bold">By You ({{user.name}})</span>
                    <span class="float-right text-primary">{{comment.created_at}}</span>
                </div>
            </v-alert>
                <v-alert
                        border="left"
                        colored-border
                        color="black"
                        width="90%"
                        type="info"
                        elevation="2"
                        icon="mdi-message"
                        dense
                        v-else
                >
                    <p>{{comment.comment}}</p>
                    <div class="">
                        <span class="text-dark font-weight-bold">By {{fetchUser(comment.user_id)}}</span>
                        <span class="float-right text-primary">{{comment.created_at}}</span>
                    </div>
                </v-alert>
            </div>
        </div>
        <div class="p-4">
            <h3>Comment</h3>
            <div>
                <form @submit.prevent="submitComment">
                    <textarea name="comment" id=""  class="form-control m-3 w-75" v-model="comment"></textarea>
                    <button class="btn btn-secondary" type="submit">Post Comment</button>
                </form>
            </div>
        </div>
        <v-dialog :value="watchnow" persistent max-width="80%" class="hfull" >
            <button class="btn btn-danger closed-dialog p-2 font-weight-bold" @click="watchnow=false">close</button>
            <div class="bg-white container hfull" >
                <iframe :src="movie.trailer_link"
                        width="100%" id="watching" frameborder="0" allowfullscreen height="500px">
                </iframe>
            </div>
        </v-dialog>
    </div>
</template>
<style lang="scss">
    .movie-details {
        border-radius: 5px;
        background-color: white;
        padding: 10px;
        .hfull{
            height: 100vh;
        }
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
        #watching{
            height: 80vh!important;
        }
        #cover{
            position: absolute;
            top: 0px;
            background-color: transparent;
            button{
                position: absolute;
                bottom: 3px;
                font-weight: bolder !important;
                left: 30%;
                box-shadow: 2px 2px 3px black!important;
            }
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
                watchnow:false,
                hassuccess: false,
                haserror: false,
                myrating: 5,
                unsubscribe: false,
                subscribe: false,
                rateshow: false,
                comment:'',
                users:{},
                commentuser:{}
            }
        },
        computed: {

            hassubscribed(){
                return this.$store.state.subscribed;
            },
            movie(){
                return this.$store.state.currentmovie;
            },
            comments(){
                return this.$store.state.currentcomments;
            },
            user(){
                return this.$store.state.loggeduser;
            },
            errors() {
                return this.$store.state.errors;
            },
            success() {
                return this.$store.state.success;
            }
        },
        methods: {
            getImg(img) {
                return (this.$store.state.path  + img);
            },
            backTheater() {
                Event.shout('backToTheater');
            },
            async rateShow(choice,movie) {
                if (choice === 1) {
                    console.log(this.user)
                    await this.$store.dispatch('fetchShow',movie.id);
                    let rate = parseInt(this.myrating) * 2;
                    alert('You rate the show ' + typeof rate + ' out of 10');
                    await this.$store.dispatch('rateMovie',rate);
                    await this.$store.dispatch('recordRating',rate);
                    await this.$store.dispatch('fetchShow',movie.id);
                    await this.$store.dispatch("fetchShows");
                } else {
                    alert('Rating show cancelled')
                }
                this.rateshow = !this.rateshow
            },
            async updateShow()
            {
                await this.$store.dispatch('fetchShow',this.movie.id);
                await this.$store.dispatch('findUsersSubscribed');

            },
            async subscribeShow(choice, movie) {
                if (choice === 1) {
                    //alert('Subscribe to ' + movie.title);
                    await this.$store.dispatch('subscribeToShow',movie)
                    this.updateStatus();
                    this.updateShow()
                } else {
                    alert('Subscribe Cancelled');
                }
                this.subscribe = !this.subscribe
            },
            async unsubscribeShow(choice, movie) {
                if (choice === 1) {
                    await this.$store.dispatch('unsubscribeFromShow',movie)
                    this.updateStatus();
                   this.updateShow();
                } else {
                    alert('UnSubscribe Cancelled');
                }
                this.unsubscribe = !this.unsubscribe
            },
            stripeValue(value) {
                let newVal = value.replace(/ /g, "");
                return newVal.replace(/,/g, ", ")
            },
            async submitComment() {
                await this.$store.dispatch('addComment',this.comment);
                await this.$store.dispatch('fetchComments');
                this.updateStatus();
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
            fetchUser(id)
            {
                let user=this.users.filter((user)=>user.id===id)[0];
                return user.name;
            },
        },
        created() {
            this.$store.dispatch('fetchUsers').then(resp=>{
                this.users=resp;
            });
            this.updateShow();
        }
    }
</script>