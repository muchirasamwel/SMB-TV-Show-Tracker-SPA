<template>
    <div>
        <div>Movie Image</div>
        <div>Movie Details</div>
        <div>Movie Synopsis</div>
    </div>
</template>
<script>
    export default {
        computed:{
            movie(){
                return this.$store.dispatch('getCurrentMovie');
            }
        }
    }
</script>