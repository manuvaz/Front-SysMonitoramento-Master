<template>
    <v-bottom-sheet v-model="sheet" inset>
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-on:click="findPassword">mdi-lock</v-icon>
        </template>
        <v-sheet class="text-center" height="200px">
            <div class="my-3">
                <h2>Dados do Dispositivo para conexão MQTT.</h2>
            </div>
            <div class="my-3">
                <label><strong>GroupID : </strong> {{device.groupId}}</label><br>
                <label><strong>DeviceID : </strong> {{device._id}}</label><br>
                <label><strong>Senha : </strong> {{deviceFind.password}}</label>
            </div>
            <v-btn
                    dark
                    color="#0000CD"
                    v-on:click="newPasswordDevice"
            >Mudar Senha
            </v-btn>
        </v-sheet>
    </v-bottom-sheet>

</template>

<script>
    import Device from "../model/Device";
    import findPassword from "../services/findPassword";
    import newPasswordDevice from "../services/newPasswordDevice";
    import cryptoJS from "crypto-js";

    export default {
        name: "Inset",
        data() {
            return {
                sheet: false,
                deviceFind: Object
            }
        },
        props: {
            device: new Device()
        },
        methods: {
            findPassword() {
                findPassword.findPassword(this.device._id)
                    .then(response => {
                        this.deviceFind = response.data;
                        const token = this.$store.getters.authenticatedUser.token;
                        const passwordDec = cryptoJS.AES.decrypt(this.deviceFind.password, token);
                        this.deviceFind.password = passwordDec.toString(cryptoJS.enc.Utf8);
                    })
                    .catch(response => {
                        const errors = response.data.errors;
                        this.$store.commit('ERROR', errors);
                    })
            },
            newPasswordDevice() {
                newPasswordDevice.newPasswordDevice(this.device._id)
                    .then(() => {
                        this.findPassword();
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