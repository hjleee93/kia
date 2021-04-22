<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar @searchResult="searchResult" />
                    <CategoryP />
                    <div class="sec-grid-top">
                        <BoxGridTop
                            :tootCnt="allResult.length"
                            @sortOrder="sortOrder"
                        />
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
    private recentResult: any[] = [];
    private userId: number = -1;
    private limitCount: number = 10;
    private loadingState: ETootLoadingState = ETootLoadingState.none;

    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }
    async mounted() {
        window.addEventListener("scroll", this.scrollHandler);
        this.$store.commit("currCategory", "Posting");
        this.userId = await this.getUserId();
        await this.loadToot();
    }
    @Watch('recentResult')
    @Watch('allResult')
    result() {
        if (this.recentResult.length > 0) {
            this.allResult = this.recentResult;
        }
    }
    searchResult(result: any) {
        // this.result = result;
        // console.log("searchResult",this.result);
    }
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }
    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            this.loadToot();
        }
    }

    @Watch("$store.state.user.currentUser")
    async getUserId() {
        
        if (this.$store.getters.currentUser === null) {
            await this.$store.dispatch("userStatus", this.$store.getters.userToken);
        }
        return await this.$store.state.user.currentUser.id;
    }

    async loadToot() {
        if (
            this.loadingState === ETootLoadingState.none ||
            this.loadingState === ETootLoadingState.complete
        ) {
            let max_id = undefined;
            if (this.allResult.length) {
                max_id = this.allResult[this.allResult.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            const result = await this.$api.getMyToots(this.userId, max_id);

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
            this.allResult.push(...result);
            
             this.$store.commit("tootCnt", this.allResult.length);
        }
    }

    async sortOrder(value?: string) {

        // if (value === "popular") {
        //     let lte = this.getFormatDate(new Date());
        //     let today = new Date();
        //     let gte = "";
        //     today.setDate(today.getDate() - 365);
        //     gte = this.getFormatDate(today);

        //     try {
        //         const result = await this.$api.getMyToots(this.userId);
        //         this.allResult = result;
        //     } catch (err) {
        //         console.log(err);
        //     }
        // } else if (value === "recent") {
        //     try {
        //         const result = await this.$api.getMyToots(this.userId, max_id);
        //         this.allResult = result;
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        
        // if (
        //     this.loadingState === ETootLoadingState.none ||
        //     this.loadingState === ETootLoadingState.complete
        // ) {
        //     let max_id = undefined;
        //     if (this.recentResult.length) {
        //         max_id = this.recentResult[this.recentResult.length - 1].id;
        //     }
        //     this.loadingState = ETootLoadingState.loading;

        //     const result = await this.$api.getMediaTootsOnly(
        //         max_id,
        //         this.limitCount
        //     );

        //     if (result.length < this.limitCount) {
        //         this.loadingState = ETootLoadingState.end;
        //     } else {
        //         this.$nextTick(() => {
        //             this.$nextTick(() => {
        //                 const el = document.documentElement;
        //                 if (el.scrollHeight <= el.clientHeight) {
        //                     this.loadingState = ETootLoadingState.complete;
        //                     this.sortOrder();
        //                 } else {
        //                     this.loadingState = ETootLoadingState.complete;
        //                 }
        //             });
        //         });
        //     }
        //     this.recentResult.push(...result);
        // }
    }

    getFormatDate(date: Date) {
        let year = date.getFullYear();
        let month = 1 + date.getMonth();
        //@ts-ignore
        month = month >= 10 ? month : "0" + month;
        let day = date.getDate();
        //@ts-ignore
        day = day >= 10 ? day : "0" + day;
        return year + "-" + month + "-" + day;
    }
}
</script>

<style></style>
