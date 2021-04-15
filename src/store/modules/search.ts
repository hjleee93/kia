export default {
    state: {
      searchResult: undefined
    },
    getters: {      
        searchResult(state:any){
           return state.searchResult;
       }
    },
    mutations: {       
        searchResult(state: any, payload: any) {
            state.searchResult = payload;
        }
    },
    actions: {},
}
