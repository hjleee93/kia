<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category />
                    <div class="sec-grid-top">
                        <BoxGridTop />
                        <MobileAlbum />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <GridItem />
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Category from "../layouts/Category.vue";
import GridItem from "../layouts/grid/GridItem.vue";
import BoxGridTop from "../layouts/grid/BoxGridTop.vue";
import MobileAlbum from "../layouts/MobileAlbum.vue";
import SearchBar from "../layouts/SearchBar.vue";

@Component({
    components: { SearchBar, Category, GridItem, BoxGridTop, MobileAlbum },
})
export default class Hive extends Vue {}
</script>

<style>
</style>