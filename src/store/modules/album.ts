export default {
    state: {
        albumResult: [],
    },
    getters: {
        albumResult(state: any) {
            return state.albumResult;
        },
    },
    mutations: {
        albumResult(state: any, payload: any) {
            state.albumResult = []
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].media_attachments.length > 0) {
                    if (payload[i].media_attachments[0].type === "image") {
                        if (!payload[i].sensitive) {
                            state.albumResult.push(payload[i].media_attachments[0].url);
                        }
                    }
                }
            }

        },
    }


}