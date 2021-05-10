export default {
    state: {
        isLoading: undefined,
    },
    getters: {
        isLoading(state: any) {
            return state.isLoading;
        },
    },
    mutations: {
        isLoading (state: any, payload: boolean) {
            state.isLoading = payload;
        }
    },
    actions: {},
}
