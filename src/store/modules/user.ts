import Vue from "vue";

export default {
    state: {
        userToken: null,
        currentUser: null,
    },
    getters: {
        userToken(state: any) {
            return state.token;
        },
        currentUser(state: any) {
            return state.currentUser;
        }
    },
    mutations: {
        userToken(state: any, payload: boolean) {
            state.token = payload;
        },
        currentUser(state: any, payload: any) {
            state.currentUser = payload;
        }
    },
    actions: {
        //@ts-ignore
        async userStatus({ commit }, token) {
            const result = await Vue.$api.getCurrentUser(token);      
            commit('currentUser', result)
        }

    },
}
