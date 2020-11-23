import Vue from 'vue'
import Vuex from 'vuex'
import authenticationStore from "./authenticationStore";
import notificationStore from "./notificationStore";


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        authentication: authenticationStore,
        notificationStore: notificationStore
    }

});

export default store;