<template>
  <div id="content" class="hive">
    <div class="content">
      <div class="wrap-fixed">
        <div class="sec-fixed">
          <SearchBar />
          <Category :category="category" @tagResult="tagResult"/>
          <div class="sec-grid-top">
            <BoxGridTop />
          </div>
          <div class="dim"></div>
        </div>
      </div>
      <Grid :tagSearch="tagSearch" />
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
import { bus } from "@/main";
import config from "@/lib/config";

@Component({
  components: { SearchBar, Category, Grid, BoxGridTop },
})
export default class Inspiration extends Vue {
  private category: string = "Inspiration";
  private tagSearch: any[] = [];

   // api
      private base = config.instance + "/api/v1";
    private apiBase = this.base + "/timelines";

    private streamBase =
        this.base.replace(/^https?/i, "ws") +
        "/streaming?access_token=" +
        config.token +
        "&stream=";

    private endpoints = {
        rest: {
            home: this.apiBase + "/home",
            fed: this.apiBase + "/public",
            local: this.apiBase + "/public?local=true",
        },
        stream: {
            home: this.streamBase + "user",
            fed: this.streamBase + "public",
            local: this.streamBase + "public:local",
        },
    };


  beforeUpdate() {
    tootDropDown.init();
    hashDropDown.init();
    search.init();
    dim.init();
    gnb.init();
  }
  tagResult(result: any){
    // this.$emit("tagResult", result)
    this.tagSearch = result;
    console.log("여기여기", result)

  }


  mounted() {
    this.$emit("category", this.category);
    bus.$emit("category", this.category);
    this.getGridItem(10);
  }

   async getGridItem(howMany = config.statusLimit) {
        let endpoint = this.endpoints.rest.fed;
        try {
            //@ts-ignore
            const result = await this.$http.get(endpoint, {
                params: Object.assign({ only_media: true }),
                headers: { Authorization: "Bearer " + config.token },
            });
            this.tagSearch = result.data;
        } catch (err) {
            console.log(endpoint + " request failed");
        }
    }
}
</script>

<style></style>
