<template>
    <div id="content" class="rank">
        <!--content(S)-->
        <div class="content">
            <!--날짜 영역-->
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <!--모바일 전용 탭-->
                    <div class="sec-tab">
                        <div class="box-tab">
                            <ul class="tab-lists">
                                <!--
                        tab 개발시 안내사항
                        
                        tab.init 의 경우
                        .btn-tab.active 초기의 찾아 해당 data-target에 해당하는 content list 활성화 합니다.
                      -->
                                <!--활성화-->
                                <!--<button class="btn btn-tab active">인기 툿</button>-->
                                <!--비활성화-->
                                <!--<button class="btn btn-tab">인기 툿</button>-->
                                <li>
                                    <button
                                        data-target="sec-toot"
                                        class="btn btn-tab active"
                                        onclick="tab.click(this)"
                                    >
                                        <span>인기 툿</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-target="sec-best-user"
                                        class="btn btn-tab"
                                        onclick="tab.click(this)"
                                    >
                                        <span>BEST 사용자</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-target="sec-best-hash"
                                        class="btn btn-tab"
                                        onclick="tab.click(this)"
                                    >
                                        <span>BEST 해시태그</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                   <Calendar/>
                </div>
            </div>
            <!--컨텐츠 영역-->
            <div class="wrap-content">
                <div class="sec-left">
                    <!--인기 툿-->
                    <div class="sec-toot">
                        <h2 class="b-tit">인기 툿</h2>
                        <div class="box-toot">
                            <div class="toot-lists">
                                <!--이미지가 없는 케이스-->
                                <div class="list">
                                    <div class="box-user-info">
                                        <a href="#none" class="btn btn-user">
                                            <i class="icon icon-user"
                                                ><img
                                                    src="../../assets/images/@temp/@temp_rank2.jpg"
                                                    alt=""
                                            /></i>
                                        </a>
                                        <div class="box-txt">
                                            <strong class="username"
                                                >Sunny Jeong</strong
                                            >
                                            <span class="date">9월 13일</span>
                                        </div>
                                    </div>
                                    <div class="box-content">
                                        <a href="#none" class="btn btn-txt">
                                            광복절이 건국절이 아닌 이유가
                                            삼일절과도 관련이 있다. 3.1 운동을
                                            계기로 하여 한반도를 비롯하여 해외
                                            각지에서 존재하던 독립운동 구심체가
                                            통일된 민주주의 제도의 임시정부
                                            수립운이어져이어이어동으로 이어져...
                                            <span class="more">더보기</span>
                                        </a>
                                        <p class="hash-lists">
                                            <a href="#none" class="btn btn-hash"
                                                >#2020</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#전시회</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#하반기</a
                                            >
                                        </p>
                                    </div>
                                    <div class="box-like">
                                        <i class="icon icon-like"></i>
                                        <strong class="like-num">1,504</strong>
                                    </div>
                                    <!--
                        <div class="box-img">
                          <img src="../images/@temp/@temp_rank1.jpg" alt="" />
                        </div>
                        -->
                                </div>
                                <!--이미지가 있는 케이스-->
                                <div class="list">
                                    <div class="box-user-info">
                                        <a href="#none" class="btn btn-user">
                                            <i class="icon icon-user"
                                                ><img
                                                    src="../../assets/images/@temp/@temp_rank2.jpg"
                                                    alt=""
                                            /></i>
                                        </a>
                                        <div class="box-txt">
                                            <strong class="username"
                                                >Sunny Jeong</strong
                                            >
                                            <span class="date">9월 13일</span>
                                        </div>
                                    </div>
                                    <div class="box-content">
                                        <a href="#none" class="btn btn-txt"
                                            >2020년 하반기 전시회 사진입니다.</a
                                        >
                                        <p class="hash-lists">
                                            <a href="#none" class="btn btn-hash"
                                                >#2020</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#전시회</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#하반기</a
                                            >
                                        </p>
                                    </div>
                                    <div class="box-like">
                                        <i class="icon icon-like"></i>
                                        <strong class="like-num">1,504</strong>
                                    </div>
                                    <div class="box-img">
                                        <img
                                            src="../../assets/images/@temp/@temp_rank1.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sec-right">
                    <!--best 사용자-->
                   <BestUser/>
                    <!--best 해스태그-->
                   <BestHashtag/>
                </div>
            </div>
        </div>
        <!--content(E)-->
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BestUser from '../layouts/rank/BestUser.vue'
import Calendar from '../layouts/rank/Calendar.vue'
import BestHashtag from '../layouts/rank/BestHastag.vue'

@Component({components: {Calendar, BestUser,BestHashtag}})
export default class Rank extends Vue {
 
}
</script>

<style>
</style>