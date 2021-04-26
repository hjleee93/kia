
import Vue from "vue";
import store from './../store';

class Toot {

    private ETootLoadingState = {
        none: 0,
        loading: 1,
        complete: 2,
        end: 3,
    }
    private userId = 0;

    async getCurrentUser() {
        let user = await Vue.$api.getCurrentUser();
        this.userId = user.id

    }

    async loadToot(loadingState: any, el: any, recentOrder: string, offset: number, allResult: any[]) {
        console.log(allResult)
        let searchType = await store.getters.searchType;
        let searchInput = await store.getters.searchInput;
        await this.getCurrentUser()
        // let userId = await store.getters.currentUser.id;
        // console.log('getCurrentUser',await this.getCurrentUser())

        // let userId = await this.getCurrentUser()
        if (
            loadingState === this.ETootLoadingState.none ||
            loadingState === this.ETootLoadingState.complete
        ) {
            let max_id = undefined;
            if (allResult.length) {
                max_id = allResult[allResult.length - 1].id;
            }
            loadingState = this.ETootLoadingState.loading;

            let param = {
                account_id: this.userId,
                posting: false,
                limit: 20,
                max_id: recentOrder === "f" ? "" : max_id,
                offset: recentOrder === "f" ? offset : "",
                tag: "",
                username: searchType === "contents" ? "" : searchInput,
                text: searchType === "contents" ? searchInput : "",
                order: recentOrder,
            };
            console.log('param', param)
            await store.dispatch("showToot", param);

            if (store.getters.searchResult.length === 0) {
                loadingState = this.ETootLoadingState.end;
            } else {

                setTimeout(() => {
                    if (el.scrollHeight <= el.clientHeight) {
                        loadingState = this.ETootLoadingState.complete;
                        this.loadToot(loadingState, el, recentOrder, offset, allResult);
                    } else {
                        loadingState = this.ETootLoadingState.complete;
                    }
                }, 100)


            }


            if (store.getters.searchResult.length === 1) {
                offset += store.getters.searchResult.length;
            } else {
                offset += store.getters.searchResult.length - 1;
            }

            allResult.push(...store.getters.searchResult);

            //중복객체 제거
            for (let i = 0; i < allResult.length; i++) {
                for (let j = 0; j < i; j++) {
                    if (allResult[i].id === allResult[j].id) {
                        allResult.splice(i, 1);
                    }
                }
            }
            store.commit("albumResult", allResult);
            store.commit("tootCnt", allResult.length);

        }
        return allResult;
    }

}

export default Toot;