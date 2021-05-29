export default {
    state: {
        albumResult: [],
        loadMoreAlbum:[],
        albumParam:null,
        loadMoreAlbumOffset: 0,
    },
    getters: {
        albumResult(state: any) {
            return state.albumResult;
        },
        loadMoreAlbum(state: any) {
            return state.loadMoreAlbum;
        },
        albumParam(state: any) {
            return state.albumParam;
        },
        loadMoreAlbumOffset(state: any) {
            return state.loadMoreAlbumOffset;
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
        loadMoreAlbum(state: any, payload: any) {
            state.loadMoreAlbum = []
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].media_attachments.length > 0) {
                    if (payload[i].media_attachments[0].type === "image") {
                        if (!payload[i].sensitive) {                            
                            state.loadMoreAlbum.push({url: payload[i].media_attachments[0].url, id:payload[i].id});
                        }
                    }
                }
            }

        },
        albumParam(state: any, payload: any) {
            state.albumParam = payload;
        },
        loadMoreAlbumOffset(state: any, payload: any) {
            state.loadMoreAlbumOffset = payload;
        },
    }


}