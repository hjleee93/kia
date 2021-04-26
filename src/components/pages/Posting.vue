<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <CategoryP @category="getCategory" />
                    <div class="sec-grid-top">
                        <BoxGridTop
                            :tootCnt="allResult.length"
                            @sortOrder="sortOrder"
                        />
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
import CategoryP from "@/components/layouts/posting/CategoryP.vue";
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

enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}

@Component({
    components: { SearchBar, CategoryP, Grid, BoxGridTop },
})
export default class Posting extends Vue {
    private category: string = "Posting";
    private allResult: any[] = [];
    private recentResult: any[] = [];
    private limitCount: number = 20;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private recentOrder: string = "";
    private offset = 0;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }
    async mounted() {
        window.addEventListener("scroll", this.scrollHandler);
        this.$store.commit("currCategory", "Posting");
        await this.loadToot();
    }
    @Watch("recentResult")
    @Watch("allResult")
    result() {
        if (this.recentResult.length > 0) {
            this.allResult = this.recentResult;
        }
    }

    beforeCreate() {
        this.$store.dispatch("resetSearchInfo");
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    @Watch("$store.getters.searchType")
    @Watch("$store.getters.searchInput")
    init() {
        this.loadingState = ETootLoadingState.none;
        this.allResult = [];
        this.$store.dispatch("tootReset");
    }
    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            this.loadToot();
        }
    }

    tagResult(result: any) {
        this.allResult = result;
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

            if (this.allResult.length) {
                max_id = this.allResult[this.allResult.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            let userInfo = await this.$store.getters.currentUser;

            let param = {
                account_id: userInfo.id,
                posting: true,
                limit: this.limitCount,
                max_id: this.recentOrder === "f" ? "" : max_id,
                offset: this.recentOrder === "f" ? this.offset : "",
                tag: this.category === "Posting" ? "" : this.category,
                username: userInfo.username,
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
                }, 400);
            }
            this.offset += this.limitCount;
            this.allResult.push(...this.$store.getters.searchResult);
            this.$store.commit("albumResult", this.allResult);
            this.$store.commit("tootCnt", this.allResult.length);
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

    getCategory(val: string) {
        this.category = val;
        this.init();
        this.loadToot();
    }

    @Watch("$store.getters.hashtag")
    watchHashtag(val: string) {
        this.category = val;
        this.init();
        this.loadToot();
    }
}
</script>

<style></style>
