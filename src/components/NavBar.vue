<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light w-100">
        <a class="navbar-brand" href="#">
            <v-toolbar-title>SMB Tv Shows</v-toolbar-title>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navToggler"
                aria-controls="navToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navToggler">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item" v-if="logged_user.role=='admin'">
                    <router-link to="/admin" class="nav-link">Admin</router-link>
                </li>
                <li class="nav-item home active">
<!--                    <router-link to="/" class="nav-link" @click="navigateHome">Home</router-link>-->
                    <a class="nav-link " href="#home" >Home</a>
                </li>
                <li class="nav-item trending">
                    <a class="nav-link " href="#trending">Trending</a>
                </li>
                <li class="nav-item movies">
                    <a class="nav-link " href="#movies" @click="pHandleNavigation(0)">All Shows</a>
                </li>
                <li class="nav-item subscribed">
                    <a class="nav-link " href="#movies" @click="pHandleNavigation(1)">Subscribed</a>
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
<script>
    export default {
        props:{
            logged_user:Object
        },
        methods:{
            pHandleNavigation(data){
                Event.shout('navigateMovies',data);
            },
        }
    }
</script>