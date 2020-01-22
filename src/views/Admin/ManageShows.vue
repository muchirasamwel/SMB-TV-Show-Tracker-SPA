<template>
    <div>
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
        <Dialog v-if="asktodel" @choiceMade="deleteShowNow($event)">
            <template slot="title">
                Delete Show
            </template>
            <template slot="quiz">
                Are You sure to delete This Show??
            </template>
        </Dialog>
        <div class="d-flex justify-content-end container" id="manageshows">
            <button class="btn btn-dark" @click="showstable=!showstable"> Toggle <strong>Form/Table</strong></button>
        </div>
        <div class="container mt-5" v-if="!showstable">
            <h3 class="text-center">Show Details</h3>
            <form id="showimageform" @submit.prevent>
                <label>Show Image</label><br>
                <img :src="currentshowimage" alt="Img" class="img-fluid  bg-light rounded"
                     style="height:150px; width:150px"/>
                <input type="file" name="image" @change="asktoupload=true" class="custom-file" value="">
            </form>
            <Dialog v-if="asktoupload" @choiceMade="uploadImage($event,this)">
                <template slot="title">
                    UPLOAD Request
                </template>
                <template slot="quiz">
                    Upload The selected File ??
                </template>
            </Dialog>

            <v-form
                    ref="showform"
                    v-model="showvalid"
                    @submit.prevent=""
            >
                <v-text-field
                        color="green"
                        label="Show Title"
                        type="text"
                        :rules="namerules"
                        v-model="show.title"
                />
                <v-col cols="12" md="8">
                    <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="show.release_date"
                            persistent
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="show.release_date"
                                    label="Show Release Date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            />
                        </template>
                        <v-date-picker v-model="show.release_date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(show.release_date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-combobox
                        v-model="show.genre"
                        :items="genres"
                        label="Show Genre"
                        multiple
                        chips
                />
                <v-combobox
                        color="green"
                        v-model="show.casts"
                        :items="casts"
                        label="Show Casts"
                        multiple
                        chips
                />
                <v-text-field
                        color="green"
                        label="Show Producer"
                        type="text"
                        :rules="namerules"
                        v-model="show.producer"
                />
                <v-textarea
                        color="green"
                        label="Show Description"
                        type="text"
                        rows="3"
                        :rules="descriptionrules"
                        v-model="show.description"
                >
                </v-textarea>
                <v-textarea
                        color="green"
                        label="Show Synopsis"
                        type="text"
                        rows="5"
                        :rules="synopsisrules"
                        v-model="show.synopsis"
                >
                </v-textarea>
                <v-text-field
                        color="green"
                        label="Trailer"
                        type="text"
                        :rules="trailerrules"
                        v-model="show.trailer_link"
                />
                <v-combobox
                        color="green"
                        v-model="show.status"
                        :items="showstatus"
                        label="Show Status"
                        chips
                />
                <div class="form-group">
                    <input type="submit" class="btn btn-primary mx-2" value="Add Show"
                           :disabled="!validateShow" @click="onShowSubmit">
                </div>
            </v-form>
        </div>
        <v-dialog :value="dialog" persistent max-width="80%">
            <Dialog v-if="asktoupload2" @choiceMade="uploadEditImage($event,this)">
                <template slot="title">
                    UPLOAD Request
                </template>
                <template slot="quiz">
                    Upload The selected File ??
                </template>
            </Dialog>
            <button class="btn btn-danger closed-dialog p-2 font-weight-bold" @click="dialog=false">close</button>
            <div class="bg-white container">
                <h3>Update This Show</h3>
                <form id="editimageform" @submit.prevent>
                    <label>Show Image</label><br>
                    <img :src="editshowimage" alt="Img" class="img-fluid  bg-light rounded"
                         style="height:150px; width:150px"/>
                    <input type="file" name="image" @change="asktoupload2=true" class="custom-file" value="">
                </form>
                <v-form
                        ref="showeditform"
                        v-model="editshowvalid"
                        @submit.prevent=""

                >
                    <v-text-field
                            color="green"
                            label="Show Title"
                            type="text"
                            :rules="namerules"
                            v-model="showedit.title"
                    />
                    <v-col cols="12" md="8">
                        <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="showedit.release_date"
                                persistent
                                width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="showedit.release_date"
                                        label="Show Release Date"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                />
                            </template>
                            <v-date-picker v-model="showedit.release_date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(showedit.release_date)">OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-combobox
                            v-model="showedit.genre"
                            :items="genres"
                            label="Show Genre"
                            multiple
                            chips
                    />
                    <v-combobox
                            color="green"
                            v-model="showedit.casts"
                            :items="casts"
                            label="Show Casts"
                            multiple
                            chips
                    />

                    <v-text-field
                            color="green"
                            label="Show Producer"
                            type="text"
                            :rules="namerules"
                            v-model="showedit.producer"
                    />

                    <v-textarea
                            color="green"
                            label="Show Description"
                            type="text"
                            rows="3"
                            :rules="descriptionrules"
                            v-model="showedit.description"
                    >
                    </v-textarea>
                    <v-textarea
                            color="green"
                            label="Show Synopsis"
                            type="text"
                            rows="5"
                            :rules="synopsisrules"
                            v-model="showedit.synopsis"
                    >
                    </v-textarea>
                    <v-text-field
                            color="green"
                            label="Trailer"
                            type="text"
                            :rules="trailerrules"
                            v-model="showedit.trailer_link"
                    />
                    <v-combobox
                            color="green"
                            v-model="showedit.status"
                            :items="showstatus"
                            label="Show Status"
                            chips
                    />
                    <div class="form-group">
                        <input type="submit" class="btn btn-secondary mx-2" value="Update Show"
                               :disabled="!validateEditShow" @click="onShowUpdate">
                    </div>

                </v-form>
            </div>
        </v-dialog>
        <div v-if="showstable" class="mx-2">
            <v-card>
                <v-card-title>
                    All SMB Shows
                    <v-spacer/>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                    />
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="allShows"
                        :search="search"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                color="green"
                                @click="updateShow(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                                small
                                color="red"
                                @click="deleteShow(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </div>
</template>
<style lang="scss">
    .closed-dialog {
        float: right;
        right: 20px;
        width: 50px;
        position: absolute;
    }

    .v-data-table-header {
        background-color: gray;
        th {
            margin-left: 20px!important;
            color: white !important;
            font-weight: bold;
        }
    }
</style>
<script>
    import Dialog from "../../components/dialog";
    import $ from "jquery";

    export default {
        components: {
            Dialog
        },
        data() {
            return {
                currentshowimage: "",
                editshowimage: "",
                dialog: false,
                showstatus: ['ok','coming-soon','hot' ,'blocked', 'canceled', 'banned'],
                editshowvalid: false,
                showstable: false,
                asktoupload: false,
                asktodel: false,
                asktoupload2: false,
                hassuccess: false,
                haserror: false,
                showvalid: false,
                modal: false,
                genres: ['Action', 'Horror', 'Sci-Fi', 'Romance'],
                casts: ['Samkan', 'Palma', 'Pumkin'],
                show: {},
                showedit: {},
                showdelete: {},
                namerules: [
                    value => !!value || 'Name is Required.',
                    value => (value || '').length <= 30 || 'Max 30 characters',
                    // value => {
                    //   const pattern = /(^[a-zA-Z]{3-15}$)/ {text: 'Description', value: 'description'},
                    //{text: 'Synopsis', value: 'synopsis'},
                    //   return pattern.test(value) || 'Invalid Name.'
                    // },
                ],
                trailerrules: [
                    value => (value || '').length <= 100 || 'Max 100 characters',
                    // value => {
                    //   const pattern = /(^[a-zA-Z]{3-15}$)/
                    //   return pattern.test(value) || 'Invalid Name.'
                    // },
                ],
                descriptionrules: [
                    value => !!value || ' Description is Required.',
                    value => (value || '').length <= 200 || 'Max 200 characters',
                ],
                synopsisrules: [
                    value => !!value || ' synopsis is Required.',
                    value => (value || '').length <= 1000 || 'Max 1000 characters',
                ],
                search: '',
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
                    {text: 'Title', value: 'title'},
                    {text: 'Genre', value: 'genre'},
                    {text: 'Casts', value: 'casts'},
                    {text: 'Producer', value: 'producer'},
                    {text: 'Rating', value: 'rating'},
                    {text: 'Status', value: 'status'},
                    {text: 'Date Added', value: 'created_at'},
                    {text: 'Image', value: 'image'},
                    {text: 'User Id', value: 'user_id'},
                    {text: 'Release date', value: 'release_date'},
                    {text: 'Trailer', value: 'trailer_link'},
                ],
            }
        },
        computed: {
            allShows() {
                return this.$store.state.allshows;
            },
            user() {
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
            async onShowSubmit() {
                if (this.validateShow()) {
                    if (!this.show.image) {
                        alert('Please add an image first');
                        return;
                    }
                    let show = this.show;
                    show.user_id = this.user.id;
                    show.created_at = new Date().toLocaleString();
                    show.table = "shows";
                    show.action = "ins";
                    await this.$store.dispatch('actOnShow', show);
                    this.updateStatus();
                    await this.$store.dispatch('fetchShows');
                }

            },
            async onShowUpdate() {
                if (this.validateEditShow()) {
                    let show = this.showedit;
                    show.table = "shows";
                    show.action = "up";
                    await this.$store.dispatch('actOnShow', show);
                    this.updateStatus();
                    await this.$store.dispatch('fetchShows');
                    this.dialog = false;
                }

            },
            validateShow() {
                return !!this.$refs.showform.validate();
            },
            validateEditShow() {
                return !!this.$refs.showeditform.validate();
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
            }
            ,
            async uploadImage(choice) {
                //alert(choice)
                this.asktoupload = false;
                if (choice === 1) {
                    let data = $("#showimageform [name='image']")[0].files[0];
                    let imagename = $("#showimageform [name='image']").val();
                    imagename = imagename.substr(imagename.lastIndexOf('\\') + 1);
                    await this.$store.dispatch('uploadImage', data);

                    await this.updateStatus();
                    if (this.hassuccess) {
                        this.show.image = imagename;
                        this.currentshowimage = "/images/" + imagename;
                    }
                }
            },
            async uploadEditImage(choice) {
                if (choice === 1) {
                    this.asktoupload2 = false;
                    let data = $("#editimageform [name='image']")[0].files[0];
                    let imagename = $("#editimageform [name='image']").val();
                    imagename = imagename.substr(imagename.lastIndexOf('\\') + 1);
                    await this.$store.dispatch('uploadImage', data);

                    if (this.success) {
                        this.showedit.image = imagename;
                        this.editshowimage = "/images/" + imagename;
                    }
                    this.updateStatus();
                }
                this.asktoupload2 = false;
            },
            deleteShow(show) {
                const newshow = Object.assign({}, show);
                newshow.table = "shows";
                newshow.action = "del";
                this.showdelete = newshow;
                this.asktodel = true;
            },
            async deleteShowNow(choice) {
                this.asktodel = false;
                if (choice === 1) {
                    await this.$store.dispatch('actOnShow', this.showdelete);
                    this.updateStatus();
                    await this.$store.dispatch('fetchShows');
                }
            },
            updateShow(show) {
                const newshow = Object.assign({}, show);
                newshow.casts = newshow.casts.split(', ');
                newshow.genre = newshow.genre.split(', ');
                this.showedit = newshow;
                this.dialog = true;
            },
        },
        created() {
            this.$store.dispatch('fetchShows');
        },
        mounted() {
            $(".active").removeClass('active');
            $(".tvshows").addClass('active');
        },
    }
</script>