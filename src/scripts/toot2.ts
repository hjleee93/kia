import Vue from "vue";
import store from './../store';

enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}


export default class Toot2 {
    event : Vue = new Vue();

    private el: HTMLElement = document.body;
    private limitCount: number = 1;
    private version : number = 0;

    allResult: any[] = [];
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private offset = 0;

    create( el : HTMLElement ) {
        this.el = el;
    }

    newVersion() {
        this.version++;
        this.allResult = [];
        this.event.$emit('resetToot');
        this.offset = 0;
        this.loadingState = ETootLoadingState.none;
        this.load();
    }

    async load() {
        if( this.loadingState === ETootLoadingState.none
            || this.loadingState === ETootLoadingState.complete ) {

            const searchType = store.getters.searchType;
            const searchInput = store.getters.searchInput;
            const recentOrder = store.getters.sortOrder;
            const account_id = store.getters.currentUser.id;

            let param = {
                account_id,
                posting: false,
                limit: this.limitCount,
                offset: this.offset,
                tag: "",
                username: searchType === "contents" ? "" : searchInput,
                text: searchType === "contents" ? searchInput : "",
                order: recentOrder === 'popular' ? 'f' : '',
            };

            const reqVersion = this.version;
            const result = await Vue.$api.showToot(param);
            console.log( reqVersion, this.version );
            if( reqVersion !== this.version ) {
                return;
            }



            this.allResult.push( ...result );
            this.event.$emit('addToot', result);
            store.commit("albumResult", this.allResult);
            store.commit("tootCnt", this.allResult.length);

                        this.offset += this.allResult.length;
            if( result.length < this.limitCount ) {
                this.loadingState = ETootLoadingState.end;
            }
            else {
                setTimeout( ()=>{
                    if (this.el.scrollHeight <= this.el.clientHeight) {
                        this.loadingState = ETootLoadingState.complete;
                        this.load();
                    } else {
                        this.loadingState = ETootLoadingState.complete;
                    }
                }, 200 );
            }
        }


    }
}
