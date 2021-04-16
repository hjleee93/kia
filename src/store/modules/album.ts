export default {
    state: {
       albumShowclicked: null
    },
    getters:{
        albumShowclicked(state: any){
            return state.albumShowclicked;
        }
    },
    mutations:{
        albumShowclicked(state: any, payload: boolean){
            state.albumShowclicked = payload;
        }
    }


}