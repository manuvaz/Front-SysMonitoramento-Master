import authenticationAPI from "../service/authentication";
const AUTHENTICATED = "AUTHENTICATED";
const NO_AUTHENTICATED = "NO_AUTHENTICATED";
const AUTHENTICATION_REJECT = "AUTHENTICATION_REJECT";

export default {
    state: {
        authenticatedUser: {},
        authenticationStatus: NO_AUTHENTICATED
    },
    getters: {
        authenticatedUser: (state) => {
            return state.authenticatedUser;
        },
        authenticationStatus: (state) => {
            return state.authenticationStatus;
        }
    },
    mutations: {
        [AUTHENTICATED](state, authenticatedUser) {
            state.authenticatedUser = authenticatedUser;
            state.authenticationStatus = AUTHENTICATED;
        },
        [NO_AUTHENTICATED](state) {
            state.authenticatedUser = {};
            state.authenticationStatus = NO_AUTHENTICATED;
        },
        [AUTHENTICATION_REJECT](state) {
            state.authenticatedUser = {};
            state.authenticationStatus = AUTHENTICATION_REJECT;
        }

    },
    actions: {
        authenticate({commit}, user) {
            return authenticationAPI.authenticate(user)
                .then((response) => {
                    const authenticatedUser = response.data;
                    sessionStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
                    commit(AUTHENTICATED, authenticatedUser);
                    return response;
                })
                .catch((response) => {
                    commit(AUTHENTICATION_REJECT);
                    throw response;
                })
        },
        logout({commit}, callback){
            sessionStorage.removeItem('authenticatedUser');
            commit(NO_AUTHENTICATED);
            return callback();
        }
    }
}
