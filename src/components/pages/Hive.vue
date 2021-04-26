<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category />
                    <div class="sec-grid-top">
                        <BoxGridTop @sortOrder="sortOrder" />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid :allResult="allResult" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Category from "@/components/layouts/Category.vue";
import Grid from "@/components/layouts/grid/Grid.vue";
import BoxGridTop from "@/components/layouts/grid/BoxGridTop.vue";
import SearchBar from "@/components/layouts/SearchBar.vue";
import {
    dim,
    gnb,
    hashDropDown,
    search,
    tootDropDown,
    getDevice,
} from "@/scripts/ui_common";
import Toot from "@/scripts/toot";
enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}

@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Hive extends Vue {
    private Toot: Toot = new Toot();
    private category: string = "Hive";
    private allResult: any[] = [];
    private limitCount: number = 20;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private recentOrder: string = "";
    private el: any;
    private offset = 1;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }

    async mounted() {
        this.$store.commit("currCategory", "Hive");
        this.init();
        this.loadToot();

        window.addEventListener("scroll", this.scrollHandler);
    }

    async beforeCreate() {
        this.$store.dispatch("resetSearchInfo");
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    @Watch("$store.getters.searchInput" || "$store.getters.searchType")
    init() {
        this.loadingState = ETootLoadingState.none;
        this.allResult = [];
        this.el = document.documentElement;
        this.$store.dispatch("tootReset");
    }

    scrollHandler() {
        if (this.el.scrollTop === 0) {
        } else if (
            this.el.scrollTop + this.el.clientHeight >=
            this.el.scrollHeight - 100
        ) {
            this.loadToot();
        }
    }

    //   @Watch()
    @Watch("$store.getters.searchInput" || "$store.getters.searchType")
    async loadToot() {
        // let searchType = this.$store.getters.searchType;
        // let searchInput = this.$store.getters.searchInput;
        // let userId = await Vue.$api.getCurrentUser();
        console.log("allresutl;,m ", this.allResult);
        this.allResult = await this.Toot.loadToot(
            this.loadingState,
            this.el,
            this.recentOrder,
            this.offset,
            this.allResult
        );
        // if (
        //     this.loadingState === ETootLoadingState.none ||
        //     this.loadingState === ETootLoadingState.complete
        // ) {
        //     let max_id = undefined;
        //     if (this.allResult.length) {
        //         max_id = this.allResult[this.allResult.length - 1].id;
        //     }
        //     this.loadingState = ETootLoadingState.loading;

        //     let param = {
        //         account_id: userId.id,
        //         posting: false,
        //         limit: this.limitCount,
        //         max_id: this.recentOrder === "f" ? "" : max_id,
        //         offset: this.recentOrder === "f" ? this.offset : "",
        //         tag: "",
        //         username: searchType === "contents" ? "" : searchInput,
        //         text: searchType === "contents" ? searchInput : "",
        //         order: this.recentOrder,
        //     };

        //     await this.$store.dispatch("showToot", param);

        //     if (this.$store.getters.searchResult.length === 0) {
        //         this.loadingState = ETootLoadingState.end;
        //     } else {
        //         setTimeout(() => {
        //             this.$nextTick(() => {
        //                 this.$nextTick(() => {
        //                     console.log(
        //                         this.el.scrollHeight,
        //                         this.el.clientHeight
        //                     );
        //                     if (this.el.scrollHeight <= this.el.clientHeight) {
        //                         this.loadingState = ETootLoadingState.complete;
        //                         this.loadToot();
        //                     } else {
        //                         this.loadingState = ETootLoadingState.complete;
        //                     }
        //                 });
        //             });
        //         }, 300);
        //     }
        //     if (this.$store.getters.searchResult.length === 1) {
        //         this.offset += this.$store.getters.searchResult.length;
        //     } else {
        //         this.offset += this.$store.getters.searchResult.length - 1;
        //     }

        //     this.allResult.push(...this.$store.getters.searchResult);

        //     //중복객체 제거
        //     for (let i = 0; i < this.allResult.length; i++) {
        //         for (let j = 0; j < i; j++) {
        //             if (this.allResult[i].id === this.allResult[j].id) {
        //                 this.allResult.splice(i, 1);
        //             }
        //         }
        //     }
        //     console.log("loadToot", this.Toot.loadToot());
        //     this.$store.commit("albumResult", this.allResult);
        //     this.$store.commit("tootCnt", this.allResult.length);
        // }
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder(value: string) {
        if (value === "popular") {
            this.offset = 1;
            this.recentOrder = "f";
        } else if (value === "recent") {
            this.recentOrder = "";
        }
        this.init();
        this.loadToot();
    }
}
</script>

<style></style>
