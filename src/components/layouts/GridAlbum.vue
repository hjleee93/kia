<template>
    <div class="sec-grid">
        <!--검색 결과가 없는경우-->
        <!--<div class="no-data">
                <p class="txt">검색 결과가 없습니다.</p>
              </div>-->
        <div class="grid">
            <div class="grid-item">
                <a href="#" class="btn btn-link">
                    <div class="box-img">
                        <img
                            src="../../assets/images/@temp/@temp_hive1.jpg"
                            alt=""
                            style="width: 100%"
                        />
                        <i class="icon icon-play"></i
                        >
                        <!--동영상인 경우-->
                    </div>
                    <div class="box-cont">
                        <p class="txt">
                            안녕하세요. 이번 전시회에서 구경한 내용 공유합니다.
                            안녕하세요. 이번 전시회에서 구경한 내용
                            공유합니다... <span>더보기</span>
                        </p>
                        <span class="nic-name">hiid0806</span>
                    </div>
                </a>
                <!--비활성-->
                <button class="btn btn-like"></button>
                <!--활성화-->
                <!--<button class="btn btn-like active"></button>-->
                <!--활성화 모션-->
                <!--<button class="btn btn-like active motion"></button>-->
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Grid extends Vue {}
</script>