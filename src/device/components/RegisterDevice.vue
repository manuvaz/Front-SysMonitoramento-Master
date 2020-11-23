<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="#0000CD" dark v-on="on">Novo Dispositivo</v-btn>
        </template>
        <v-card shaped>
            <v-card-title>
                <span class="headline">Cadastre um Novo Dispositivo</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                    >
                        <v-text-field
                                v-model="device.name"
                                :counter="30"
                                :rules="nameRules"
                                label="Nome"
                                required
                        ></v-text-field>
                        <v-select
                                v-model="device.deviceType"
                                :items="deviceType"
                                :rules="[v => !!v || 'Tipo do Dispositivo é Obrigatório']"
                                label="Tipo de Dispositivo"
                                required
                        ></v-select>

                        <v-select
                                v-if="device.deviceType === 'ISSUER'"
                                v-model="device.unitOfMeasurement"
                                :items="unitOfMeasurement"
                                :rules="[v => !!v || 'Unidade de Medida é Obrigatório']"
                                label="Unidade de Medida"
                                required
                        ></v-select>

                        <v-btn
                                :disabled="!valid"
                                color="success"
                                class="v-btn--block"
                                v-on:click="createDevice"
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
    import Group from "../../group/datamodel/Group";
    import Device from "../model/Device";
    import createDevice from "../services/createDevice";

    export default {
        name: "RegisterDevice",
        data() {
            return {
                dialog: false,
                valid: true,
                selectDevice: null,
                selectUnitOfMeasurement: null,
                checkbox: false,
                lazy: false,
                nameRules: [
                    v => !!v || 'Nome é Obrigatório',
                    v => (v && v.length <= 30) || 'O nome deve ter menos de 30 caracteres',
                ],
                listDevices: [],
                device: new Device(),
                name: '',
                deviceType: [
                    'ISSUER',
                    'RECEPTOR'
                ],
                unitOfMeasurement: [
                    "CELSIUS",
                    "PERCENT",
                    "QUANTITY"
                ],
            }
        },
        props: {
            group: new Group()
        },
        methods: {
            createDevice() {
                this.device.groupId = this.group._id;
                if (this.device.deviceType ===  'RECEPTOR') {
                    delete this.device.unitOfMeasurement;
                }
                createDevice.createDevice(this.device)
                    .then(() => {
                        this.device = new Device;
                        this.$emit('list-devices');
                        this.dialog = false;
                        this.$store.commit('SUCCESS', [{msg: "Dispositivo Cadastrado com Sucesso!"}]);
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