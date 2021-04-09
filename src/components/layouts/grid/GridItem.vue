<template>
  <div class="grid-item">
    <a href="#" class="btn btn-link">
      <div class="box-img">
        <template v-if="toot.media_attachments.length > 0">
        {{toot.favori}}
          <img
            :src="toot.media_attachments[0].preview_url"
            alt=""
            style="width: 100%"
          />
        </template>
  
        <template v-if="toot.media_attachments[0].type === 'video'">
          <i class="icon icon-play"></i>
        </template>
        <!--동영상인 경우-->
      </div>
      <div class="box-cont">
        
        <p class="txt" v-html="toot.content"><span>더보기</span></p>
        <span class="nic-name">{{ toot.account.username }}</span>
      </div>
    </a>
    <!--비활성-->
    <Like :toot='toot'/>
    <!--활성화-->
    <!--<button class="btn btn-like active"></button>-->
    <!--활성화 모션-->
    <!--<button class="btn btn-like active motion"></button>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Like from "./Like.vue";

@Component({ components: { Like }, props: ["toot"] })
export default class GridItem extends Vue {}
</script>

<style scope>
.grid-item.hidden {
  display: none !important;
}
</style>
