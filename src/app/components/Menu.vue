<template>
    <div>
        <!--Barra superior (App Bar)-->
        <v-app-bar app
                   clipped-left
                   color="#20B2AA"
                   dark>

            <!--Botão para mostrar ou esconder o menu lateral (drawer) -->
            <v-app-bar-nav-icon v-if="show" v-on:click="drawer = !drawer"></v-app-bar-nav-icon>

            <!--Logotipo-->
            <v-img src="../assets/logo-simples.png"
                   max-height="80"
                   max-width="80"
                   contain>
            </v-img>
        </v-app-bar>

        <!--Menu lateral (Drawer)-->
        <v-navigation-drawer app
                             clipped
                             v-model="drawer"
                             v-if="show"
                             :expand-on-hover="miniVariant"
                             :mini-variant="miniVariant">
            <v-list nav
                    dense>
                <!--Dados do usuário logado - Avatar-->
                <v-list-item :class="'px-0'">
                    <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{user.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{user.role}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <!--Itens do menu lateral-->
                <v-list-item-group
                        active-class="deep-purple--text text--accent-4">

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Minha Conta</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/groups">
                        <v-list-item-icon>
                            <v-icon>mdi-group</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Grupos</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/triggers">
                        <v-list-item-icon>
                            <v-icon>mdi-group</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Gatilhos</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-on:click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-login</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Sair</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        name: "app-menu",
        components: {},
        data() {
            return {
                drawer: true
            }
        },
        computed: {
            miniVariant() {
                return this.$vuetify.breakpoint.mdAndUp;
            },
            show() {
                const status = this.$store.getters.authenticationStatus;
                if (status == 'AUTHENTICATED') {
                    return true;
                }
                return false;
            },
            user() {
                const authenticatedUser = this.$store.getters.authenticatedUser;
                return authenticatedUser.user;
            }
        }, methods: {
            logout() {
                this.$store.dispatch('logout', () => {
                    this.$router.push('/login');
                })
            }
        }
    }
</script>
<style scoped>

</style>