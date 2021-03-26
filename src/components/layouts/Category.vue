<template>
    <div>
        <div class="sec-category">
            <!--검색 한경우 외-->
            <div class="box-category">
                <ul class="category-lists">
                    <!--비활성화-->
                    <!--<button class="btn btn-category"></button>-->
                    <!--활성화-->

                    <!--<button class="btn btn-category active"></button>-->
                    <li class="list-all divider">
                        <button
                            @click.prevent="active = 'All'"
                            :class="{ active: isActive('All') }"
                            class="btn btn-category"
                        >
                            <span>All</span>
                        </button>
                    </li>
                    <li class="list-inspiration">
                        <button
                            @click.prevent="active = 'Inspiration'"
                            :class="{ active: isActive('Inspiration') }"
                            class="btn btn-category"
                        >
                            <span>Inspiration</span>
                        </button>
                    </li>
                    <li class="list-project">
                        <button
                            class="btn btn-category"
                            @click.prevent="active = 'Project'"
                            :class="{ active: isActive('Project') }"
                        >
                            <span>Project</span>
                        </button>
                    </li>
                    <li class="list-exhibition divider">
                        <button
                            class="btn btn-category"
                            @click.prevent="active = 'Exhibition'"
                            :class="{ active: isActive('Exhibition') }"
                        >
                            <span>Exhibition</span>
                        </button>
                    </li>
                    <li class="list-albumshow">
                        <button class="btn btn-category" @click="openAlbum">
                            <span>Albumshow</span>
                        </button>
                    </li>
                </ul>
            </div>
            <!--
                    dropdown 개발 관련하여 안내 사항
                    
                    .btn.btn-dropdown.active 가 설정되어 있다면 해당 button의 값을 초기 .txt에 값을 설정합니다.
                    .btn.btn-dropdown 버튼을 선택하면 해당 버튼에 있는 data-val 값을 .txt data-val값에 저장합니다.
                    개발쪽에서는 .txt data-val 부분을 가져다 쓰시면됩니다.
                    
                    1.
                    hashDropDown.init 의 함수의 경우 dom 에 있는 .box-hash-dropdown을 찾습니다.
                    .box-hash-dropdown이 호출된 경우 hashDropDown.init 함수를 호출해 주십시요~
                    
                    Inspiration, Project, Exhibition 일경우 display none || block 이 아닌경우
                    dom에서 제거 했다 다시 생성하였다면 다시 hashDropDown.init 함수를 호출하셔야 합니다.
                    
                    2. Mobile의 경우 hash dropdown이 있고 없고에 따라 상단의 height 변동이 있습니다.
                    때문에 .box-hash-dropdown을 보였다 안보였다 하는 과정에서
                    gnb.init을 재 호출 해주셔야 높이를 재 설정 합니다.
                    
                    3. Mobile의 경우 hash dropdown의 경우 현재 layout을 사용할수가 없으므로
                    .lists 부분을 전체 clone 하여 외부에 생성하여 컨트롤 하고 선택이 되면 다시
                    clone 하여 재자리에 append 시키는 방식을 사용합니다.
                  -->
            <!--hash tag-->
            <!--<div class="box-hash-dropdown">
                    <button data-val="" class="txt" onclick="hashDropDown.txtClick()"><span># hash1</span></button>
                    <div class="lists">
                      <strong class="tit">해시태그</strong>&lt;!&ndash;모바일 전용&ndash;&gt;
                      <button class="btn-m-hash-close" onclick="hashDropDown.listsClose()"></button>&lt;!&ndash;모바일 전용&ndash;&gt;
                      <ul>
                        &lt;!&ndash;비선택&ndash;&gt;
                        <li><button data-val="hash1" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash1</span></button></li>
                        &lt;!&ndash;선택&ndash;&gt;
                        <li><button data-val="hash2" class="btn btn-dropdown active" onclick="hashDropDown.btnDropdownClick(this)"><span># hash2</span></button></li>
                      </ul>
                    </div>
									</div>-->
        </div>
        <div class="sec-grid-top">
            <div class="box-grid-top">
                <div class="floated left">
                    <p class="txt">총 100개의 톳</p>
                    <!--<p class="txt">총 100개의 검색 결과</p>-->
                </div>
                <div class="floated right">
                    <ul class="sort-lists">
                        <li>
                            <button class="btn btn-sort active">
                                <span>최신순</span>
                            </button>
                        </li>
                        <!--활성화-->
                        <li>
                            <button class="btn btn-sort">
                                <span>인기순</span>
                            </button>
                        </li>
                        <!--비활성-->
                    </ul>
                </div>
            </div>
        <div id="layer">
      <div class="layer-outer">
        <div class="layer-inner type-alert">
          <div class="layer-content">
            <div class="alert-content">
              <strong class="tit">앨범 쇼 이용 안내</strong>
              <p class="txt">모바일 버전에서는 지원되지 않는 기능입니다.<br />PC로 접속 후 이용 부탁드립니다.</p>
            </div>
            <div class="alert-btn">
              <button class="btn btn-confirm" onclick="albumPop.layerClose();"><span>확인</span></button>
            </div>
          </div>
        </div>
        <div class="layer-inner album-show type-full-size">
          <div class="box-btn">
            <button class="btn btn-close" onclick="albumPopCloseSample();"><span>닫기</span></button>
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
          <div class="layer-depth2" onclick="albumPop.layerCloseDepth2();">
            <div class="layer-depth2-content">
              <div class="box-img">
                <img src="../../assets/images/@temp/@temp_hive4.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
        <div class="dim"></div>
    </div>
</template>

<script lang="ts">
import Isotope from '../../scripts/isotope.js';
import MobileAlbum from './MobileAlbum.vue'
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({components: {MobileAlbum}})
export default class Category extends Vue {
    dim: any;
    gnb: any;
    search: any;
    albumPop: any;

    isDesktop: any;

    private active = "All";

    isActive(value: string) {
        return this.active === value;
    }

    mounted() {
        //@ts-ignore
        this.gnb = window.gnb();
        this.gnb.init();
        //@ts-ignore
        this.search = window.search();
        this.search.init();
        //@ts-ignore
        this.dim = window.dim();
        this.dim.init();
        //@ts-ignore
        this.albumPop = window.albumPop();
this.albumPop.init();
        //@ts-ignore
        this.isDesktop = window.isDesktop();
    }

    openAlbum() {
         this.isotopeHorizontalSample()        
        this.albumPop.layerOpen(() => {
            return this.isDesktop()  && this.isotopeHorizontalSample();
        });
    }

      private callCount = 0;
      /* pre imge load sample */
      preload(imgLists: string[], callback: { (arrImgSizes: any): void; (arg0: boolean|{ src: string; width: number; height: number; }[]): void; }) {
        const preloadImages = () => {
          var b = this.testLoaded(imgLists);
          if (b) {
            setTimeout(function() {
              callback(b);
            }, 100);
          }
          if (!b) {
            setTimeout(() => {
              this.callCount++;
              if (this.callCount < 1000) {
                preloadImages();
              }
            }, 100);
          }
        }
        preloadImages();
      }
      testLoaded(imgLists: string|any[]) {
        var size = [];
        for (let i = 0; i < imgLists.length; i++) {
          let img = document.createElement('img');
          img.src = imgLists[i];
          size.push({
            src: img.src,
            width: img.width,
            height: img.height,
          })
          if (!img.complete) return false;
        }
        return size;
      }

      /* 엘범쇼 테스트 코드 */
     private albumshow: { layout: () => void; destroy: () => any; }|null = null;

      isotopeHorizontal(arrImgSizes: any) {
          console.log("?")
        var heightRatio = 1.0681818182; //가로가 176px 보다 작다면
        var dom = '';
        
        arrImgSizes?.forEach(function(o: { src: any; width: any; height: any; }) {
          var src = o.src;
          var width = o.width;
          var height = o.height;
          var imgheightRatio = height/width;
          var imgWidthRatio = width/height;
          var w: any = "auto";
          if (imgheightRatio > heightRatio) {
            w = 480;
          } else {
            w = Math.min(188 * imgWidthRatio, 480);
          }
          
          dom += '<div class="grid-item">';
          dom += '  <button class="btn btn-image" onClick="albumshowDetailOpenSample(\''+src+'\')">';
          dom += '    <div class="box-img" style="width: '+w+'px; background-image: url('+src+')">';
          dom += '    </div>';
          dom += '  </button>';
          dom += '</div>';
        })
        
        document.querySelector("#layer .grid")!.innerHTML = dom;
        
        var elem = document.querySelector('.album-show')!.querySelector('.grid');
        this.albumshow = new Isotope( elem, {
          layoutMode: 'masonryHorizontal',
          // initLayout: false,
          mansonryHorizontal: {
            itemSelector: '.grid-item',
          },
          transitionDuration: 0,
        });
        this.albumshow!.layout();
      }

      /* 앨범쇼 샘플 코드 */
      isotopeHorizontalSample() {
        document.querySelector("#layer .grid")!.innerHTML = "";
        this.preload([
          "../../assets/images/@temp/@temp_hive1.jpg",
          "../../assets/images/@temp/@temp_hive2.jpg",
          "../../assets/images/@temp/@temp_hive3.jpg",
          "../../assets/images/@temp/@temp_hive4.jpg",         
          "../../assets/images/@temp/@temp_rank1.jpg",
          "../../assets/images/@temp/@temp_rank2.jpg",
          "../../assets/images/@temp/@temp_hive1.jpg",
          "../../assets/images/@temp/@temp_hive2.jpg",
          "../../assets/images/@temp/@temp_hive3.jpg",
          "../../assets/images/@temp/@temp_hive4.jpg",
        ], this.isotopeHorizontal);
      }

      /* 앨범쇼 상세 페이지 테스트 기능 */
      albumshowDetailOpenSample(src: any) {
        (document.querySelector(".layer-depth2 .box-img img") as HTMLInputElement)!.src = src;
        this.albumPop.layerOpenDepth2()//상세 레이어 열기
      }

      /* 앨범쇼 팝업 닫기 테스트 기능 */
      albumPopCloseSample() {
        this.albumPop.layerClose(() => {// 상세 레이어 닫기
          this.isDesktop() && this.albumshow!.destroy();
          document.querySelector("#layer .grid")!.innerHTML = "";
        });
      }
}
</script>

<style>
</style>