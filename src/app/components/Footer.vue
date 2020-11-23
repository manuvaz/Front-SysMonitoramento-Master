<template>

        <v-footer
                  app
                  class="font-weight-medium"
                  v-if="show"
        >
            <v-col class="text-center"
                   cols="12">
                Plataforma de monitoramento e controle de ambientes. Desenvolvida com o framework VueJs, buscando
                automatizar
                o monitoramento e o controle de ambientes em geral.
                {{ new Date().getFullYear() }} — <strong>sim.ca</strong>
            </v-col>
        </v-footer>

</template>

<script>
    export default {
        name: "app-footer",
        computed: {
            show() {
                const status = this.$store.getters.authenticationStatus;
                if (status == 'AUTHENTICATED') {
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>

</style>