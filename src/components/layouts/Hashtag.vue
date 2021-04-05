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
    if (this.tag.toLowerCase() === "hive") {
      this.hashtags = [
        "hivehashtag1",
        "hivehashtag2",
        "hivehashtag3",
        "hivehashtag4",
        "hivehashtag5",
        "hivehashtag6",
        "hivehashtag7",
        "hivehashtag8",
        "hivehashtag9",
        "hivehashtag10",
        "hivehashtag11",
        "hivehashtag12",
        "hivehashtag13",
        "hivehashtag14",
        "hivehashtag15",
        "hivehashtag16",
        "hivehashtag17",
      ];
    } else if (this.tag.toLowerCase() === "inspiration") {
      this.hashtags = [
        "inshashtag1",
        "inshashtag2",
        "inshashtag3",
        "inshashtag4",
        "inshashtag5",
        "inshashtag6",
        "inshashtag7",
        "inshashtag8",
        "inshashtag9",
        "inshashtag10",
        "inshashtag11",
        "inshashtag12",
        "inshashtag13",
        "inshashtag14",
        "inshashtag15",
        "inshashtag16",
        "inshashtag17",
      ];
    } else if (this.tag.toLowerCase() === "project") {
      this.hashtags = [
        "prohashtag1",
        "prohashtag2",
        "prohashtag3",
        "prohashtag4",
        "prohashtag5",
        "prohashtag6",
        "prohashtag7",
        "prohashtag8",
        "prohashtag9",
        "prohashtag10",
        "prohashtag11",
        "prohashtag12",
        "prohashtag13",
        "prohashtag14",
        "prohashtag15",
        "prohashtag16",
        "prohashtag17",
      ];
    } else if (this.tag.toLowerCase() === "exhibition") {
      this.hashtags = [
        "exhhashtag1",
        "exhhashtag2",
        "exhhashtag3",
        "exhhashtag4",
        "exhhashtag5",
        "exhhashtag6",
        "exhhashtag7",
        "exhhashtag8",
        "exhhashtag9",
        "exhhashtag10",
        "exhhashtag11",
        "exhhashtag12",
        "exhhashtag13",
        "exhhashtag14",
        "exhhashtag15",
        "exhhashtag16",
        "exhhashtag17",
      ];
    }

    // console.log(this.tag)
  }

  txtClick() {
    hashDropDown.txtClick();
  }
  btnDropdownClick(arg: string) {
    //@ts-ignore
    hashDropDown.btnDropdownClick(this.$refs[arg][0]);
  }
  listsClose() {
    hashDropDown.listsClose();
  }
}
</script>

<style></style>
