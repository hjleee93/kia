import Vue from "vue";

export default {
    state: {
        userToken: localStorage.getItem('token'),
        currentUser: null,
    },
    getters: {
        userToken(state: any) {
            return state.userToken;
        },
        currentUser(state: any) {
            return state.currentUser;
        }
    },
    mutations: {
        userToken(state: any, payload: boolean) {

            // localStorage.setItem('token', state.userToken)

            state.userToken = payload;
        },
        currentUser(state: any, payload: any) {
            state.currentUser = payload;
        }
    },
    actions: {
        //@ts-ignore
        async userStatus({ commit }, token) {
            localStorage.setItem('token', token)
            const result = await Vue.$api.getCurrentUser();            
            commit('currentUser', result)

        },
        //@ts-ignore
        logout({ commit }) {
            localStorage.removeItem("token");
            commit('userToken', null)
            commit("currentUser", null);
        }


    },
}
