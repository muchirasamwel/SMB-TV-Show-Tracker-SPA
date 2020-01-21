<template>
    <v-app>
        <v-card
                color="white darken-1"
                class="login-card container"
                light
        >
            <v-card-title
                    class="d-flex justify-content-center title"
            >
                <span v-if="isLogin">LOGIN</span>
                <span v-else>CREATE ACCOUNT</span>
            </v-card-title>
<!--            <v-alert-->
<!--                    border="left"-->
<!--                    colored-border-->
<!--                    color="red"-->
<!--                    type="error"-->
<!--                    elevation="2"-->
<!--                    dismissible-->
<!--                    dense-->
<!--                    v-if="errors"-->
<!--            >-->
<!--                {{errors}}-->
<!--            </v-alert>-->
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
            <v-divider></v-divider>
            <v-card-text>
<!--                <div v-if="errors" class="text-danger">{{errors}}</div>-->
<!--                <div v-if="success" class="text-success">{{success}}</div>-->
                <v-form
                        ref="loginform"
                        v-model="loginvalid"
                        v-if="isLogin"
                        @submit.prevent="onLoginSubmit"
                >
                    <!--        <form id="loginform" @submit="alert('yesy')" v-if="isLogin">-->
                    <v-text-field
                            color="green"
                            label="Email"
                            type="email"
                            required
                            :rules="emailrules"
                            v-model="login.email"
                    />
                    <v-text-field
                            color="green"
                            label="Password"
                            type="password"
                            :rules="passwordrules"
                            v-model="login.password"

                    />
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary mx-2" value="LOGIN" :disabled="!loginvalid">
                        <label class="cursor-pointer text-primary float-right" @click="isLogin=!isLogin">Need
                            Account??</label>
                    </div>
                </v-form>
                <v-form
                        ref="registerform"
                        v-model="registervalid"
                        v-else
                        @submit.prevent="onRegisterSubmit"
                >
                    <v-text-field
                            color="green"
                            label="Name"
                            type="text"
                            :rules="namerules"
                            v-model="register.name"
                    />
                    <v-text-field
                            color="green"
                            label="Email"
                            type="email"
                            :rules="emailrules"
                            v-model="register.email"

                    />
                    <v-text-field
                            color="green"
                            label="Password"
                            type="password"
                            :rules="passwordrules"
                            v-model="register.password"
                    />
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary mx-2" value="Create account"
                               :disabled="!registervalid">
                        <label class="text-primary float-right cursor-pointer" @click="isLogin=!isLogin">Back To
                            Login</label>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>

    </v-app>
</template>
<style lang="scss" scoped>
    .login-card {
        margin-right: auto;
        margin-left: auto;
        @media (min-width: 500px) {
            width: 50%;
            margin-top: 10%;
        }
    }

    .title {
        background-color: #dadada;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .btn:disabled {
        background-color: darkgrey !important;
        cursor: not-allowed;
    }
</style>
<script>
    // import $ from '../assets/bootstrap/js/jquery.js';
    export default {
        data: () => ({
            hassuccess:false,
            haserror:false,
            loginvalid: true,
            registervalid: true,
            emailrules: [
                value => !!value || 'Required.',
                value => (value || '').length <= 20 || 'Max 20 characters',
                value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            ],
            namerules: [
                value => !!value || 'Required.',
                value => (value || '').length <= 15 || 'Max 15 characters',
                // value => {
                //   const pattern = /(^[a-zA-Z]{3-15}$)/
                //   return pattern.test(value) || 'Invalid Name.'
                // },
            ],
            passwordrules: [
                value => !!value || 'Required.',
                value => (value || '').length <= 20 || 'Max 20 characters',
                // value => {
                //   const pattern = /(^[a-zA-Z]{3-15}$)/
                //   return pattern.test(value) || 'Invalid Name.'
                // },
            ],

            isLogin: true,
            login: {},
            register: {},
        }),
        methods: {
            onLoginSubmit() {
                if (this.validatelogin()) {
                    // alert('form valid');
                    this.login.table = "users";
                    this.login.action = 'sel';
                    this.$store.dispatch('login', this.login);
                }

            },
            onRegisterSubmit() {
                if (this.validateregister()) {
                    this.register.table = "users";
                    this.register.action = 'ins';
                    this.$store.dispatch('signUp', this.register);
                }
            },
            validatelogin() {
                return !!this.$refs.loginform.validate();
            },
            validateregister() {
                return !!this.$refs.registerform.validate();
            },
        },
        computed: {
            errors() {
                return this.$store.state.errors;
            },
            success() {
                return this.$store.state.success;
            }
        },
        created() {
            this.$store.dispatch('logout');
            this.$store.dispatch('getLoggedUser');

        }
    }
</script>
