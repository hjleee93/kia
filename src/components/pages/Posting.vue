<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar @searchResult="searchResult" />
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
import config from "@/lib/config";

enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}

@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Posting extends Vue {
    private category: string = "Posting";
    private allResult: any[] = [];
    private userId: number = -1;
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
        this.$store.commit("currCategory", "Posting");
        this.userId = await this.getUserId();
        await this.loadToot();
    }

    searchResult(result: any) {
        // this.result = result;
        // console.log("searchResult",this.result);
    }

    async getGridItem() {
        try {
            const result = await this.$api.getMyToots(this.userId);
            this.allResult = result;
        } catch (err) {
            console.log(err);
        }
    }

    async getUserId() {
        if (this.$store.state.user.currentUser === null) {
            await this.$store.dispatch("userStatus", config.token);
        }
        return await this.$store.state.user.currentUser.id;
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

            const result = await this.$api.getMyToots(this.userId);

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
        }
    }

    sortOrder(value: string) {
        console.log("value", value);
    }
}
</script>

<style></style>
