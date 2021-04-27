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
            <Grid :key="recentOrder.toString()" :allResult="allResult" />
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

@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Hive extends Vue {
    private Toot: Toot = new Toot();
    private category: string = "Hive";
    private allResult: any[] = [];
    private recentOrder: string = "";
    private el: any;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }

    async mounted() {
        await Vue.$api.getCurrentUser();
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
            console.log("load");
            this.loadToot();
        }
    }

    @Watch("$store.getters.searchInput" || "$store.getters.searchType")
    async loadToot() {
        await this.Toot.loadToot(
            false,
            this.el,
            this.allResult,
            "",
            (allResult: any[]) => {
                this.allResult.push(...allResult);
                this.$store.commit("tootCnt", this.allResult.length);
                console.log("allResult hive", this.allResult);
                console.log("allResult length", this.$store.getters.tootCnt);
            }
        );
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder() {
        this.init();
        this.recentOrder = this.Toot.sortOrder();
        await this.loadToot();
    }
}
</script>

<style></style>
store.commit("albumResult", allResult);
            store.commit("tootCnt", allResult.length);