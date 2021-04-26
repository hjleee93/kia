<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category @tagResult="tagResult" />
                    <div class="sec-grid-top">
                        <BoxGridTop
                            @sortOrder="sortOrder"
                            :tootCnt="tagSearch.length"
                        />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid :allResult="tagSearch" />
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
    tootDropDown,
    getDevice,
} from "@/scripts/ui_common";

enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}
@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Exhibition extends Vue {
    private category: string = "Exhibition";
    private tagSearch: any[] = [];
    private tootCnt: number = -1;
    private limitCount: number = 20;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private recentOrder: string = "";
    private tag: string = "";
    private offset = 0;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        dim.init();
        gnb.init();
    }

    tagResult(result: any) {
        this.tagSearch = result;
    }

    mounted() {
        this.$store.commit("currCategory", "Exhibition");
        this.tag = this.$store.getters.currCategory.toLowerCase();
        this.loadToot();
        window.addEventListener("scroll", this.scrollHandler);
    }
    beforeCreate() {
        this.$store.dispatch("resetSearchInfo");
    }
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    @Watch("$store.getters.searchInput")
    init() {
        this.loadingState = ETootLoadingState.none;
        this.tagSearch = [];
        this.$store.dispatch("tootReset");
    }

    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
            this.loadToot();
        }
    }
    @Watch("$store.getters.searchInput")
    async loadToot() {
        let searchType = this.$store.getters.searchType;
        let searchInput = this.$store.getters.searchInput;
        if (
            this.loadingState === ETootLoadingState.none ||
            this.loadingState === ETootLoadingState.complete
        ) {
            let max_id = undefined;

            if (this.tagSearch.length) {
                max_id = this.tagSearch[this.tagSearch.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            let userId = await this.$store.getters.currentUser.id;

            let param = {
                account_id: userId,
                posting: false,
                limit: this.limitCount,
                max_id: this.recentOrder === "f" ? "" : max_id,
                offset: this.recentOrder === "f" ? this.offset : "",
                tag: this.tag,
                username: searchType === "contents" ? "" : searchInput,
                text: searchType === "contents" ? searchInput : "",
                order: this.recentOrder,
            };

            await this.$store.dispatch("showToot", param);

            if (this.$store.getters.searchResult.length === 0) {
                this.loadingState = ETootLoadingState.end;
            } else {
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$nextTick(() => {
                            const el = document.documentElement;
                            if (el.scrollHeight <= el.clientHeight) {
                                this.loadingState = ETootLoadingState.complete;
                                this.loadToot();
                            } else {
                                this.loadingState = ETootLoadingState.complete;
                            }
                        });
                    });
                }, 300);
            }
            this.offset += this.limitCount;
            this.tagSearch.push(...this.$store.getters.searchResult);
             this.$store.commit("albumResult", this.tagSearch);
            this.$store.commit("tootCnt", this.tagSearch.length);
        }
    }
    @Watch("$store.getters.sortOrder")
    sortOrder(value: string) {
        if (value === "popular") {
            this.offset = 0;
            this.recentOrder = "f";
        } else if (value === "recent") {
            this.recentOrder = "";
        }
        this.init();
        this.loadToot();
    }

    @Watch("$store.getters.hashtag")
    watchHashtag(val: string) {
        this.tag = val;
        this.init();
        this.loadToot();
    }
}
</script>

<style></style>
