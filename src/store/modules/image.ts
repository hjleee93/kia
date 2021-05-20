export default {
    state: {
        sharedImg: [],
    },
    getters: {
        sharedImg(state: any) {
            return state.sharedImg;
        },

    },
    mutations: {
        sharedImg(state: any, payload: any) {
            if (payload && payload.length === 0) {
                state.sharedImg = []
            } else {
                state.sharedImg = payload;

            }
        },

    },
    actions: {},
}
