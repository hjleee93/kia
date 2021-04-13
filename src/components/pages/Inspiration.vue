<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar/>
                    <Category  @tagResult="tagResult" />
                    <div class="sec-grid-top">
                        <BoxGridTop  @sortOrder="sortOrder"/>
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid :tagSearch="tagSearch" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Category from "@/components/layouts/Category.vue";
import Grid from "@/components/layouts/grid/Grid.vue";
import BoxGridTop from "@/components/layouts/grid/BoxGridTop.vue";
import SearchBar from "@/components/layouts/SearchBar.vue";
import {
    dim,
    gnb,
    hashDropDown,
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
export default class Inspiration extends Vue {
    private category: string = "Inspiration";
    private tagSearch: any[] = [];

    private limitCount: number = 5;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
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
        this.$store.commit('currCategory', 'Inspiration')
        this.loadToot();
        window.addEventListener("scroll", this.scrollHandler);
    }

    async getGridItem(howMany = config.statusLimit) {
        //미디어 태그 분류
        let mediaTag: any[] = [];
        try {
            const result = await this.$api.getTagToots(this.category);

            for (const i in result.data) {
                if (result.data[i].media_attachments.length > 0) {
                    mediaTag.push(result.data[i]);
                }
            }
            this.tagSearch = mediaTag;
        } catch (err) {
            console.log(err);
        }
    }

    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
            this.loadToot();
        }
    }

    async loadToot() {
        if (
            this.loadingState === ETootLoadingState.none ||
            this.loadingState === ETootLoadingState.complete
        ) {
            let max_id = undefined;
            if (this.tagSearch.length) {
                max_id = this.tagSearch[this.tagSearch.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            const result = await this.$api.getTagToots(
                this.category,
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
            this.tagSearch.push(...result);
        }
    }

      sortOrder(value: string){
        console.log("value",value)
    }
}
</script>

<style></style>
