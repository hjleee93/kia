<template>
  <div class="box-hash-dropdown">
    <button data-val="" class="txt" @click="txtClick">
      <span># {{ hashtags[0] }}</span>
    </button>
    <div class="lists">
      <strong class="tit">해시태그</strong
      ><!--모바일 전용-->
      <button class="btn-m-hash-close" @click="listsClose"></button
      ><!--모바일 전용-->
      <ul>
        <!--비선택-->
        <li v-for="i in hashtags" :key="i">
          <button
            :data-val="i"
            class="btn btn-dropdown"
            @click="btnDropdownClick(i)"
            :ref="i"
          >
            <span>#{{ i }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { dim, gnb, hashDropDown } from "@/scripts/ui_common";

@Component({ components: {} })
export default class Hashtag extends Vue {
  @Prop() tag!: string;
  private hashtags: string[] = [];

  mounted() {
    hashDropDown.init();
    let tags = this.$store.getters.category(this.tag).tags;
    for (const i in tags) {
      this.hashtags.push(tags[i].name);
    }
  }

  txtClick() {
    hashDropDown.txtClick();
  }
  async btnDropdownClick(arg: string) {
    //미디어 태그 분류
    let mediaTag: any[] = [];
    //@ts-ignore
    hashDropDown.btnDropdownClick(this.$refs[arg][0]);

    try {
      const result = await this.$api.getTagToots(arg);

      for (const i in result.data) {
        if (result.data[i].media_attachments.length > 0) {
          mediaTag.push(result.data[i]);
        }
      }
      this.$emit("tagResult", mediaTag);
    } catch (err) {
      console.log(err);
    }
  }
  listsClose() {
    hashDropDown.listsClose();
  }
}
</script>

<style></style>
