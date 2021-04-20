import Vue from "vue";

export default {
    state: {
        userToken: null,
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
            state.userToken = payload;
        },
        currentUser(state: any, payload: any) {
            state.currentUser = payload;
        }
    },
    actions: {
        //@ts-ignore
        async userStatus({ commit }) {
            const result = await Vue.$api.getCurrentUser();  
            commit('currentUser', result)
        }

    },
}
