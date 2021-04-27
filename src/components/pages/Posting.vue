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
            <Grid :key="$store.getters.sortOrder" :allResult="allResult" />
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
    private toot: Toot = new Toot();
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
        this.$store.commit("currCategory", this.category);
        this.toot.event.$on("addToot", (result: any) => {
            this.allResult.push(...result);
        });
        this.toot.event.$on("resetToot", () => {
            this.allResult = [];
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
        this.toot.newVersion();
        window.addEventListener("scroll", this.scrollHandler);
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

    scrollHandler() {
        if (this.el.scrollTop === 0) {
        } else if (
            this.el.scrollTop + this.el.clientHeight ===
            this.el.scrollHeight
        ) {
            this.toot.load();
        }
    }

    tagResult(result: any) {
        this.allResult = result;
    }

    @Watch("$store.getters.sortOrder")
    async sortOrder() {
        this.toot && this.toot.newVersion();
    }

    getCategory(val: string) {
        this.category = val;
        this.toot && this.toot.newVersion();
    }

    @Watch("$store.getters.hashtag")
    watchHashtag(val: string) {
        this.toot && this.toot.newVersion(val);
    }
}
</script>

<style></style>
