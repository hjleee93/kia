export default {
    state: {
        token : null,
    },
    getters: {
        token(state: any) {
            return state.token;
        },
    },
    mutations: {
        token(state: any, payload: boolean) {
            state.token = payload;
        },
    },
    actions: {},
}
