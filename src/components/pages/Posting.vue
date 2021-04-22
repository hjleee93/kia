<template>
  <div id="content" class="hive">
    <div class="content">
      <div class="wrap-fixed">
        <div class="sec-fixed">
          <SearchBar @searchResult="searchResult" />
          <CategoryP />
          <div class="sec-grid-top">
            <BoxGridTop :tootCnt="allResult.length" @sortOrder="sortOrder" />
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
  private recentOrder: boolean = true;

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
  @Watch("recentResult")
  @Watch("allResult")
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
  async getUserId() {
    if (this.$store.getters.currentUser === null) {
      await this.$store.dispatch("userStatus", this.$store.getters.userToken);
    }
    return await this.$store.state.user.currentUser.id;
  }

  async loadToot() {
    let searchInput = "";

    if (this.$store.getters.searchInput !== undefined) {
      searchInput = this.$store.getters.searchInput;
    }
    let result: any[] = [];
    if (
      this.loadingState === ETootLoadingState.none ||
      this.loadingState === ETootLoadingState.complete
    ) {
      let max_id = undefined;
      if (this.allResult.length) {
        max_id = this.allResult[this.allResult.length - 1].id;
      }
      this.loadingState = ETootLoadingState.loading;

      if (this.recentOrder === true) {
        if (searchInput.length > 0) {
          //todo:mytoot검색
          //   result = await this.$api.searchMedia(
          //     searchInput,
          //     max_id,
          //     this.limitCount
          //   );
        } else {
          result = await this.$api.getMyToots(this.userId, max_id);
        }
      } else if (this.recentOrder === false) {
        //todo:mytoot 인기순
        // result = await this.$api.orderMedia(
        //   "f",
        //   max_id,
        //   this.limitCount,
        //   false
        // );
      }

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

  sortOrder(value: string) {
    if (value === "popular") {
      this.recentOrder = false;
      this.init();
      this.loadToot();
    } else if (value === "recent") {
      this.recentOrder = true;
      this.init();
      this.loadToot();
    }
  }

  init() {
    this.loadingState = ETootLoadingState.none;
    this.allResult = [];
  }
}
</script>

<style></style>
