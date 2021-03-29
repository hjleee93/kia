<template>
  <div class="box-hash-dropdown">
                    <button data-val="" class="txt" @click="txtClick()"><span># hash1</span></button>
                    <div class="lists">
                      <strong class="tit">해시태그</strong><!--모바일 전용-->
                      <button class="btn-m-hash-close" onclick="hashDropDown.listsClose()"></button><!--모바일 전용-->
                      <ul>
                        <!--비선택-->
                        <li><button data-val="hash1" class="btn btn-dropdown" @click="btnDropdownClick('hash1')" ref="hash1"><span># hash1</span></button></li>
                        <!--선택-->
                        <li><button data-val="hash2" class="btn btn-dropdown active" @click="btnDropdownClick('hash2')" ref="hash2"><span># hash2</span></button></li>
                        <li><button data-val="hash3" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash3</span></button></li>
                        <li><button data-val="hash4" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash4</span></button></li>
                        <li><button data-val="hash5" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash5</span></button></li>
                        <li><button data-val="hash6" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash6</span></button></li>
                        <li><button data-val="hash7" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash7</span></button></li>
                        <li><button data-val="hash8" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash8</span></button></li>
                        <li><button data-val="hash9" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash9</span></button></li>
                        <li><button data-val="hash10" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash10</span></button></li>
                        <li><button data-val="hash11" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash11</span></button></li>
                        <li><button data-val="hash12" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash12</span></button></li>
                        <li><button data-val="hash13" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash13</span></button></li>
                        <li><button data-val="hash14" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash14</span></button></li>
                        <li><button data-val="hash15" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash15</span></button></li>
                        <li><button data-val="hash16" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash16</span></button></li>
                        <li><button data-val="hash17" class="btn btn-dropdown" onclick="hashDropDown.btnDropdownClick(this)"><span># hash17</span></button></li>
                      </ul>
                    </div>
									</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
    dim,
    gnb,
    hashDropDown
} from "@/scripts/ui_common";

@Component({ components: {} })
export default class Hashtag extends Vue {

  mounted(){
    hashDropDown.init();
  }

  txtClick(){
    hashDropDown.txtClick()
  }
  btnDropdownClick(arg: string){
    hashDropDown.btnDropdownClick(this.$refs[arg])
  }

}
</script>

<style>

</style>