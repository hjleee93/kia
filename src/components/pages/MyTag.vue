<template>
  <div id="content" class="my-tag">
    <!--content(S)-->
    <div class="content">
      <div class="wrap-fixed">
        <div class="sec-fixed">
          <SearchHashtag :hashtag='hashtag' />
          <div class="sec-category">
            <div class="box-grid-top">
              <div class="floated left">
                <p class="txt">검색결과</p>
                <!--검색 전-->
                <!--<p class="txt">총 0개의 검색 결과</p>--><!--검색 결과 없음-->
                <!--<p class="txt">총 10개의 검색 결과</p>--><!--검색 결과 있음-->
              </div>
            </div>
          </div>
          <div class="dim" onclick="closeLayerSearch()"></div>
        </div>
      </div>
      <div class="sec-hash">
        <!--검색-->
        <div class="box-hash">
          <!--검색 전-->
          <div v-if="!isSearch" class="box-no-data">
            <p class="txt">해시태그를 검색해주세요.</p>
          </div>

          <!--검색 결과 있음-->
          <ul v-else-if="hashList.length" class="hash-lists">
            <template v-for="hashData in hashList">
              <li>
                <button class="btn btn-hash" @click="clickedHashtag(hashData.hash)">
                  <span class="hash"><span>#</span>{{ hashData.hash }}</span>
                </button>
              </li>
            </template>
          </ul>

          <!--검색 결과 없음-->
          <div v-else class="box-no-data">
            <p class="txt">이 해시태그는 아직 사용되지 않았습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SearchHashtag from "@/components/layouts/myTag/SearchHashtag.vue";
import { gnb } from "@/scripts/ui_common";

@Component({ components: { SearchHashtag } })
export default class MyTag extends Vue {
  isSearch: boolean = true;
  hashList: any[] = [
    { hash: "해시 태그명 노출1" },
    { hash: "해시 태그명 노출2" },
    { hash: "해시 태그명 노출3" },
    { hash: "해시 태그명 노출4" },
    { hash: "해시 태그명 노출5" },
    { hash: "해시 태그명 노출6" },
    { hash: "해시 태그명 노출7" },
    { hash: "해시 태그명 노출8" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
    { hash: "해시 태그명 노출" },
  ];
private hashtag: string = '';
  mounted() {
    gnb.init();
  }
  
  clickedHashtag(val: string){
    this.hashtag = val;
  }
}
</script>
