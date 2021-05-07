import Vue from "vue";

export default {
    state: {
        categories: null,
        currCategory: null,
        postingCategory: null,
    },
    getters: {
        categories(state: any) {
            return state.categories;
        },
        category: (state: any) => (name: string) => {
            const category = state.categories.find((ca: any) => ca.name === name);
            if (category) {
                return category;
            }
        },
        currCategory(state: any) {
            return state.currCategory;
        },
        postingCategory(state: any) {
            return state.postingCategory;
        }

    },
    mutations: {
        categories(state: any, payload: any) {
            state.categories = payload;
        },
        currCategory(state: any, payload: any) {
            state.currCategory = payload;
        },
        postingCategory(state: any, payload: any) {
            state.postingCategory = payload;
        }
    },
    actions: {
        //@ts-ignore
        categories({ commit }) {
            const result = Vue.$api.getCategory();
            commit('categories', result)
        }

    },
}
