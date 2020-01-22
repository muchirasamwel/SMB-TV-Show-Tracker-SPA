<template>
    <v-app id="app">
        <v-app-bar
                absolute
                elevate-on-scroll
                prominent
                :src="conditionalImage"
                fade-img-on-scroll
                shrink-on-scroll
                scroll-target="#scrolling-techniques-7"
                id="navcontaner">
            <v-spacer></v-spacer>
            <div class="w-100">
                <NavBar :logged_user="logged_user" v-if="!adminview"></NavBar>
                <AdminNavBar :logged_user="logged_user" v-else></AdminNavBar>
                <div class="w-100 row px-3 d-flex justify-content-center mylogo">
                    <img :src="getImg('smb.webp')" alt="" width="100px" style="height: inherit" id="my-image"></div>
            </div>


        </v-app-bar>
        <v-sheet
                id="scrolling-techniques-7"
                class="overflow-y-auto"
                max-height="100vh"
                v-on:scroll.native="handleScroll"
        >
            <div class="pagecontent">
                <router-view/>
            </div>
        </v-sheet>
    </v-app>
</template>

<style lang="scss">
    @mixin opacityOnFocus {
        opacity: .5;
        &:focus {
            opacity: 1;
        }
    }

    @mixin boxshadow($x,$y,$blr) {
        box-shadow: $x $y $blr black;
    }

    @mixin textshadow {
        text-shadow: 2px 2px 3px black;
    }

    @mixin smallmenu {
        @media (min-width: 600px) {
            background: transparent !important;
        }
        @media (max-width: 600px) {
            text-align: center;
            & .navbar-nav {
                padding: 0px;
                margin: auto;
            }
        }
    }

    @media(max-width: 600px) {
        .mylogo {
            img {
                display: none !important;

            }
        }
    }

    @media (min-width: 600px) {
    }

    @mixin colapsing {
        &:focus {
            width: 100%;
        }
        &:blur {
            width: 0%;
        }
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        max-height: 100%;

        .v-toolbar__image {
            //opacity: 1 !important;
        }

        .pagecontent {
            margin-top: 10%;
        }

        .navbar {
            padding-top: 0px;
            @include smallmenu;

            .active {
                font-weight: bold;

                a {
                    color: red !important;

                }
            }

            .nav-item {
                color: black;

            }

            #logged_user {
                background-color: red;

                ul {
                    background-color: red;
                    margin-right: 10px !important;
                }
            }

        }

        .v-toolbar__content {
            padding-top: 0px !important;
        }

        .user-btn {
            background: white;
        }

        .searchinput {
            @include opacityOnFocus;

            &:focus ~ .searchbtn {
                background: black;
                color: white;
            }

            &:blur ~ .searchbtn {
                background: transparent;
            }

            // @include colapsing;
        }

        .movie-t {
            @include boxshadow(2px, 1px, 5px);

            .m-hidden {
                display: none;
            }

            .m-info {
                background: rgba(0, 0, 0, .3);
                position: absolute;
                bottom: 40px;

                .m-info-d {
                    font-weight: bold;
                    color: white !important;
                    @include textshadow;

                }
            }

            .m-rating {
                position: absolute;
                font-weight: bold;
                top: 10px;
                right: 10px;
                background-color: white;
                border: 1px solid black;
                border-radius: 20px;
                padding: 5px;
            }

            .v-list-item__content {
                padding: 4px;
            }
        }

    }


</style>
<script>
    import $ from './assets/bootstrap/js/jquery.js';
    import NavBar from "./components/NavBar";
    import AdminNavBar from "./components/AdminNavBar";

    export default {
        components: {
            NavBar, AdminNavBar
        },
        data() {
            return {
                adminview: false,
                conditionalImage: this.getImg('field.jpg'),
            }
        },
        methods: {
            getImg(img) {
                return require('@/assets/images/' + img);
            },
            handleScroll() {
                try {
                    let mdistancetotop = $('#movies').offset().top;
                    let tdistancetotop = $('#trending').offset().top;

                    if (mdistancetotop > -($('#movies').height() + 10) && mdistancetotop < 50) {
                        $("#my-image").slideUp();
                        $(".active").removeClass('active');
                        $(".movies").addClass('active');

                    } else if (tdistancetotop > -($('#trending').height() + 10) && tdistancetotop < 50) {

                        $("#my-image").slideUp();
                        $(".active").removeClass('active');
                        $(".trending").addClass('active');
                    } else {
                        $("#my-image").slideDown();
                        $(".active").removeClass('active');
                        $(".home").addClass('active');
                    }
                } catch (e) {
                    //console.log("error haddled");
                }
            }
        },
        computed: {
            logged_user() {
                return this.$store.state.loggeduser;
            }
        },
        created() {
            Event.listen('navigateAdmin', () => {
                this.adminview = true;
                this.conditionalImage = this.getImg('control 2.jpg');
            })
            Event.listen('navigateUser', () => {
                this.conditionalImage = this.getImg('scifi3.jpg');

                this.adminview = false;

            })
            this.$store.dispatch('getLoggedUser');
        }
    }
</script>