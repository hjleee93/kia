<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar @searchResult="searchResult" />
                    <CategoryP />
                    <div class="sec-grid-top">
                        <BoxGridTop @sortOrder="sortOrder" />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <Grid :allResult="allResult" />
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
import config from "@/lib/config";

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
    private category: string = "Posting";
    private allResult: any[] = [];
    private userId: number = -1;
    private limitCount: number = 5;
    private loadingState: ETootLoadingState = ETootLoadingState.none;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }
    async mounted() {
        this.$store.commit("currCategory", "Posting");
        this.userId = await this.getUserId();
        await this.loadToot();
    }

    searchResult(result: any) {
        // this.result = result;
        // console.log("searchResult",this.result);
    }



    @Watch("$store.state.user.currentUser")
    async getUserId() {
        if (this.$store.state.user.currentUser === null) {
            await this.$store.dispatch("userStatus", config.token);
        }
        return await this.$store.state.user.currentUser.id;
    }

    async loadToot() {
        const temp = [];
        const result = await this.$api.getMyToots(this.userId);
        // if (result.length) {
        //         max_id = result[result.length - 1].id;
        //     }
        const result2 = await this.$api.getMyToots(this.userId) 
        
        for (let i = 0; i < result.length; i++) {
                if (result[i].media_attachments.length > 0) {
                    temp.push(result[i])
                    // if (result[i].media_attachments[0].type === "image") {
                        this.allResult.push(result[i].media_attachments[0].url);
                    // }
                }
            }

        this.allResult.push(...temp);
           console.log("!23",temp)
    }

    sortOrder(value: string) {
        console.log("value", value);
    }
}
</script>

<style></style>
