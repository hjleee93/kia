export default {
    state: {
        categories : null,
        currCategory : null,
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
        },
       currCategory(state:any){
           return state.currCategory;
       }
    },
    mutations: {
        categories(state: any, payload: boolean) {
            state.categories = payload;
        },
        currCategory(state: any, payload: any) {
            state.currCategory = payload;
        }
    },
    actions: {},
}
