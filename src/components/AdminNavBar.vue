<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light w-100">
        <a class="navbar-brand" href="#">
            <v-toolbar-title>Admin Panel</v-toolbar-title>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navToggler"
                aria-controls="navToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navToggler">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item home ">
                    <router-link to="/" class="nav-link" >UserView</router-link>
                </li>
                <li class="nav-item tvshows">
                    <a class="nav-link "  @click="handleNavigation('shows')">Tv-Shows</a>
                </li>
                <li class="nav-item users">
                    <a class="nav-link " @click="handleNavigation('users')">Users</a>
                </li>
                <li class="nav-item subscriptions">
                    <a class="nav-link " @click="handleNavigation('subscriptions')">Subscription</a>
                </li>
            </ul>
            <v-btn icon color="black" class="user-btn">
                <v-icon>mdi-account</v-icon>
            </v-btn>

            <span class="dropdown" v-if="logged_user.name">
                         <a class="dropdown-toggle bg-white btn nav-item" data-toggle="dropdown" href="#" id="logged_user"> {{logged_user.name}}</a>
                        <ul class="dropdown-menu">
                            <li class="m-2"><router-link to="/login" class="nav-item" >Logout</router-link></li>
        				</ul></span>
            <router-link to="/login"  class="nav-item btn btn-light" v-else>Login</router-link>
        </div>
    </nav>
</template>
<style lang="scss">
    .nav-item{
        a{
            color: black!important;
            font-weight: bolder;
            -webkit-text-stroke: 1px white;
        }
    }
</style>
<script>
    export default {
        props:{
            logged_user:Object
        },
        methods:{
            handleNavigation(data)
            {
                Event.shout('handleAdminNavigation',data);
            }
        }
    }
</script>