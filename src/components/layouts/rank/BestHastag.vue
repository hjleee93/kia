<template>
  <div class="sec-best-hash">
    <h2 class="b-tit">BEST 해시태그</h2>
    <div class="box-best-hash">
      <ol class="best-hash-lists">
        <li v-for="(hashtag, idx) in hastagList" :key="idx">
          <span class="number">{{ idx + 1 }}</span>

          <p class="hash">
            <router-link :to="`mastodon/tags/${hashtag.name}`"
              >#{{ hashtag.name }}
            </router-link>
          </p>
          <span class="toot">{{ hashtag.count }} 툿</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { bus } from "@/main";

@Component({ components: {} })
export default class BestHashtag extends Vue {
  private hastagList: any[] = [];
  private gte!: string;
  private lte: string = this.getFormatDate(new Date());

  async mounted() {
    let today = new Date();
    today.setDate(today.getDate() - 30);
    this.gte = this.getFormatDate(today);
    const result = await this.$api.getBestHashtags(this.gte, this.lte, 10);
    this.hastagList = result;

    await this.getBestHashtags();
  }

  beforeDestroy() {
    bus.$off("gte");
    bus.$off("lte");
  }
  async getBestHashtags() {
    bus.$on("gte", (gte: string) => {
      this.gte = gte;
      bus.$on("lte", async (lte: string) => {
        this.lte = lte;

        const result = await this.$api.getBestHashtags(this.gte, this.lte, 10);
        this.hastagList = result;
      });
    });
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
