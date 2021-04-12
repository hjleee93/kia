<template>
  <div class="grid-item">
  <template v-if="toot.media_attachments !== undefined">
    <template v-if="toot.media_attachments[0] !== undefined">
    <a href="#" class="btn btn-link">
      <div class="box-img">
        
      
           <template v-if="toot.media_attachments[0].type === 'image'">
          <img
            :src="toot.media_attachments[0].preview_url"
            alt=""
            style="width: 100%"
          />
           </template>
  
        <template v-if="toot.media_attachments[0].type === 'video'">
          <i class="icon icon-play"></i>
        </template>
       
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
    </template>
  </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Like from "./Like.vue";

@Component({ components: { Like } })
export default class GridItem extends Vue {
    @Prop() toot!: any;
}
</script>

<style scope>
.grid-item.hidden {
    display: none !important;
}
</style>
