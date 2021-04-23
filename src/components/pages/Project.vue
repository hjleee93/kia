<template>
  <div id="content" class="hive">
    <div class="content">
      <div class="wrap-fixed">
        <div class="sec-fixed">
          <SearchBar />
          <Category @tagResult="tagResult" />
          <div class="sec-grid-top">
            <BoxGridTop @sortOrder="sortOrder" />
          </div>
          <div class="dim"></div>
        </div>
      </div>
      <Grid :allResult="tagSearch" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Category from "@/components/layouts/Category.vue";
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

enum ETootLoadingState {
  none,
  loading,
  complete,
  end,
}

@Component({
  components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Project extends Vue {
  private category: string = "Project";
  private tagSearch: any[] = [];
  private limitCount: number = 10;
  private loadingState: ETootLoadingState = ETootLoadingState.none;
  private recentOrder: boolean = true;
private tag: string = '';
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
    this.$store.dispatch("resetSearchInfo");
    this.$store.commit("currCategory", "Project");
    this.tag = this.$store.getters.currCategory.toLowerCase();
    this.loadToot();
    window.addEventListener("scroll", this.scrollHandler);
  }
  beforeCreate() {
    this.$store.commit("searchInput", "");
    this.$store.commit("searchType", "contents");
    this.$store.commit("hashtag", "");
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  @Watch("$store.getters.searchInput")
  init() {
    this.loadingState = ETootLoadingState.none;
    this.tagSearch = [];
  }

  scrollHandler() {
    let el = document.documentElement;

    if (el.scrollTop === 0) {
    } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
      this.loadToot();
    }
  }

  @Watch("$store.getters.searchInput")
  async loadToot() {
    let searchType = "contents";
    let searchInput = "";
    if (this.$store.getters.searchType !== undefined) {
      searchType = this.$store.getters.searchType;
    }

    if (this.$store.getters.searchInput !== undefined) {
      searchInput = this.$store.getters.searchInput;
    }
    let result: any[] = [];

    if (
      this.loadingState === ETootLoadingState.none ||
      this.loadingState === ETootLoadingState.complete
    ) {
      let max_id = undefined;

      if (this.tagSearch.length) {
        max_id = this.tagSearch[this.tagSearch.length - 1].id;
      }
      this.loadingState = ETootLoadingState.loading;

      if (searchType === "user") {
        if (this.recentOrder === true) {
          result = await this.$api.searchMediaTag(
            this.tag,
            max_id,
            this.limitCount,
            "",
            "",
            searchInput
          );
          console.log("user", result);
        } else {
          result = await this.$api.searchMediaTag(
            this.tag,
            max_id,
            this.limitCount,
            "f",
            "",
            searchInput
          );
        }
      } else if (searchType === "contents") {
        console.log("here");
        if (this.recentOrder === true) {
          if (searchInput.length === 0) {
            result = await this.$api.searchMediaTag(
              this.tag,
              max_id,
              this.limitCount
            );
          } else {
            result = await this.$api.searchMediaTag(
              this.tag,
              max_id,
              this.limitCount,
              "f",
              searchInput
            );
          }
        } else {
          result = await this.$api.searchMediaTag(
            this.tag,
            max_id,
            this.limitCount,
            "f"
          );
        }
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
      this.tagSearch.push(...result);

      this.$store.commit("tootCnt", this.tagSearch.length);
    }
  }
  @Watch("$store.getters.sortOrder")
  sortOrder(value: string) {
    if (value === "popular") {
      console.log(value);
      this.recentOrder = false;
      this.init();
      this.loadToot();
    } else if (value === "recent") {
      this.recentOrder = true;
      this.init();
      this.loadToot();
    }
  }
   @Watch("$store.getters.hashtag")
    watchHashtag(val: string) {
      console.log("??", val)
        this.tag = val;
        this.init();
        this.loadToot();
    }
}
</script>

<style></style>
