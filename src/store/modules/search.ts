import Vue from "vue";
import store from "..";
export default {
    state: {
        searchResult: [],

        tootCnt: 0,
        searchType: undefined,
        searchInput: undefined,
        sortOrder: 'recent',
        hashtag: undefined,
        searchParam: {}
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
        sortOrder(state: any) {
            return state.sortOrder;
        },
        hashtag(state: any) {
            return state.hashtag;
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
        sortOrder(state: any, payload: any) {
            state.sortOrder = payload;
        },
        hashtag(state: any, payload: any) {
            state.hashtag = payload;
        },

    },
    actions: {
        //@ts-ignore
        resetSearchInfo({ commit }) {
            commit('searchInput', '')
            commit('searchType', 'contents')
            // commit('sortOrder', 'recent')
            commit('hashtag', '')
            commit('searchResult', [])
        },


        //@ts-ignore
        async showToot({ commit, dispatch }, searchParam) {
            let result: any;
            try {
                //@ts-ignore
                result = await Vue.$api.showToot(searchParam);
                commit('searchResult', result)

            } catch (err) {
                dispatch('tootReset')
                console.log(err)
                //TODO: error handling
            }

        },
        //@ts-ignore
        tootReset({ commit }) {
            commit('searchResult', [])
        }
    }
}
