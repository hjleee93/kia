<template>    
        <div id="content" class="hive">
        
            <div class="content">
                <div class="wrap-fixed">
                    <div class="sec-fixed">
                        <div class="sec-search">
                            <div class="box-layer">
                                <div class="box-search-form">
                                    <div class="box-toot-dropdown">
                                        <button
                                            data-val=""
                                            class="btn txt"
                                            @click="dropDown.txtClick()"
                                        >
                                            <span>모든 툿</span>
                                        </button>
                                        <div class="lists">
                                            <ul>
                                                <!--비선택-->
                                                <li>
                                                    <button
                                                        data-val="all"
                                                        class="btn btn-dropdown"
                                                        @click="dropDown.btnDropdownClick(this)"
                                                    >
                                                        <span>모든 툿</span>
                                                    </button>
                                                </li>
                                                <!--선택-->
                                                <li>
                                                    <button
                                                        data-val="my"
                                                        class="btn btn-dropdown active"
                                                        onclick="tootDropDown.btnDropdownClick(this)"
                                                    >
                                                        <span>내가 쓴 툿</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--모바일 전용 search open버튼-->
                                        <button
                                            class="btn btn-m-search open"
                                            onclick="search.mobileToggle(this)"
                                        ></button>
                                    </div>
                                    <div class="box-search-input">
                                        <div class="box-input">
                                            <label
                                                class="input"
                                                onclick="search.listsOpen()"
                                            >
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
                                                <input
                                                    type="text"
                                                    name="search"
                                                    placeholder="사용자, 내용 검색"
                                                    autocomplete="off"
                                                />
                                            </label>
                                            <!--조회 전-->
                                            <button
                                                class="btn btn-search"
                                            ></button>
                                            <!--조회 중-->
                                            <!--<button class="btn btn-search active"></button>-->
                                            <!--조회 완료-->
                                            <!--<button class="btn btn-search delete"></button>-->
                                        </div>
                                        <div class="box-search-history">
                                            <strong class="tit"
                                                >최근 검색어</strong
                                            >
                                            <ul class="search-history-lists">
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-history"
                                                    >
                                                        <span
                                                            >최근 검색어
                                                            노출</span
                                                        >
                                                    </button>
                                                    <button
                                                        class="btn btn-history-delete"
                                                    >
                                                        삭제
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <category />
                    </div>
                </div>
                <grid />
            </div>
        </div>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Category from "./Category.vue";
import Grid from "./GridAlbum.vue";


@Component({ components: { Category, Grid } })
export default class TootSearch extends Vue {
      calendar: any;
    dim: any;
    gnb: any;
    tab:any;
    search: any;
    tootDropDown: any;
    

    mounted() {
      //@ts-ignore
        this.gnb = window.gnb();
        this.gnb.init();
        //@ts-ignore
        this.tab = window.tab();
        this.tab.init();
        //@ts-ignore
        this.dim = window.dim();
        this.dim.init();
        //@ts-ignore
        this.calendar = window.calendar();
        this.calendar.init();
    }


}
</script>

<style>
</style>