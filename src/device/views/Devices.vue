<template>
    <div>
        <v-row justify="center">
            <v-col cols="6" sm="6">
                <h1 class="d-inline pa-2">Grupo {{this.group.title}}</h1>
            </v-col>

            <v-col cols="6" sm="6" align="right">
                <register-device v-on:list-devices="listDevicesByGroupId" :group="this.group"></register-device>
            </v-col>
            <v-col cols="12">
                <h2 class="d-inline pa-2">Receptores</h2>
            </v-col>
            <v-col cols="12">
                <h1 class="linhaHori"></h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="3" v-for="(device,i) in this.devicesReceptor" v-bind:key="i">
                <device :device="device" v-bind:socket="socket" v-on:list-devices="listDevicesByGroupId"></device>
            </v-col>
        </v-row>


        <v-row justify="center">
            <v-col cols="12">
                <h2 class="d-inline pa-2">Emissores</h2>
            </v-col>
            <v-col cols="12">
                <h1 class="linhaHori"></h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="3" v-for="(device,i) in this.devicesIssuer" v-bind:key="i">
                <device :device="device" v-bind:socket="socket" v-on:list-devices="listDevicesByGroupId"></device>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import Device from "../components/Device";
    import RegisterDevice from "../components/RegisterDevice";
    import Group from "../../group/datamodel/Group";
    import listDevicesByGroupId from "../services/listDevicesByGroupId";
    import findGroupById from "../../group/services/findGroupById";
    import io from 'socket.io-client';

    export default {
        name: "Devices",
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
                group: new Group(),
                listDevices: [],
                listListen: [],
                name: '',
                dadoDev: '',
                deviceType: [
                    'ISSUER',
                    'RECEPTOR'
                ],

                unitOfMeasurement: [
                    "CELSIUS",
                    "PERCENT",
                    "QUANTITY"
                ],
                socket: Object
            }
        },
        components: {
            Device,
            RegisterDevice
        },
        computed:{
            devicesIssuer: function () {
                return this.listDevices.filter(function (device) {
                    return device.deviceType === "ISSUER";
                })
            },
            devicesReceptor: function () {
                return this.listDevices.filter(function (device) {
                    return device.deviceType === "RECEPTOR";
                })
            }
        },
        mounted() {
            this.socketIoConnect();
        },
        methods: {
            socketIoConnect() {
                const user = this.$store.getters.authenticatedUser;
                const socket = io('http://127.0.0.1:5000', {
                    query: {
                        token: user.token,
                        groupId: this.$route.params.id
                    }
                });

                socket.on('connect', () => {
                    this.socket = socket;
                    console.log("Conectado ao Socket.Io!");
                    this.findGroupById();
                    this.listDevicesByGroupId();
                });
            },
            findGroupById() {
                findGroupById.findGroupById(this.$route.params.id)
                    .then(response => {
                        this.group = response.data;
                    })
                    .catch(response => {
                        const errors = response.data.errors;
                        this.$store.commit('ERROR', errors);
                    });
            },
            listDevicesByGroupId() {
                listDevicesByGroupId.listDevicesByGroupId(this.$route.params.id)
                    .then(response => {
                        this.listDevices = response.data;
                    })
                    .catch(response => {
                        const errors = response.data.errors;
                        this.$store.commit('ERROR', errors);
                    });
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

    a {
        text-decoration: none;
    }
</style>