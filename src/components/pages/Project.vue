<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar @searchToot="searchToot" />
                    <Category @tagResult="tagResult" />
                    <div class="sec-grid-top">
                        <BoxGridTop @sortOrder="sortOrder" />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid :key="$store.getters.sortOrder" :allResult="tagSearch" />
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

@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Project extends Vue {
    private toot: Toot = new Toot();
    private category: string = "Project";
    private tagSearch: any[] = [];
    private tag: string = "";
    private el: HTMLElement = document.documentElement;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        dim.init();
        gnb.init();
    }
    tagResult(result: any) {
        this.tagSearch = result;
    }
    searchToot() {
        this.toot && this.toot.newVersion(this.category, true);
    }
    
    async mounted() {
        this.$store.commit("currCategory", this.category);

        this.tag = this.$store.getters.currCategory.toLowerCase();

        this.toot.event.$on("addToot", (result: any) => {
            this.tagSearch.push(...result);
        });
        this.toot.event.$on("resetToot", () => {
            this.tagSearch = [];
            this.$store.dispatch("resetSearchInfo");
        });

        this.toot.create(document.documentElement);
        await new Promise<void>((resolve) => {
            const store = this.$store;
            function wait() {
                if (store.getters.currentUser !== null) {
                    resolve();
                } else {
                    setTimeout(wait, 100);
                }
            }
            wait();
        });
        this.toot.ready();
        this.toot.newVersion(this.category);
        window.addEventListener("scroll", this.scrollHandler);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    scrollHandler() {
        if (this.el.scrollTop === 0) {
        } else if (
            this.el.scrollTop + this.el.clientHeight ===
            this.el.scrollHeight
        ) {
            this.toot.load();
        }
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder() {
        this.toot && this.toot.newVersion(this.category);
    }
    @Watch("$store.getters.hashtag")
    watchHashtag(val: string) {
        this.toot && this.toot.newVersion(val);
    }
}
</script>

<style></style>
