<template>
  <div class="box-grid-top">
    <div class="floated left">
      <!-- todo: toot 개수 가져오는 api 호출  -->
      <p class="txt">총 {{ tootCnt }}개의 톳</p>
      <!--<p class="txt">총 100개의 검색 결과</p>-->
    </div>
    <div class="floated right">
      <ul class="sort-lists">
        <li>
          <button class="btn btn-sort" @click="recentToot('recent')" :class="{ active: isActive('recent') }"> 
            <span>최신순</span>
          </button>
        </li>
        <!--활성화-->
        <li>
          <button class="btn btn-sort" @click="popularToot('popular')" :class="{ active: isActive('popular') }">
            <span>인기순</span>
          </button>
        </li>
        <!--비활성-->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class BoxGridTop extends Vue {
  @Prop() tootCnt!: number
   private active: string = 'recent';

  recentToot(value: string){
    this.active = value
    this.$emit('sortOrder', value)
  }
  popularToot(value: string){
    this.active = value
    this.$emit('sortOrder', value)
    
  }
 
  isActive(value: string) {
    return this.active === value;
  }
}
</script>

<style></style>
