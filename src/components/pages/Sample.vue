

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
            <GridTest/>
        </div>
    </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Category from "../layouts/Category.vue";
import GridTest from "../layouts/grid/GridTest.vue";
import BoxGridTop from "../layouts/grid/BoxGridTop.vue";
import SearchBar from "../layouts/SearchBar.vue";
import {
    dim,
    gnb,
    hashDropDown,
    tootDropDown,
    getDevice,
} from "@/scripts/ui_common";

@Component({
    components: { SearchBar, Category, GridTest, BoxGridTop },
})
export default class Sample extends Vue {
    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        dim.init();
        gnb.init();
        
    }
   
    
}
</script>

<style>
</style>