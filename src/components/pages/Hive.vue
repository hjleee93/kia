<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category />
                    <div class="sec-grid-top">
                        <BoxGridTop />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <GridItem />
        </div>
        <MobileAlbum />
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Category from "../layouts/Category.vue";
import GridItem from "../layouts/grid/GridItem.vue";
import BoxGridTop from "../layouts/grid/BoxGridTop.vue";
import MobileAlbum from "../layouts/MobileAlbum.vue";
import SearchBar from "../layouts/SearchBar.vue";
import {
    dim,
    gnb,
    hashDropDown,
    search,
    tootDropDown,
} from "@/scripts/ui_common";

@Component({
    components: { SearchBar, Category, GridItem, BoxGridTop, MobileAlbum },
})
export default class Hive extends Vue {
    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }
}
</script>

<style>
</style>