<template>
  <div id="content" class="hive">
    <div class="content">
      <div class="wrap-fixed">
        <div class="sec-fixed">
          <SearchBar />
          <Category />
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
import Category from "@/components/layouts/Category.vue";
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
  components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Hive extends Vue {
  private category: string = "Hive";
  private allResult: any[] = [];
  private limitCount: number = 10;
  private loadingState: ETootLoadingState = ETootLoadingState.none;
  private recentOrder: string = "";
  private el: any;

  beforeUpdate() {
    tootDropDown.init();
    hashDropDown.init();
    search.init();
    dim.init();
    gnb.init();
  }

  async mounted() {
    this.$store.commit("currCategory", "Hive");
    this.init();
    this.loadToot();
    window.addEventListener("scroll", this.scrollHandler);
  }

  beforeCreate() {
    this.$store.dispatch("resetSearchInfo");
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  @Watch("$store.getters.searchInput" || "$store.getters.searchType")
  init() {
    this.loadingState = ETootLoadingState.none;
    this.allResult = [];
    this.el = document.documentElement;
    this.$store.dispatch("tootReset");
  }

  scrollHandler() {
    if (this.el.scrollTop === 0) {
      
    } else if (
      this.el.scrollTop + this.el.clientHeight >=
      this.el.scrollHeight - 100
    ) {
      this.loadToot();
    }
  }

  //   @Watch()
  @Watch("$store.getters.searchInput" || "$store.getters.searchType")
  async loadToot() {
    let searchType = this.$store.getters.searchType;
    let searchInput = this.$store.getters.searchInput;

    if (
      this.loadingState === ETootLoadingState.none ||
      this.loadingState === ETootLoadingState.complete
    ) {
      let max_id = undefined;
      if (this.allResult.length) {
        max_id = this.allResult[this.allResult.length - 1].id;
      }
      this.loadingState = ETootLoadingState.loading;

      let userId = await this.$store.getters.currentUser.id;

      let param = {
        account_id: userId,
        posting: false,
        limit: this.limitCount,
        max_id: max_id,
        tag: "",
        username: searchType === "contents" ? "" : searchInput,
        text: searchType === "contents" ? searchInput : "",
        order: this.recentOrder,
      };

      await this.$store.dispatch("showToot", param);

      if (this.$store.getters.searchResult.length === 0) {
        this.loadingState = ETootLoadingState.end;
      } else {
        this.$nextTick(() => {
          this.$nextTick(() => {
            if (this.el.scrollHeight <= this.el.clientHeight) {
              this.loadingState = ETootLoadingState.complete;
              this.loadToot();
            } else {
              this.loadingState = ETootLoadingState.complete;
            }
          });
        });
      }
      this.allResult.push(...this.$store.getters.searchResult);
      this.$store.commit("tootCnt", this.allResult.length);
    }
  }

  @Watch("$store.getters.sortOrder")
  async sortOrder(value: string) {
    if (value === "popular") {
      this.recentOrder = "f";
    } else if (value === "recent") {
      this.recentOrder = "";
    }
    this.init();
    this.loadToot();
  }
}
</script>

<style></style>
