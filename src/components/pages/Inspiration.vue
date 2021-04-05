<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category :category="category" @tagResult="tagResult" />
                    <div class="sec-grid-top">
                        <BoxGridTop />
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
import Category from "../layouts/Category.vue";
import Grid from "../layouts/grid/Grid.vue";
import BoxGridTop from "../layouts/grid/BoxGridTop.vue";
import SearchBar from "../layouts/SearchBar.vue";
import {
    dim,
    gnb,
    hashDropDown,
    tootDropDown,
    getDevice,
} from "@/scripts/ui_common";
import { bus } from "@/main";
import config from "@/lib/config";

@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Inspiration extends Vue {
    private category: string = "Inspiration";
    private tagSearch: any[] = [];

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        dim.init();
        gnb.init();
    }

    tagResult(result: any) {
        // this.$emit("tagResult", result)
        this.tagSearch = result;
        console.log("여기여기", result);
    }

    mounted() {
        this.$emit("category", this.category);
        bus.$emit("category", this.category);
        this.getGridItem(10);
    }

    async getGridItem(howMany = config.statusLimit) {
        //미디어 태그 분류
        let mediaTag: any[] = [];
        try {
            //@ts-ignore
            const result = await this.$http.get(
                config.instance + "/api/v1/timelines/tag/" + this.category
            );
            console.log(result)

            for (const i in result.data) {
                if (result.data[i].media_attachments.length > 0) {
                    mediaTag.push(result.data[i]);
                }
            }
            this.tagSearch = mediaTag
        } catch (err) {
            console.log(err);
        }
    }
}
</script>

<style></style>
