import Vue from 'vue'
import App from './app/App.vue'
import router from './router'
import store from './app/store/main'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    beforeCreate() {
        const authenticatedUser = JSON.parse(sessionStorage.getItem("authenticatedUser"));
        if (authenticatedUser) {
            this.$store.commit('AUTHENTICATED', authenticatedUser);
            this.$router.push("/");
        }
    },
    vuetify,
    render: h => h(App)
}).$mount('#app');
