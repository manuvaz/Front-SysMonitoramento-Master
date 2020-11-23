<template>
    <v-card
            elevation="10"
            width="344"
            height="250"
            class="mx-auto"
            color="#20B2AA"
            dark
    >
        <v-app-bar
                dark
                color="#1a8e88"
        >

            <v-toolbar-title>{{device.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <InputOnOff v-if="device.deviceType === 'RECEPTOR'"
                        :device="device"
                        v-bind:socket="socket"
                        v-on:event-On-Off="onOff"
            ></InputOnOff>
        </v-app-bar>
        <v-card-text height="194" v-if="device.deviceType === 'ISSUER'">
            <h1 class="h1-valor">{{dado}}{{unitOfMeasurement[device.unitOfMeasurement]}}</h1>
        </v-card-text>
        <v-card-text height="194" v-if="device.deviceType === 'RECEPTOR'">
            <h1 class="h1-valor2" v-bind:class="{text_On_Off : valorOnOff === 'Ligado'}">{{valorOnOff}}</h1>
        </v-card-text>

        <v-card-actions>
            <v-btn

                    color="#0000CD"
                    v-on:click="publish"
            >
                Entrar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
                <inset-password :device="device"></inset-password>
            </v-btn>
            <v-btn icon>
                <remove-device :device="device" v-on:list-devices="listDevicesByGroupId"></remove-device>
            </v-btn>
        </v-card-actions>

        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>
<script>
    import InputOnOff from './InputOnOff'
    import InsetPassword from './InsetPassword';
    import RemoveDevice from "./RemoveDevice";
    import Device from "../model/Device";

    export default {
        name: "Device",
        data() {
            return {
                valorOnOff: 'Desligado'
                ,
                dado: '---',
                unitOfMeasurement: {
                    'CELSIUS': 'º',
                    'PERCENT': '%',
                    'QUANTITY': 'ª'
                }
            }
        },
        components: {
            InsetPassword,
            RemoveDevice,
            InputOnOff
        },
        props: {
            device: new Device(),
            socket: Object
        },
        mounted() {
            console.log("ID do Grupo: " + this.device.groupId);
            console.log("ID do Dispositivo: " + this.device._id);
            this.socket.on(this.device._id, (data) => {
                this.dado = data.msg;
            });
        },
        methods: {
            onOff(event) {
                this.valorOnOff = event;
            },
            listDevicesByGroupId() {
                this.$emit('list-devices');
            },
            publish() {
                let data = {
                    deviceId: this.device._id,
                    msg: "Ola Back-End"
                };
                this.socket.emit("publish", data);
            }
        }
    }
</script>

<style scoped>
    .h1-valor2 {
        font-size: 50px;
        text-align: center;
        margin-bottom: 45px;
        margin-top: 30px;
    }

    .h1-valor {
        font-size: 80px;
        text-align: center;
        margin-bottom: 45px;
        margin-top: 30px;
    }
    .text_On_Off{
        color: #00ff00;
    }

    .box {
        text-align: center;
        margin-bottom: 30px;
    }

</style>