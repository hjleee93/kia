<template>
  <div class="sec-grid">
    <!--검색 결과가 없는경우-->
    <template v-if="allToots.length === 0">
      <div class="no-data">
        <p class="txt">검색 결과가 없습니다.</p>
      </div>
    </template>
    <div class="grid">
      <GridItemTest v-for="toot in allToots" :toot="toot" :key="toot.id" />
    </div>
  </div>
</template>

<script lang="ts">
import config from "@/lib/config";
import { isotope } from "@/scripts/ui_common";
import axios from "node_modules/axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import GridItemTest from "./GridItemTest.vue";

@Component({ components: { GridItemTest } })
export default class GridTest extends Vue {
  private base = "https://toot.wbcard.org" + "/api/v1";
  private apiBase = this.base + "/timelines";
  private streamBase =
    this.base.replace(/^https?/i, "ws") +
    "/streaming?access_token=" +
    config.token +
    "&stream=";

  private allToots: any[] = [];
  private myToots: any[] = [];

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
  private endpoint = this.endpoints.rest.fed;

  test(howMany = config.statusLimit, option = {}) {
    //@ts-ignore
    this.$http
      .get(this.endpoint, {
        params: Object.assign({ limit: howMany }, option),
        headers: { Authorization: "Bearer " + config.token },
      })
      .then(
        (response: any) => {
          //@ts-ignore
          var result = response.data;
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            console.log(result[i].account.username);
          }
          this.allToots = result;
        },
        (response: any) => {
          console.log(this.endpoint + " request failed");
          console.log(response);
        }
      );
  }

  async mounted() {
    isotope.init();
    this.test(10);
    console.log(this.allToots);
    // this.loadToot();
    // this.read(10)
  }
}
</script>
