export default {
    state: {
        sharedImg: null
    },
    getters: {
        sharedImg(state: any) {
            return state.sharedImg;
        },

    },
    mutations: {
        sharedImg(state: any, payload: boolean) {
            state.sharedImg = payload;
        },

    },
    actions: {},
}
