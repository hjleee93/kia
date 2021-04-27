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
import Toot from "@/scripts/toot";

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
    private Toot: Toot = new Toot();
    private category: string = "Posting";
    private allResult: any[] = [];
    private recentResult: any[] = [];
    private limitCount: number = 20;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private recentOrder: string = "";
    private offset = 0;
    private el: any;

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
        this.init();
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

    tagResult(result: any) {
        this.allResult = result;
    }

    @Watch("$store.getters.searchInput")
    async loadToot() {
        await this.Toot.loadToot(
            true,
            this.el,
            this.allResult,
            "",
            (allResult: any[]) => {
                console.log("allResult", this.allResult);
                this.allResult.push(...allResult);
            }
        );
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder() {
        this.init();
        this.recentOrder = this.Toot.sortOrder();
        await this.loadToot();
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
