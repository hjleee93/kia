<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category />
                    <div class="sec-grid-top">
                        <BoxGridTop
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
    private limitCount: number = 5;
    private loadingState: ETootLoadingState = ETootLoadingState.none;

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
    async getGridItem() {
        try {
            const result = await this.$api.getMediaTootsOnly();
            this.allResult = result;
           
        } catch (err) {
            console.log(err);
        }
    }

    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            this.loadToot();
        }
    }

    async loadToot() {
        if (
            this.loadingState === ETootLoadingState.none ||
            this.loadingState === ETootLoadingState.complete
        ) {
            let max_id = undefined;
            if (this.allResult.length) {
                max_id = this.allResult[this.allResult.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            const result = await this.$api.getMediaTootsOnly(
                max_id,
                this.limitCount
            );

            if (result.length < this.limitCount) {
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
             this.$store.commit("tootCnt", this.allResult.length);
        }
    }

    sortOrder(value: string) {
        console.log("value", value);
    }
}
</script>

<style></style>
