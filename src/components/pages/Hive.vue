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
    private category: string = "Hive";
    private allResult: any[] = [];
    private limitCount: number = 100;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private recentOrder: boolean = true;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }

    async mounted() {
        this.$store.commit("currCategory", "Hive");
        this.loadToot();

        window.addEventListener("scroll", this.scrollHandler);
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
    }

    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            this.loadToot();
        }
    }

    @Watch("$store.getters.searchInput" || "$store.getters.searchType")
    async loadToot(): Promise<void> {
        let searchType = "contents";
        let searchInput = "";
        if (this.$store.getters.searchType !== undefined) {
            searchType = this.$store.getters.searchType;
        }

        if (this.$store.getters.searchInput !== undefined) {
            searchInput = this.$store.getters.searchInput;
        }

        let result: any[] = [];
        if (
            this.loadingState === ETootLoadingState.none ||
            this.loadingState === ETootLoadingState.complete
        ) {
            let max_id = undefined;

            if (this.allResult.length) {
                max_id = this.allResult[this.allResult.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            let param = {};

            if (searchType === "user") {
                if (this.recentOrder === true) {
                    result = await this.$api.searchAllMedia(
                        searchInput,
                        max_id,
                        this.limitCount
                    );
                } else {
                    result = await this.$api.searchAllMedia(
                        searchInput,
                        max_id,
                        this.limitCount,
                        "",
                        "f"
                    );
                }
            } else if (searchType === "contents") {
                if (this.recentOrder === true) {
                    if (searchInput.length === 0) {
                        result = await this.$api.searchAllMedia(
                            "",
                            max_id,
                            this.limitCount
                        );
                    } else {
                        result = await this.$api.searchAllMedia(
                            "",
                            max_id,
                            this.limitCount,
                            "",
                            searchInput
                        );
                    }
                } else {

                    result = await this.$api.searchAllMedia(
                        "",
                        max_id,
                        this.limitCount,
                        "",
                        searchInput,
                        "f"
                    );
                }
            }

            if (result.length === 0) {
                this.loadingState = ETootLoadingState.end;
            } else {
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
            }
            this.allResult.push(...result);
             this.$store.commit("searchResult", this.allResult);
            this.$store.commit("tootCnt", this.allResult.length);
        }
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder(value: string) {
        if (value === "popular") {
            this.recentOrder = false;
            this.init();
            this.loadToot();
        } else if (value === "recent") {
            this.recentOrder = true;
            this.init();
            this.loadToot();
        }
    }
}
</script>

<style></style>
