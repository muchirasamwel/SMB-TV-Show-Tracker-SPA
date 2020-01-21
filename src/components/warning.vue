<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="350" overlay-color="red">
            <v-card color="">
                <v-card-title class="headlinen text-danger"><slot name="title"></slot></v-card-title>
                <v-card-text><slot name="quiz"></slot></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="fireWarning(1)">Okay</v-btn>
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
            fireWarning(choice){
                this.$emit('warningComplete',choice);
            }
        }
    }
</script>