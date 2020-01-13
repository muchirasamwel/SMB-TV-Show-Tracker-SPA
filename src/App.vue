<template>
    <v-app id="app" >
        <v-app-bar
                absolute
                elevate-on-scroll
                prominent
                :src="getImg('field.jpg')"
                fade-img-on-scroll
                shrink-on-scroll
                scroll-target="#scrolling-techniques-7"
                id="navcontaner"
        >
            <!--            <v-toolbar-title >Title</v-toolbar-title>-->
            <v-spacer></v-spacer>
            <div class="w-100">
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
                            <li class="nav-item home active">
                                <a class="nav-link" href="#home">Home</a>
                            </li>
                            <li class="nav-item trending">
                                <a class="nav-link " href="#trending">Trending</a>
                            </li>
                            <li class="nav-item movies">
                                <a class="nav-link " href="#movies" @click="handleNavigation(0)">All Movies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="#movies" @click="handleNavigation(1)">Subscribed</a>
                            </li>
                        </ul>

                        <v-btn icon color="black" class="user-btn">
                            <v-icon>mdi-account</v-icon>
                        </v-btn>

                        <!--                      <v-btn icon>-->
                        <!--                          <v-icon>mdi-dots-vertical</v-icon>-->
                        <!--                      </v-btn>-->
                    </div>
                </nav>
                <div class="w-100 row px-3 d-flex justify-content-center mylogo"><img :src="getImg('smb.webp')" alt=""
                                                                                      width="100px"></div>
            </div>
            <!--              <v-toolbar-items class="hidden-sm-and-down">-->
            <!--                  <v-btn flat-->
            <!--                  >Home</v-btn>-->
            <!--              </v-toolbar-items>-->
            <!--              <div id="nav">-->
            <!--                  <router-link to="/">Home</router-link> |-->
            <!--                  <router-link to="/about">About</router-link>-->
            <!--              </div>-->


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
        <!--    <button class="btn btn-danger">-->
        <!--      Hello-->
        <!--    </button>-->

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
        #navcontaner {
            overflow: hidden;

        }
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
            }

            .nav-item {
                color: black;

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
    export default {
        methods: {
            getImg(img) {
                return require('@/assets/images/' + img);
            },
            handleNavigation(info) {
                Event.shout('navigateMovies', info);
            },
            handleScroll ($e) {
                let mdistancetotop=$('#movies').offset().top;
                let tdistancetotop=$('#trending').offset().top;

                if(mdistancetotop>-($('#movies').height()+10)&&mdistancetotop<50){
                    $(".active").removeClass('active');
                    $(".movies").addClass('active');

                }
                else if(tdistancetotop>-($('#trending').height()+10)&&tdistancetotop<50){
                    $(".active").removeClass('active');
                    $(".trending").addClass('active');
                }
                else {
                    $(".active").removeClass('active');
                    $(".home").addClass('active');
                }
            }
    }
    }
</script>