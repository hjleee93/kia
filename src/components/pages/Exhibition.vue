<template>
  <div id="content" class="hive">
    <div class="content">
      <div class="wrap-fixed">
        <div class="sec-fixed">
          <SearchBar />
          <Category @tagResult="tagResult" />
          <div class="sec-grid-top">
            <BoxGridTop @sortOrder="sortOrder" :tootCnt="tagSearch.length" />
          </div>
          <div class="dim"></div>
        </div>
      </div>
      <Grid :allResult="tagSearch" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Category from "@/components/layouts/Category.vue";

import Grid from "@/components/layouts/grid/Grid.vue";
import BoxGridTop from "@/components/layouts/grid/BoxGridTop.vue";
import SearchBar from "@/components/layouts/SearchBar.vue";
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
export default class Exhibition extends Vue {
  private category: string = "Exhibition";
  private tagSearch: any[] = [];
  private tootCnt: number = -1;
  private limitCount: number = 10;
  private loadingState: ETootLoadingState = ETootLoadingState.none;
  private recentOrder: boolean = true;
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
    this.$store.commit("currCategory", "Exhibition");
    this.loadToot();
    window.addEventListener("scroll", this.scrollHandler);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  async getGridItem() {
    //미디어 태그 분류
    let mediaTag: any[] = [];
    try {
      const result = await this.$api.getTagToots(this.category);

      for (const i in result.data) {
        if (result.data[i].media_attachments.length > 0) {
          mediaTag.push(result.data[i]);
        }
      }
      this.tagSearch = mediaTag;
    } catch (err) {
      console.log(err);
    }
  }

  scrollHandler() {
    let el = document.documentElement;

    if (el.scrollTop === 0) {
    } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
      this.loadToot();
    }
  }

  async loadToot() {
    let result: any[] = [];
    let tag = this.$store.getters.currCategory.toLowerCase();
    if (
      this.loadingState === ETootLoadingState.none ||
      this.loadingState === ETootLoadingState.complete
    ) {
      let max_id = undefined;

      if (this.tagSearch.length) {
        max_id = this.tagSearch[this.tagSearch.length - 1].id;
      }
      this.loadingState = ETootLoadingState.loading;

      if (this.recentOrder === true) {
        result = await this.$api.searchMediaTag(tag, max_id, this.limitCount);
      } else if (this.recentOrder === false) {
        result = await this.$api.searchMediaTag(
          tag,
          max_id,
          this.limitCount,
          "f"
        );
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

  init() {
    this.loadingState = ETootLoadingState.none;
    this.tagSearch = [];
  }
}
</script>

<style></style>
