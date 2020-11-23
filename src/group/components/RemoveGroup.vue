<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="#FF0000"> mdi-delete</v-icon>
        </template>
        <v-card shaped>
            <v-card-title>
                <span class="headline">Você tem certeza?.</span>
                <span class="headline">Digite <strong>{{group.title}}</strong> para confirmar.</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                    >
                        <v-text-field
                                v-model="groupTitle"
                                :counter="30"
                                :rules="nameRules"
                                label="Nome"
                                required
                        ></v-text-field>

                        <v-btn
                                :disabled="!show"
                                color="success"
                                class="v-btn--block"
                                v-on:click="removeGroup"
                        >
                            Excluir
                        </v-btn>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>

    import Group from "../datamodel/Group";
    import removeGroup from "../services/removeGroup";

    export default {
        name: "RemoveGroup",
        data() {
            return {
                dialog: false,
                valid: true,
                lazy: false,
                nameRules: [
                    v => !!v || 'Nome é Obrigatório',
                    v => (v && v.length <= 30) || 'O nome deve ter no maximo 30 caracteres',
                ],
                groupTitle: ''
            }
        },
        props: {
            group: new Group()
        },
        computed: {
            show() {
                if (this.groupTitle === this.group.title) {
                    return true;
                }
                return false;
            }
        },
        methods: {
            removeGroup() {
                removeGroup.removeGroup(this.groupTitle, this.group._id)
                    .then(() => {
                        this.groupTitle = '';
                        this.dialog = false;
                        this.$emit('list-groups');
                        this.$store.commit('SUCCESS', [{msg: "Grupo Deletado com Sucesso!"}]);
                    })
                    .catch(response => {
                        const errors = response.data.errors;
                        this.$store.commit('ERROR', errors);
                    });
            }
        }
    }
</script>

<style scoped>

</style>