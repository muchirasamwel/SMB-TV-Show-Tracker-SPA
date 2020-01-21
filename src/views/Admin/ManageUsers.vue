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
        <Warning v-if="warning" @warningComplete="warning=false">
            <template slot="title">
                Delete User
            </template>
            <template slot="quiz">
                You are not allowed to delete this user !!
            </template>
        </Warning>
        <Dialog v-if="asktodelete" @choiceMade="deleteUser($event)">
            <template slot="title">
                Delete User
            </template>
            <template slot="quiz">
                Are You sure to delete This User {{deleteuser.name}}??
            </template>

        </Dialog>

        <v-dialog :value="dialog" persistent max-width="80%">
            <button class="btn btn-danger closed-dialog p-2 font-weight-bold" @click="dialog=false">close</button>
            <div class="bg-white container">
                <h3>Update User</h3>
                <v-form
                        ref="usereditform"
                        @submit.prevent=""
                >
                    <v-text-field
                            color="green"
                            label="User's Name"
                            type="text"
                            :rules="namerules"
                            v-model="user.name"
                    />
                    <v-combobox
                            v-model="user.role"
                            :items="roles"
                            label="Show Genre"
                            chips
                    />
                    <div class="form-group">
                        <input type="submit" class="btn btn-secondary mx-2" value="Update User"
                               :disabled="!validateUserUpdate" @click="onUserUpdate">
                    </div>

                </v-form>
            </div>
        </v-dialog>
        <div class="mx-2">
            <v-card>
                <v-card-title>
                    All Users
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
                        :items="allUsers"
                        :search="search"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                color="green"
                                @click="showUpdateUser(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                                small
                                color="red"
                                @click="askDeleteUser(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </div>
</template>
<script>
    import Warning from "../../components/warning";
    import $ from "../../assets/bootstrap/js/jquery";
    import Dialog from "../../components/dialog";

    export default {
        components: {
            Dialog, Warning
        },
        data() {
            return {
                warning: false,
                dialog: false,
                asktodelete: false,
                search: '',
                user: {},
                hassuccess: false,
                haserror: false,
                deleteuser: {},
                roles: ['admin', 'user'],
                namerules: [
                    value => !!value || 'Name is Required.',
                    value => (value || '').length <= 30 || 'Max 30 characters',
                    // value => {
                    //   const pattern = /(^[a-zA-Z]{3-15}$)/
                    //   return pattern.test(value) || 'Invalid Name.'
                    // },
                ],
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
                    {text: 'Name', value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Role', value: 'role'}],
            }
        },
        methods: {
            async deleteUser(choice) {
                this.asktodelete = false;
                if (choice === 1) {
                    let user = this.deleteuser;
                    user.table = 'users';
                    user.action = 'del';
                    await this.$store.dispatch('actOnUser', user);
                    this.updateStatus();
                    await this.$store.dispatch("fetchUsers");
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
            showUpdateUser(user) {
                this.user = user;
                this.dialog = true;

            },
            async onUserUpdate() {
                let user = this.user;
                user.table = 'users';
                user.action = 'up';
                await this.$store.dispatch('actOnUser', user);
                this.updateStatus();
                this.dialog = false;
                await this.$store.dispatch("fetchUsers");
            },
            askDeleteUser(user) {
                if (user.id === this.$store.state.loggeduser.id) {
                    this.warning = true;
                    return;
                }
                this.deleteuser = user;
                this.asktodelete = true
            },
            validateUserUpdate() {
                return !!this.$refs.usereditform.validate();
            }
        },
        created() {
            this.$store.dispatch("fetchUsers");

        },
        mounted() {

        },
        computed: {
            allUsers() {
                return this.$store.state.allusers;
            },
            errors() {
                return this.$store.state.errors;
            },
            success() {
                return this.$store.state.success;
            }
        }
    }
</script>