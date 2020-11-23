<template>
    <v-row align="center">
        <v-row justify="space-around">
            <v-img src="../assets/imagem-nav-bar.png"
                   max-width="600"
                   title="sim.ca"
                   class="margin-img"></v-img>
        </v-row>
        <v-content>
            <v-card class="elevation-24"
                    max-width="400"
                    height="400"
                    raised>
                <v-toolbar flat>
                    <v-row
                            align="center"
                            justify="center">
                        <v-img src="../assets/logo-login.png"
                               max-width="150"
                               title="sim.ca"
                               class="margin-img"
                        ></v-img>
                    </v-row>
                </v-toolbar>
                <v-card-text>
                    <v-form class="margin-img">
                        <v-text-field label="Email"
                                      name="login"
                                      type="text"
                                      v-model="user.email"
                        />
                        <v-text-field id="password"
                                      label="Senha"
                                      name="password"
                                      type="password"
                                      v-model="user.password"
                                      v-on:keyup.enter="authenticate"/>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="#20B2AA"
                           class="v-btn--block"
                           dark
                           v-on:click="authenticate">Login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-content>
    </v-row>
</template>
<script>
    import User from "../../user/datamodel/User";

    export default {
        data() {
            return {
                user: new User()
            }
        },
        props: {
            source: String,
        },
        methods: {
            authenticate() {
                this.$store.dispatch('authenticate', this.user)
                    .then(() => {
                        this.$router.push("/");
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
    .margin-img {
        margin-top: 50px;
    }
</style>