<template>
  <div class="sec-search">
    <div class="box-layer">
      <div class="box-search-form">
        <div class="box-toot-dropdown">
          <button data-val="" class="btn txt" @click="txtClick">
            <span>모든 툿</span>
          </button>
          <div class="lists">
            <ul>
              <!--비선택-->
              <li>
                <button
                  data-val="all"
                  class="btn btn-dropdown"
                  @click="tootDrop('allToot')"
                  ref="allToot"
                >
                  <span>모든 툿</span>
                </button>
              </li>
              <!--선택-->
              <li>
                <button
                  data-val="my"
                  class="btn btn-dropdown active"
                  @click="tootDrop('myToot')"
                  ref="myToot"
                >
                  <span>내가 쓴 툿</span>
                </button>
              </li>
            </ul>
          </div>
          <!--모바일 전용 search open버튼-->
          <button
            class="btn btn-m-search open"
            @click="mobileToggle('mobileSearch')"
            ref="mobileSearch"
          ></button>
        </div>
        <div class="box-search-input">
          <div class="box-input">
            <label class="input" @click="listsOpen">
              <!--
                              input 개발 관련하여 안내사항
                              
                              1. 현재 onFocus에 적용되어 있는 이벤트는 search.listsOpen 해당 이벤트를 실행 시키는 함수입니다.
                              2. search 관련하여 .box-search-history 가 열리고 닫히는 이벤트만 제공합니다.
                                 - search.historyListsClose, search.historyListsOpen
                              3. 개발쪽에서 이벤트 처리후 search.listsClose 함수를 호출하시면 layer가 닫힐 것입니다.
                              4. 개발쪽에서 이벤트 처리후 search.listsOpen 함수를 호출하시면 layer가 열릴 것입니다.
                              5. onfocus의 경우 실제 개발하실경우 개발쪽에서 함수를 새로 적용하시어
                                 이벤트 처리후에 search.listsOpen 함수를 호출하시면 됩니다.
                              6. listClose함수 발생시 .btn-search.delete 인경우 .sec-category 영역을 숨기도록 처리되었습니다.
                              
                              - input에 focus가 가면 layer가 열려야 합니다.
                              - input에 focus가 가면 .sec-category 영역이 비활성화 되야 합니다.(해당부분은 layout이기 때문에 퍼블에서 숨깁니다.)
                              - input에 focus가 갔을경우 value가 비어있다면 history를 보여주고 값이 있다면 보여주지 않습니다.
                              - input에 text가 없으면 .btn-search 가 적용 되야 합니다.
                              - input에 text가 있으면 .btn-search.active 가 적용 되야 합니다.
                              - input에 focus이면서 text가 있으면 최근 검색어 노출하지 않습니다. search.historyListsClose 호출
                              - input에 focus이면서 text가 없으면 최근 검색어 노출합니다. search.historyListsOpen 호출
                            -->
              <!-- todo검색: https://codepen.io/AndrewThian/pen/QdeOVa -->

              <input
                type="text"
                name="search"
                placeholder="사용자, 내용 검색"
                v-model="searchInput"
                autocomplete="off"
                @focus="inpFocus('searchInput')"
                ref="searchInput"
              />
              <!-- todo: 사용자:username검색, 내용검색: content -->
            </label>
            <!--조회 전-->
            <button
              @click="searchToot"
              class="btn btn-search"
              :class="[searchInput ? 'active' : '', isDone ? 'delete' : '']"
            ></button>
            <!--조회 중-->
            <!-- <template v-if="!searchInput">
      <button class="btn btn-search active"></button>-->
            <!-- </template>  -->
            <!--조회 완료-->
            <!--<button class="btn btn-search delete"></button>-->
          </div>
          <template v-if="searchInput.length === 0 ">
            <div class="box-search-history">
              <strong class="tit">최근 검색어</strong>
              <ul class="search-history-lists">
                <li v-for="(keyword, idx) in searchHistory" :key="keyword.id">
                  <!-- issue: null -->
                  <button class="btn btn-history" @click="searchInput=keyword">
                    <span>{{ keyword }}</span>
                  </button>
                  <button
                    class="btn btn-history-delete"
                    @click="deleteHistory(idx)"
                  >
                    삭제
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { dim, getDevice, gnb, search, tootDropDown } from "@/scripts/ui_common";
import config from "@/lib/config";

@Component({ components: {} })
export default class SearchBar extends Vue {
  private searchInput: string = "";
  private isDone: boolean = false;
  private searchHistory: string[] = JSON.parse(
    localStorage.getItem("RecentKeyword")!
  );
  private searchResult: any[] = [];
  mounted() {
    tootDropDown.init();
    gnb.init();
    search.init();
    dim.init();
  }
  txtClick() {
    tootDropDown.txtClick();
  }
  tootDrop(arg: string) {
    tootDropDown.btnDropdownClick(this.$refs[arg]);
  }
  mobileToggle(arg: string) {
    search.mobileToggle(this.$refs[arg]);
  }

  listsOpen() {
    search.listsOpen();
  }
  inpFocus(arg: string) {
    this.isDone = false;
    search.inpFocus(this.$refs[arg]);
    console.log("123",search.inpFocus(this.$refs[arg]))
    
  }
  searchToot() {
    //스토리지에 없는 경우
    if (!localStorage.getItem("RecentKeyword")) {
      this.searchHistory = [];
      this.searchHistory.push(this.searchInput);
      localStorage.setItem("RecentKeyword", JSON.stringify(this.searchHistory));
    }
    //스토리지에 있는 경우
    else {
      //최근 검색어 10개 제한
      if (this.searchHistory.length === 10) {
        this.searchHistory.pop();
        localStorage.removeItem("RecentKeyword");
        localStorage.setItem(
          "RecentKeyword",
          JSON.stringify(this.searchHistory)
        );
      }
      this.searchHistory = JSON.parse(localStorage.getItem("RecentKeyword")!);
      this.searchHistory.unshift(this.searchInput);
      localStorage.setItem("RecentKeyword", JSON.stringify(this.searchHistory));
    }

    //@ts-ignore
    this.$http
      .get(config.instance + "/api/v2/search", {
        params: Object.assign({ q: this.searchInput }),
        headers: { Authorization: "Bearer " + config.token },
      })
      .then((response: any) => {
        this.searchResult = response.data;
        this.$emit("searchResult", this.searchResult);
        dim.close();
      });
    this.isDone = true;
  }
  deleteHistory(idx: number) {
    this.searchHistory.splice(idx, 1);
    localStorage.removeItem("RecentKeyword");
    localStorage.setItem("RecentKeyword", JSON.stringify(this.searchHistory));
  }
  clickedRctKeyword(keyword: string){
    this.searchInput = keyword;

  }
}
</script>

<style></style>
