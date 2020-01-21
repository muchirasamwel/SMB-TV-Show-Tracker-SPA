<template>
    <div>
        <Dialog v-if="asktodelete2" @choiceMade="deleteShowSubscription($event)">
            <template slot="title">
                Delete Show
            </template>
            <template slot="quiz">
                Are You sure to delete This Show??
            </template>
        </Dialog>
        <Dialog v-if="asktodelete" @choiceMade="deleteNewsSubscription($event)">
            <template slot="title">
                Delete Show
            </template>
            <template slot="quiz">
                Are You sure to delete This Show??
            </template>
        </Dialog>
        <h3>
        </h3>
        <div class="mx-2">
            <v-card>
                <v-card-title>
                    News Subscriptions
                    <v-spacer/>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details/>
                </v-card-title>
                <v-data-table
                        v-model="selectednews"
                        show-select
                        :headers="headers"
                        :items="newsSubscriptions"
                        :search="search"

                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                color="red"
                                @click="askDeleteShowSubscription(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
                <div class="container col-md-8">
                    <h3>Notify News Subscribers</h3>
                    <textarea name="message" id=""  rows="5" class="form-control bg-light my-2" v-model="newsmail.message">
                        </textarea>
                    <button class="btn btn-primary" @click="sendNewsNotification">Send Notification</button>
                </div>
            </v-card>
        </div>
        <hr class="my-12">
        <div class="mx-2">
            <v-card>
                <v-card-title>
                    Show Subscriptions
                    <v-spacer/>
                    <v-text-field
                            v-model="search2"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                    />
                </v-card-title>
                <v-data-table
                        v-model="selectedshow"
                        :headers="headers2"
                        :items="showSubscriptions"
                        :search="search2"
                        ref="showsSearch"
                        show-select
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                color="red"
                                @click="askDeleteNewsSubscription(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:item.showname="{ item }" >
                        {{getShow(item.show_id)}}
                    </template>
                </v-data-table>
                <div class="container col-md-8">
                    <h3>Notify Shows Subscribers</h3>
                    <textarea name="message" id="" rows="5" class="form-control bg-light my-2" v-model="showsmail.message">
                        </textarea>
                    <button class="btn btn-primary" @click="sendShowsNotification">Send Notification</button>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>
    import Dialog from "../../components/dialog";
    export default {
        components: {
            Dialog
        },
        data() {
            return {
                selectedshow:[],
                selectednews:[],
                asktodelete: false,
                asktodelete2: false,
                search: '',
                search2: '',
                hassuccess: false,
                haserror: false,
                showsmail:{},
                newsmail:{},
                deletenewssubscription: {},
                deleteshowsubscription: {},
                headers: [
                    {
                        text: 'Actions',
                        sortable: false,
                        value: 'actions',
                    },
                    {
                        text: '#',
                        sortable: false,
                        value: 'id',
                    },
                    {text: 'Email', value: 'email'},
                    {text: 'Subscription Date', value: 'created_at'}
                ],
                headers2: [
                    {
                        text: 'Actions',
                        sortable: false,
                        value: 'actions',
                    },
                    {
                        text: '#',
                        sortable: false,
                        value: 'id',
                    },
                    {
                        text: ' Show ',
                        value: 'showname',
                    },
                    {text: 'User Id ', value: 'user_id'},
                    {text: 'User Email ', value: 'email'},
                    {text: 'Show Id ', value: 'show_id'},
                    {text: 'Subscription Date', value: 'created_at'}
                ],
            }
        },
        methods: {
            getShow(id){
                let show = this.$store.state.allshows.filter((show)=>show.id===id)[0];
                return show.title;
            },
            askDeleteShowSubscription(subscription) {
                this.deleteshowsubscription = subscription;
                this.asktodelete = true;
            },
            askDeleteNewsSubscription(subscription) {
                this.deletenewssubscription = subscription;
                this.asktodelete2 = true;
            },
            async sendShowsNotification(){
                let mails=[];
                let selected= Object.assign({}, this.selectedshow);
                for(let item in selected)
                {
                   let mail=selected[item].email
                    mails.push(mail)
                }
                this.showsmail.message;
                this.showsmail.subject="Shows Notification";
                this.showsmail.mails=mails;
                console.log(this.showsmail);
            },
            async sendNewsNotification(){
                let mails=[];
                let selected= Object.assign({}, this.selectednews);
                for(let item in selected)
                {
                    let mail=selected[item].email
                    mails.push(mail)
                }
                this.newsmail.message;
                this.newsmail.subject="News Notification";
                this.newsmail.mails=mails;
                console.log(this.newsmail);
            },
            async deleteShowSubscription(choice) {
                this.asktodelete = false;
                if (choice === 1) {
                    await this.$store.dispatch('actOnSubscriptions', this.deleteshowsubscription);
                    this.updateStatus();
                    await this.$store.dispatch('fetchNewsSubscriptions', this.deleteshowsubscription);
                }
            }
            ,
            async deleteNewsSubscription(choice) {
                this.asktodelete2 = false;
                if (choice === 1) {
                    await this.$store.dispatch('actOnSubscriptions', this.deletenewssubscription);
                    this.updateStatus();
                    await this.$store.dispatch('fetchNewsSubscriptions', this.deletenewssubscription);
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
        },
        computed: {
            newsSubscriptions() {
                return this.$store.state.newssubscriptions;
            },
            showSubscriptions() {
                const showsubscriptions = this.$store.state.showsubscriptions;
                console.log(showsubscriptions);
                for(let subscriber in showsubscriptions)
                {
                    const subcribe = Object.assign({}, showsubscriptions[subscriber]);
                    showsubscriptions[subscriber].showtitle = this.getShow(subcribe.show_id);
                }
                console.log(showsubscriptions);
                return showsubscriptions;
            }
        },
        created() {
            this.$store.dispatch('fetchShowSubscriptions', this.deletenewssubscription);
            this.updateStatus();
            this.$store.dispatch('fetchNewsSubscriptions', this.deletenewssubscription);
            this.updateStatus();
        }
    }
</script>