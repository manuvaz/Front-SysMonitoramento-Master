<template>
    <div >
        <v-row justify="center">
            <v-col cols="6" sm="6">
                <h1>Gatilhos</h1>
            </v-col>
            <v-col cols="6" sm="6" align="right">
                <register-trigger v-on:list-trigger="lisTriggerByUserId"></register-trigger>
            </v-col>
            <v-col md="12">
                <h1 class="linhaHori"></h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12" >
                <trigger :triggers="triggers" v-on:list-trigger="listTriggerByUserId"></trigger>
            </v-col>
        </v-row>

        <div>
            <b-table :listTriggers="listTriggers" ></b-table>
        </div>

    </div>
</template>

<script>
    import Trigger from '../components/Trigger';
    import RegisterTrigger from '../components/RegisterTrigger';
    import listTriggerByUserId from '../services/listTriggerByUserId';
    import Vue from 'vue';
    import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';



    export default {
        name: "listTrigger",
        data() {
            return {
                dialog: false,
                valid: true,
                title: '',
                lazy: false,
                titleRules: [
                    v => !!v || 'Título é Obrigatório',
                    v => (v && v.length <= 30) || 'O título deve ter menos de 30 caracteres',
                ],
                listTriggers: [
                  
                ],
                trigger: Object,

                triggers:[]
            }
        },
        components: {
            Trigger,
            RegisterTrigger,
        },
        mounted() {
            this.listTriggerByUserId();
            Vue.use(BootstrapVue);
            Vue.use(IconsPlugin);
        },
        methods: {
            listTriggerByUserId() {
                listTriggerByUserId.listTriggersByUserId()
                    .then(response => {
                        this.listTriggers = response.data;
                    })
                    .catch(response => {
                        const errors = response.data.errors;
                        this.$store.commit('ERROR', errors);
                    })
            }
        },
    }
</script>

<style scoped>
    h1 {
        color: #20B2AA;
    }

    .linhaHori {
        width: 100%; /* coloque aqui a largura da linha */
        border-top: 2px solid #C0C0C0;
        list-style-type: none;
    }
</style>