export default {
    state: {
        categories : null,
    },
    getters: {
        categories(state: any) {
            return state.categories;
        },
        category : (state: any) => (name : string) => {
            const category = state.categories.find( (ca:any) => ca.name === name );
            if( category ) {
                return category;
            }
        }
    },
    mutations: {
        categories(state: any, payload: boolean) {
            state.categories = payload;
        },
    },
    actions: {},
}
