<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="#FF0000"> mdi-delete</v-icon>
        </template>
        <v-card shaped>
            <v-card-title>
                <span class="headline">Você tem certeza?.</span>
                <span class="headline">Digite <strong>{{device.name}}</strong> para confirmar.</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                    >
                        <v-text-field
                                v-model="deviceName"
                                :counter="30"
                                :rules="nameRules"
                                label="Nome"
                                required
                        ></v-text-field>

                        <v-btn
                                :disabled="!show"
                                color="success"
                                class="v-btn--block"
                                v-on:click="removeDevice"
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
    import Device from "../model/Device";
    import removeDevice from "../services/removeDevice";

    export default {
        name: "RemoveDevice",
        data() {
            return {
                dialog: false,
                valid: true,
                lazy: false,
                nameRules: [
                    v => !!v || 'Nome é Obrigatório',
                    v => (v && v.length <= 30) || 'O nome deve ter no maximo 30 caracteres',
                ],
                deviceName: ''
            }
        },
        props: {
            device: new Device()
        },
        computed: {
            show() {
                return this.deviceName === this.device.name;

            }
        },
        methods: {
            removeDevice() {
                removeDevice.removeDevice(this.deviceName, this.device._id)
                    .then(() => {
                        this.deviceName = '';
                        this.dialog = false;
                        this.$emit('list-devices');
                        this.$store.commit('SUCCESS', [{msg: "Dispositivo Deletado com Sucesso!"}]);
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