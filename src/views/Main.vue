<template>
    <div class="main">
        <div class="carousel">
            <v-app>
                <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
                >
                    <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                    :src="getImg(slide.image)"
                    >
                        <p>Heru</p>
                    </v-carousel-item>
                </v-carousel>
            </v-app>
        </div>
        <div class="trending">
            <h1>TRENDING</h1>
        </div>
        <keep-alive>
            <component v-bind:is="component"/>
        </keep-alive>
        <button @click="switchhome">View Movie</button>
    </div>
</template>
<style lang="scss">
    .main {
        background-color: blue;
        text-align: center;
        height: 177vh;

        h1, h2 {
            color: white;
            text-shadow: 2px 2px 3px black;
        }

        .carousel {
            height: 30%;
            overflow: hidden;
        }

        .trending {
            height: 20%;
            background-color: black;
        }

        .movies {
            background-color: yellow;
            height: 50%;

            .movienav {
                background-color: cyan;
            }
        }
    }
</style>
<script>
    import Home1 from "./Movies.vue";
    import Home2 from "./MovieView.vue";

    export default {
        name: "Main",
        components: {
            Home1, Home2
        },
        data() {
            return {
                component: "Home1",
                showpop: false,
                name: 'Home',
                slides:[
                    {image:'bootcamp.jpg'},
                    {image:'field.jpg'},
                    {image:'dream.jpg'},
                    {image:'code back.jpeg'},
                    {image:'peace.jpg'}
                ]
            }
        },
        methods: {
            switchhome: function () {
               // alert("got it");
                if (this.component === Home1) {
                    this.component = Home2;
                } else {
                    this.component = Home1;
                }
            },
            getImg(img){
                return require('@/assets/images/'+img);
            }
        },
    }
</script>