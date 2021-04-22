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
    private limitCount: number = 10;
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

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    @Watch("$store.getters.searchResult")
    async getGridItem() {
        // try {
            // if (this.$store.getters.searchType === "user") {
                const result = await this.$store.getters.searchResult;
                this.allResult = result;
                console.log(' this.allResult', this.allResult)
        //     } else {
        //         const result = await this.$api.getMediaTootsOnly();
        //         this.allResult = result;
        //         console.log(' this.allResult', this.allResult)
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }

    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            this.loadToot();
        }
    }

    async loadToot() {
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
            if (this.$store.getters.searchType === "user") {
                result = await this.$api.searchMedia(
                    this.$store.getters.searchInput,
                    max_id,
                    30
                );
                //this.recentOrder
            } else if (this.$store.getters.searchType === "contents") {
                result = await this.$api.getMediaTootsOnly(
                    max_id,
                    this.limitCount
                );
            } else if (this.recentOrder === true) {
                // console.log('recent')
                result = await this.$api.getMediaTootsOnly(
                    max_id,
                    this.limitCount
                );
            } else if (this.recentOrder === false) {
                result = await this.$api.searchMedia("", max_id, 10);
            }

            if (result.length < this.limitCount) {
                this.loadingState = ETootLoadingState.end;
            } else {
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        const el = document.documentElement;
                        if (el.scrollHeight <= el.clientHeight) {
                            this.loadingState = ETootLoadingState.complete;
                            console.log("???", result.length, this.limitCount);
                            this.loadToot();
                        } else {
                            this.loadingState = ETootLoadingState.complete;
                        }
                    });
                });
            }
            this.allResult.push(...result);
            this.$store.commit("tootCnt", this.allResult.length);
        }
    }

    async sortOrder(value: string) {
        if (value === "popular") {            
            this.recentOrder = false;
            this.init();
            this.loadToot();
            // try {
            //     const result = await this.$api.searchMedia();
            //     this.allResult = result;
            // } catch (err) {
            //     console.log(err);
            // }
        } else if (value === "recent") {
            this.recentOrder = true;
            this.init();
            this.loadToot();
            // try {
            //     const result = await this.$api.getMediaTootsOnly();
            //     this.allResult = result;
            // } catch (err) {
            //     console.log(err);
            // }
        }
    }

    init() {
        this.loadingState = ETootLoadingState.none;
        this.allResult = [];
    }
}
</script>

<style></style>
