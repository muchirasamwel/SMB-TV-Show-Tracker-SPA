<template>
    <div>
        <h3 class="text-center">SMB Tv Shows Admin panel</h3>
        <div id="maindata">
            <keep-alive>
                <component v-bind:is="component"/>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import Shows from "./ManageShows.vue";
    import Subscriptions   from "./ManageSubscriptions.vue"
    import Users from "./ManageUsers.vue"
    import router from "../../router";

    import $ from "../../assets/bootstrap/js/jquery";
    export default {
        components:{
            Shows,Users,Subscriptions
        },
        created() {
            let user = this.$store.state.loggeduser;
            if (user.role === "admin")
                Event.shout('navigateAdmin');
            else
                router.replace("/");
            Event.listen('handleAdminNavigation',(data)=>{
                if(data==="shows"){
                    this.component="Shows"
                    $(".active").removeClass('active');
                    $(".tvshows").addClass('active');
                }
                else if(data==="subscriptions"){
                    this.component='Subscriptions'
                    $(".active").removeClass('active');
                    $(".subscriptions").addClass('active');
                }
                else if(data==='users')
                {
                    $(".active").removeClass('active');
                    $(".users").addClass('active');
                    this.component="Users";
                }
            })

        },
        computed: {
            logged_user() {
               return  this.$store.dispatch('getLoggedUser');
            }
        },
        data(){
            return{
                component: "Shows",
            }
        }
    }
</script>