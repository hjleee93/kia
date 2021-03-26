<template>
  <div id="layer">
      <div class="layer-outer">
        <div class="layer-inner type-alert">
          <div class="layer-content">
            <div class="alert-content">
              <strong class="tit">앨범 쇼 이용 안내</strong>
              <p class="txt">모바일 버전에서는 지원되지 않는 기능입니다.<br />PC로 접속 후 이용 부탁드립니다.</p>
            </div>
            <div class="alert-btn">
              <button class="btn btn-confirm" @click="layerClose"><span>확인</span></button>
            </div>
          </div>
        </div>
        <div class="layer-inner album-show type-full-size">
          <div class="box-btn">
            <button class="btn btn-close" @click="albumPopCloseSample"><span>닫기</span></button>
          </div>
          <div class="layer-content">
            <div class="grid-wrap">
              <div class="grid">
                <!--
                  개발 관련하여 안내 사항
                  image를 강제로 188로 줄여 그 비율이 1.0681818182(176px)이 넘어가면
                  image를 강제로 width 480으로 늘려야합니다.

                  이미지가 미리 로딩이 되어서 width height값을 출력할수 있어야합니다.
                  아니면 data에 width height값을 저장이 필요할것으로 판단됩니다.

                  테스트 코드는 아래의 쪽 isotopeHorizontal 함수를 확인바랍니다.
                -->
                            <!--
                <div class="grid-item">
                  <button class="btn btn-image" style="width: 변동px; background-image: url(src)" onclick="albumPop.layerOpenDepth2()">
                    <div class="box-img"></div>
                  </button>
                </div>
                -->
                        </div>
                    </div>
                </div>

                <!--상세 이미지-->
                <div
                    class="layer-depth2"
                    @click="layerCloseDepth2()"
                >
                    <div class="layer-depth2-content">
                        <div class="box-img">
                            <img
                                src="../../assets/images/@temp/@temp_hive4.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {albumPop, isDesktop} from "@/scripts/ui_common";

@Component
export default class AlbumShow extends Vue {
    layerClose() {
        albumPop.layerClose();
    }

    albumPopCloseSample() {
        albumPop.layerClose(() => {
            // 상세 레이어 닫기
            isDesktop();
            document.querySelector("#layer .grid")!.innerHTML = "";
        });
    }
}
</script>

<style>
</style>