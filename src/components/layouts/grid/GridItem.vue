<template>
    <div class="grid-item" >
        
        <a href="#" class="btn btn-link">
            <div class="box-img">
                <img :src="toot.tootSrc" alt="" style="width: 100%" />
                <template v-if="toot.tootSrcTypeIsVideo">
                    <i class="icon icon-play"></i>
                </template>
                <!--동영상인 경우-->
            </div>
            <div class="box-cont">
                <p class="txt">{{ toot.tootTxt }}<span>더보기</span></p>
                <span class="nic-name">{{ toot.tootNickName }}</span>
            </div>
        </a>
        <!--비활성-->
        <Like />
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
export default class GridItem extends Vue {
    
    
}
</script>

<style scope>
.grid-item.hidden{
    display: none !important;
}
</style>