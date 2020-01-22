<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="350">
            <v-card>
                <v-card-title class="headline"><slot name="title"></slot></v-card-title>
                <v-card-text><slot name="quiz"></slot></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red lighten-1" id="nobtn" text @click="fireResults(0)">No</v-btn>
                    <v-btn color="green darken-1" id="yesbtn" text @click="fireResults(1)">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        data(){
            return{
                dialog:true
            }
        },
        methods:{
            fireResults(choice){
                this.$emit('choiceMade',choice);
            }
        }
    }
</script>