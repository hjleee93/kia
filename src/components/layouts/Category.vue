<template>
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

    <Hashtag />
  </div>
</template>

<script lang="ts">
import Hashtag from "../layouts/inspiration/Hashtag.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { albumPop, dim, gnb, isDesktop, search } from "@/scripts/ui_common";

@Component({ components: { Hashtag } })
export default class Category extends Vue {
  private active = "All";

  isActive(value: string) {
    return this.active === value;
  }

  mounted() {
    gnb.init();
    search.init();
    dim.init();
  }

  openAlbum(): void {
    albumPop.layerOpen();
  }
}
</script>

<style></style>
