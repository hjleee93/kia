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
import config from "@/lib/config";

@Component({ components: {} })
export default class Hashtag extends Vue {
  @Prop() tag!: string;
  private hashtags: string[] = [];

  mounted() {
    hashDropDown.init();
    let tags = this.$store.getters.category(this.tag).tags
      for(const i in tags){
        this.hashtags.push(tags[i].name) 
      }   
   
  }

  txtClick() {
    hashDropDown.txtClick();
  }
  btnDropdownClick(arg: string) {
    //미디어 태그 분류
    let mediaTag: any[] = []
    //@ts-ignore
    hashDropDown.btnDropdownClick(this.$refs[arg][0]);
    
    //@ts-ignore
    this.$http.get(config.instance + '/api/v1/timelines/tag/' + arg).then((response)=>{
      for(const i in response.data){
            if(response.data[i].media_attachments.length > 0){
              mediaTag.push(response.data[i])
            }            
      }      
      this.$emit('tagResult', mediaTag)
    })
  }
  listsClose() {
    hashDropDown.listsClose();
  }
}
</script>

<style></style>
