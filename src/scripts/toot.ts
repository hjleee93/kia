import Vue from "vue";
import store from './../store';

enum ETootLoadingState {
    none,
    ready,
    loading,
    complete,
    end,
}


export default class Toot {
    event: Vue = new Vue();

    private el: HTMLElement = document.body;
    private limitCount: number = 10;
    private version: number = 0;
    private tag: string = ''
    allResult: any[] = [];
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private offset = 0;

    create(el: HTMLElement) {
        this.el = el;
    }

    newVersion(tag?: string, isSearch?: boolean) {

        if (this.loadingState === ETootLoadingState.none) {
            return;
        }

        this.version++;
        this.allResult = [];
        if (!isSearch) {
            this.event.$emit('resetToot');
        }
        this.offset = 0;
        this.loadingState = ETootLoadingState.ready;
        if (tag) {
            this.tag = tag;
        }
        this.load();

    }
    ready() {
        if (this.loadingState === ETootLoadingState.none) {
            this.loadingState = ETootLoadingState.ready;
        }

    }

    async load() {
        if (this.loadingState === ETootLoadingState.ready
            || this.loadingState === ETootLoadingState.complete) {

            let posting = false;
            let username = '';
            let searchInput = store.getters.searchInput;
            const searchType = store.getters.searchType;
            const recentOrder = store.getters.sortOrder;
            const account_id = store.getters.currentUser.id;
            const currCategory = store.getters.currCategory.toLowerCase();

            if (searchType === "contents" && currCategory === 'posting') {
                posting = true;
                username = store.getters.currentUser.username
            } else if (searchType !== "contents") {
                username = searchInput
            }

            let param = {
                account_id,
                posting: posting,
                limit: this.limitCount,
                offset: this.offset,
                tag: this.tag,
                username: username,
                text: searchType === "contents" ? searchInput : "",
                order: recentOrder === 'popular' ? 'f' : '',
            };

            const reqVersion = this.version;

            const result = await Vue.$api.showToot(param);

            if (reqVersion !== this.version) {
                return;
            }

            this.allResult.push(...result);
            this.event.$emit('addToot', result);
            store.commit('searchResult', this.allResult)
            store.commit("albumResult", this.allResult);
            store.commit("tootCnt", this.allResult.length);
            this.offset += result.length;


            if (result.length < this.limitCount) {
                this.loadingState = ETootLoadingState.end;
            }
            else {
                setTimeout(() => {
                    if (this.el.scrollHeight <= this.el.clientHeight) {
                        this.loadingState = ETootLoadingState.complete;
                        this.load();
                    } else {
                        this.loadingState = ETootLoadingState.complete;
                    }
                }, 200);
            }
        }


    }



}