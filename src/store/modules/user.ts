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
            state.userToken = payload;
        },
        currentUser(state: any, payload: any) {
            state.currentUser = payload;
        }
    },
    actions: {
        //@ts-ignore
        async userStatus({ commit, dispatch }, token) {
            let result: any;
            try {
                result = await Vue.$api.getCurrentUser();
                localStorage.setItem('token', token)
                commit('currentUser', result)
            } catch (err) {
                dispatch('logout')
            }


        },
        //@ts-ignore
        async logout({ commit }) {
            console.log('logout')
            localStorage.removeItem("token");
            commit('userToken', null)
            commit("currentUser", null);
        }


    },
}
