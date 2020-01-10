<template>
    <div class="main">
        <div class="carousel">
            <h1>CAROUSEL</h1>
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
                name: 'Home'
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
        },
    }
</script>