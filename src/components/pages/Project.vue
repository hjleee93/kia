<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category @tagResult="tagResult" />
                    <div class="sec-grid-top">
                        <BoxGridTop @sortOrder="sortOrder" />
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
import Grid from "../layouts/grid/Grid.vue";
import BoxGridTop from "../layouts/grid/BoxGridTop.vue";
import SearchBar from "../layouts/SearchBar.vue";
import Toot from "@/scripts/toot";
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
export default class Project extends Vue {
    private Toot: Toot = new Toot();
    private category: string = "Project";
    private tagSearch: any[] = [];
    private limitCount: number = 20;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private recentOrder: string = "";
    private tag: string = "";

    private el: any;
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
        this.$store.commit("currCategory", "Project");
        this.tag = this.$store.getters.currCategory.toLowerCase();
        this.init();
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
        this.el = document.documentElement;
        this.tagSearch = [];
        this.$store.dispatch("tootReset");
    }

    scrollHandler() {
        if (this.el.scrollTop === 0) {
        } else if (
            this.el.scrollTop + this.el.clientHeight >=
            this.el.scrollHeight - 150
        ) {
            this.loadToot();
        }
    }

    @Watch("$store.getters.searchInput")
    async loadToot() {
        await this.Toot.loadToot(
            false,
            this.el,
            this.tagSearch,
            this.tag,
            (allResult: any[]) => {
                console.log("allResult", this.tagSearch);
                this.tagSearch.push(...allResult);
            }
        );
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder() {
        this.init();
        this.recentOrder = this.Toot.sortOrder();
        await this.loadToot();
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
