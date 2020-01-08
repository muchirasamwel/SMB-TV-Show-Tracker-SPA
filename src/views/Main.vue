<template>
    <div class="main">
        <div class="carousel">
            <h1>CAROUSEL</h1>
        </div>
        <div class="trending">
            <h1>TRENDING</h1>
        </div>
        <div class="movies">
            <div class="movienav">
                <h2>Genre and search bar</h2>
            </div>
            <h1>MOVIES LIST</h1>
        </div>
    </div>
</template>
<style lang="scss">
    .main{
        background-color: blue;
        text-align: center;
        height: 177vh;
        h1,h2{
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
            .movienav{
                background-color: cyan;
            }
        }
    }
</style>
<script>
    export default {

    }
</script>