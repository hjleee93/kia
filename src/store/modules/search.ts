export default {
    state: {
        searchResult: undefined,
        tootCnt: 0,
        searchType: undefined,
        searchInput: undefined,

    },
    getters: {
        searchResult(state: any) {
            return state.searchResult;
        },
        tootCnt(state: any) {
            return state.tootCnt;
        },

        searchType(state: any) {
            return state.searchType;
        },
        
        searchInput(state: any) {
            return state.searchInput;
        },

    },
    mutations: {
        searchResult(state: any, payload: any) {
            state.searchResult = payload;
        },
        tootCnt(state: any, payload: any) {
            state.tootCnt = payload;
        },
        searchType(state: any, payload: any) {
            state.searchType = payload;
        },
        searchInput(state: any, payload: any) {
            state.searchInput = payload;
        },
    },
    actions: {},
}
