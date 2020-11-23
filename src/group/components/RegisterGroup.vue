<template>

    <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="#0000CD" dark v-on="on">Novo Grupo</v-btn>
        </template>
        <v-card shaped>
            <v-card-title>
                <span class="headline">Cadastre um Novo Grupo</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                    >
                        <v-text-field
                                v-model="group.title"
                                :counter="30"
                                :rules="titleRules"
                                label="Título"
                                required
                        ></v-text-field>
                        <v-btn
                                :disabled="!valid"
                                color="success"
                                class="v-btn--block"
                                v-on:click="createGroup"
                        >
                            Salvar
                        </v-btn>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>
<script>
    import Group from "../datamodel/Group";
    import createGroup from "../services/createGroup";

    export default {
        name: "RegisterGroup",
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
                listGroups: [],
                group: new Group()
            }
        },
        props: {},
        methods: {
            createGroup() {
                createGroup.createGroup(this.group)
                    .then(() => {
                        this.group = new Group();
                        this.dialog = false;
                        this.$emit('list-groups');
                        this.$store.commit('SUCCESS', [{msg: "Grupo Cadastrado com Sucesso!"}]);
                    })
                    .catch(response => {
                        const errors = response.data.errors;
                        this.$store.commit('ERROR', errors);
                    })
            }
        }
    }
</script>

<style scoped>

</style>