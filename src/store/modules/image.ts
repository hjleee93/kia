export default {
    state: {
        sharedImg: [],
        sharedImgFile: [],
    },
    getters: {
        sharedImg(state: any) {
            return state.sharedImg;
        },
        sharedImgFile(state: any) {
            return state.sharedImgFile;
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
        sharedImgFile(state: any, payload: any) {
            if (payload && payload.length === 0) {
                state.sharedImgFile = []
            } else {
                state.sharedImgFile = payload;

            }
        },

    },
    actions: {},
}
