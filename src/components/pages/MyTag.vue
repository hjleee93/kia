<template>
    <div id="content" class="my-tag">
        <!--content(S)-->
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchHashtag />
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
                    <!--
                <div class="box-no-data">
                  <p class="txt">해시태그를 검색해주세요.</p>
                </div>
                -->
                    <!--검색 결과 없음-->
                    <!--
                <div class="box-no-data">
                  <p class="txt">이 해시태그는 아직 사용되지 않았습니다.</p>
                </div>
                -->
                    <!--검색 결과 있음-->
                    <ul class="hash-lists">
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-hash">
                                <span class="hash"
                                    ><span>#</span> 해시 태그명 노출</span
                                >
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchHashtag from "../layouts/myTag/SearchHashtag.vue";

@Component({ components: { SearchHashtag } })
export default class MyTag extends Vue {}
</script>
