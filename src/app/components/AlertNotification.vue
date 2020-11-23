<template>
    <div>
        <v-snackbar top
                    v-model="showSnackbar"
                    :timeout="timeout"
                    :color="color">

            <v-container>
                <div v-for="(message, i) in messages" v-bind:key="i">
                    {{message.msg}}
                </div>
            </v-container>

            <v-btn text
                   @click="showSnackbar = false">
                FECHAR
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "AlertNotification",
        data() {
            return {
                timeout: 2500
            }
        },
        computed: {
            showSnackbar: {
                get: function () {
                    const notificationStatus = this.$store.getters.notificationStatus;

                    if (notificationStatus === 'HIDE') {
                        return false;
                    }
                    return true;
                },
                set: function () {
                    this.$store.commit('HIDE');
                }
            },
            messages() {
                return this.$store.getters.notificationMessages;
            },
            color() {
                const notificationStatus = this.$store.getters.notificationStatus;
                if (notificationStatus === 'ERROR') {
                    return 'error';
                }
                if (notificationStatus === 'SUCCESS') {
                    return 'success';
                }
                if (notificationStatus === 'WARNING') {
                    return 'warning';
                }
                return 'primary';
            }
        }
    }
</script>

<style scoped>

</style>