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
    private readonly allTag = 'all tag'
    private el: HTMLElement = document.body;
    private limitCount: number = 10;
    private version: number = 0;
    private tag?: string = ''
    private text?: string = ''
    private order: string = ''
    private type: string = ''
    private input: string = ''
    private all?: string;
    private allResult: any[] = [];
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private offset = 0;

    create(el: HTMLElement) {
        this.el = el;
    }

    newVersion(tag?: string) {

        if (tag) {
            if (tag.toLowerCase() === this.allTag) {
                //posting all tag
                if (store.getters.currCategory === 'posting') {
                    this.all = store.getters.postingCategory === 'posting' ? undefined : store.getters.postingCategory;
                    this.tag = undefined
                }
                //posting 제외 all tag 
                else {
                    this.all = store.getters.currCategory
                    this.tag = undefined
                }
            } else {
                this.all = undefined;
                this.tag = tag;
            }
        }
        else {
            this.tag = undefined;
            this.all = undefined
        }
        if (this.loadingState === ETootLoadingState.none) {
            return;
        }

        this.text = store.getters.searchInput
        this.order = store.getters.sortOrder
        this.type = store.getters.searchType
        this.input = store.getters.searchInput

        this.version++;
        this.allResult = [];

        this.offset = 0;
        this.loadingState = ETootLoadingState.ready;
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
            let username = undefined;

            store.commit('hashtag', (!this.tag && store.getters.currCategory !== 'hive') ? this.allTag : this.tag)
            store.commit('searchInput', this.text)
            store.commit('sortOrder', this.order)
            store.commit('searchType', this.type)
            store.commit('searchInput', this.input)

            const searchInput = store.getters.searchInput;
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
                tag: !this.all ? this.tag : undefined,
                username: username,
                text: searchType === "contents" ? (!searchInput || searchInput.length === 0 ? undefined : searchInput) : undefined,
                order: recentOrder === 'popular' ? 'f' : undefined,
                all: this.all

            };

            console.log('load', param)

            //album show 
            store.commit('albumParam', param)

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
                        this.all = undefined;
                    }
                }, 400);

            }
        }

    }
    async albumLoad() {
        if (this.loadingState === ETootLoadingState.ready
            || this.loadingState === ETootLoadingState.complete) {
            let posting = false;
            let username = undefined;


            // store.commit('hashtag', (!this.tag && store.getters.currCategory !== 'hive') ? this.allTag : this.tag)
            // store.commit('searchInput', this.text)
            // store.commit('sortOrder', this.order)
            // store.commit('searchType', this.type)
            // store.commit('searchInput', this.input)

            const searchInput = store.getters.searchInput;
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
            console.log(store.getters.albumParam)
            this.offset = store.getters.albumParam.offset;
            console.log('offset', this.offset)
            let param = {
                account_id,
                posting: store.getters.albumParam.posting,
                limit: this.limitCount,
                offset: store.getters.loadMoreAlbumOffset,
                tag: store.getters.albumParam.tag,
                username: store.getters.albumParam.username,
                text: store.getters.albumParam.searchInput,
                order: store.getters.albumParam.recentOrder,
                all: store.getters.albumParam.all
            };

            console.log(param)

            const reqVersion = this.version;

            const result = await Vue.$api.showToot(param);



            if (reqVersion !== this.version) {
                return;
            }
            //todo: offset수정해야됨

            this.allResult.push(...result);
            // store.commit("albumResult", this.allResult);
            store.commit('loadMoreAlbum', result)

            console.log(this.offset, result.length)
            // this.offset += result.length;
            store.commit('loadMoreAlbumOffset', this.offset + result.length)

            if (result.length < this.limitCount) {
                console.log("끝")
                this.loadingState = ETootLoadingState.end;
            }

        }

    }


}