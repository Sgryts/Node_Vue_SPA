import Vue from 'vue';
import Vuex from 'vuex';
import persistCredentials from 'vuex-persistedstate';

Vue.use(Vuex);

// interface IStore {
//     strict:boolean,
//     plugins: any[],
//     state:IState,
// }
// interface IState {
//     token: string,
//     user:string,
//     loggedIn: boolean
// }
// TODO: keep genres here
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    // modules: {
    //     genres,
    //     photos,
    //     user
    // }
    plugins: [persistCredentials()],
    state: {
        token: null,
        user: null,
        loggedIn: false,
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token;
            if (token) {
                state.loggedIn = true;
            } else {
                state.loggedIn = false;
            }
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token);
        },
        setUser({commit}, user) {
            commit('setUser', user);
        },
    },
});
