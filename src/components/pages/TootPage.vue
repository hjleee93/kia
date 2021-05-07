<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar @searchToot="searchToot" />
                    <template v-if="$store.getters.currCategory === 'posting'">
                        <CategoryP @category="getCategory" />
                    </template>
                    <template v-else>
                        <Category />
                    </template>
                    <div class="sec-grid-top">
                        <BoxGridTop @sortOrder="sortOrder" />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid :key="key" :allResult="allResult" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Category from "@/components/layouts/Category.vue";
import CategoryP from "@/components/layouts/posting/CategoryP.vue"; // posting 용 카테고리
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
    components: { SearchBar, Category, Grid, BoxGridTop, CategoryP },
})
export default class Hive extends Vue {
    private toot: Toot = new Toot();
    private category: string = this.$route.name?.toLowerCase()!;
    private allResult: any[] = [];
    private tag: string = "";
    private key: any = "";
    private el: HTMLElement = document.documentElement;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }

    async mounted() {
        this.category = this.$store.getters.currCategory.toLowerCase();

        this.toot.event.$on("addToot", (result: any) => {
            this.allResult.push(...result);
        });

        this.toot.event.$on("resetToot", () => {
            this.allResult = [];
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

        console.log('======',this.$store.getters.currCategory.toLowerCase(),'======')

        if (
            this.$store.getters.currCategory.toLowerCase() === "hive" ||
            this.$store.getters.currCategory.toLowerCase() === "posting"
        ) {
            this.toot.newVersion();
        } else {
            this.toot.newVersion("ALL TAG");
        }
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

    searchToot() {
        this.toot && this.toot.newVersion(this.category);
    }

    //posting 용
    getCategory(val: string) {
        this.$store.commit("postingCategory", val);
        this.toot && this.toot.newVersion("all tag");
        this.key = val;
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder() {
        this.toot && this.toot.newVersion(this.$store.getters.hashtag);
        this.key = this.$store.getters.sortOrder;
    }

    @Watch("$store.getters.hashtag")
    watchHashtag() {
        console.log('Watch',this.$store.getters.hashtag)
        this.toot && this.toot.newVersion(this.$store.getters.hashtag);
        this.key = this.$store.getters.hashtag;
    }

    @Watch("$store.getters.currCategory")
    watchCategory() {
        this.$store.dispatch("resetSearchInfo");
        this.category = this.$store.getters.currCategory;
        if (
            this.$store.getters.currCategory.toLowerCase() === "hive" ||
            this.$store.getters.currCategory.toLowerCase() === "posting"
        ) {
            this.toot && this.toot.newVersion();
        } else {
            this.toot && this.toot.newVersion("all tag");
        }
        this.key = this.$store.getters.currCategory;
    }
}
</script>

<style></style>
