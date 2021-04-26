
import Vue from "vue";
import store from './../store';

class Toot {

    private ETootLoadingState = {
        none: 0,
        loading: 1,
        complete: 2,
        end: 3,
    }
    private userId: number = 0;
    private count: number = 0;
    private offset: number = 0;
    private recentOrder: string = '';
    private limitcount: number = 20;
    private loadingState: number = this.ETootLoadingState.none;

    async getCurrentUser() {
        let user = await Vue.$api.getCurrentUser();
        this.userId = user.id
    }

    init() {
        // 이전 상태가 달라질때 마다 호출 
        this.offset = 0;
        this.recentOrder = '';
        this.loadingState = this.ETootLoadingState.none;
        store.commit("albumResult", []);
        store.commit("tootCnt", 0);
        store.commit("searchResult", []);
        this.count++;


    }

    sortOrder() {
        let value = store.getters.sortOrder
        this.init();
        console.log('value', value)
        if (value === "popular") {
            this.recentOrder = "f";
        } else if (value === "recent") {
            this.recentOrder = "";
        }
        return this.recentOrder
    }

    async loadToot(el: any, allResult: any, tag?: string, call?: Function) {
        this.userId = store.getters.currentUser.id
        let searchType = store.getters.searchlType;
        let searchInput = store.getters.searchInput;


        if (
            this.loadingState === this.ETootLoadingState.none ||
            this.loadingState === this.ETootLoadingState.complete
        ) {
            let max_id = undefined;
            if (allResult.length) {
                max_id = allResult[allResult.length - 1].id;
            }

            let param = {
                account_id: this.userId,
                posting: false,
                limit: 20,

                offset: this.offset,
                tag: tag,
                username: searchType === "contents" ? "" : searchInput,
                text: searchType === "contents" ? searchInput : "",
                order: this.recentOrder,
            };
            // await store.dispatch("showToot", param);
            //이전 상태 감지

            const prevCount = this.count; // 
            this.loadingState = this.ETootLoadingState.loading;
            const result = await Vue.$api.showToot(param);
            console.log(prevCount, this.count)
            //이전이랑 현재 상태랑 비교해서 
            if (this.count !== prevCount) {
                //다르면 무시
                return;
            }

            // store.commit('searchResult', result);
            call && call(result);
            this.offset += result.length;

            // allResult.push(...result);
            store.commit("albumResult", allResult);
            store.commit("tootCnt", allResult.length);


            //hive 로 result 보내고 
            if (result.length < this.limitcount) {
                this.loadingState = this.ETootLoadingState.end;
            } else {
                setTimeout(() => {
                    this.loadingState = this.ETootLoadingState.complete;

                    if (el.scrollHeight <= el.clientHeight) {
                        this.loadToot(el, result, tag, call);
                    }



                }, 200);
            }
        }


        return allResult;
    }

}

export default Toot;