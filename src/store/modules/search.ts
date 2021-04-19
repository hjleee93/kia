export default {
    state: {
      searchResult: undefined,
      tootCnt: 0,
      
    },
    getters: {      
        searchResult(state:any){
           return state.searchResult;
       },
       tootCnt(state:any){
           return state.tootCnt;
       }
       
    },
    mutations: {       
        searchResult(state: any, payload: any) {
            state.searchResult = payload;
        },
        tootCnt(state: any, payload: any) {
            state.tootCnt = payload;
        }
    },
    actions: {},
}
