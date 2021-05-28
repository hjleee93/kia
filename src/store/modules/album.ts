export default {
    state: {
        albumResult: [],
        albumShowState: null,
        moreAlbumResult: [],
        albumShowScrollEl: '',
        albumOffset : null,
    },
    getters: {
        albumResult(state: any) {
            return state.albumResult;
        },
        albumShowState(state: any) {
            return state.albumShowState;
        },
        moreAlbumResult(state: any) {
            return state.moreAlbumResult;
        },
        albumShowScrollEl(state: any) {
            return state.albumShowScrollEl;
        },
        albumOffset(state: any) {
            return state.albumOffset;
        },
        
    },
    mutations: {
        albumResult(state: any, payload: any) {
            state.albumResult = []
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].media_attachments.length > 0) {
                    if (payload[i].media_attachments[0].type === "image") {
                        if (!payload[i].sensitive) {                            
                            state.albumResult.push({url: payload[i].media_attachments[0].url, id:payload[i].id});
                        }
                    }
                }
            }

        },
        albumShowState(state: any, payload: any) {
            state.albumShowState = payload;
        },
        moreAlbumResult(state: any, payload: any) {
            state.moreAlbumResult = []
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].media_attachments.length > 0) {
                    if (payload[i].media_attachments[0].type === "image") {
                        if (!payload[i].sensitive) {                            
                            state.moreAlbumResult.push({url: payload[i].media_attachments[0].url, id:payload[i].id});
                        }
                    }
                }
            }

        },
        albumShowScrollEl(state: any, payload: any) {
            state.albumShowScrollEl = payload;
        },
        albumOffset(state: any, payload: any) {
            state.albumOffset = payload;
        },
    }


}