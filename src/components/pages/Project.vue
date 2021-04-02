<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category :category="category" @category="getCategory"/>
                    <div class="sec-grid-top">
                        
                        <BoxGridTop />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid />
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
    search,
    tootDropDown,
    getDevice,
} from "@/scripts/ui_common";

@Component({
    components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Project extends Vue {
  private category: string = 'Project'
    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
        
    }
     getCategory(category: string){
      this.$emit("category");
    }
   
    
}
</script>

<style>
</style>