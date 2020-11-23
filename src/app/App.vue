<template>
    <div id="app">
        <v-app>
            <!-- Barra superior e menu lateral (Menu) -->
            <app-menu></app-menu>

            <alert-notification></alert-notification>

            <!-- Conteúdo (views) -->
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>

            <!-- Rodapé (Footer) -->
            <v-content>
                <app-footer></app-footer>
            </v-content>
        </v-app>
    </div>
</template>

<script>
    import AppMenu from "./components/Menu";
    import AppFooter from "./components/Footer";
    import AlertNotification from "./components/AlertNotification";

    export default {
        name: 'App',
        components: {
            AppMenu,
            AppFooter,
            AlertNotification
        },
        data() {
            return {}
        }
    };
</script>
<style scoped>
</style>
