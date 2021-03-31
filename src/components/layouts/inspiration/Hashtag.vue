<template>
    <div class="box-hash-dropdown">
        <button data-val="" class="txt" @click="txtClick">
            <span># hashtag1</span>
        </button>
        <div class="lists">
            <strong class="tit">해시태그</strong
            ><!--모바일 전용-->
            <button class="btn-m-hash-close" @click="listsClose"></button
            ><!--모바일 전용-->
            <ul>
                <!--비선택-->                
                <li v-for="i in hashtags" :key="i">
                    <button
                        :data-val="i"
                        class="btn btn-dropdown"
                        @click="btnDropdownClick(i)"
                        :ref="i"
                    >
                        <span>#{{i}}</span>
                    </button>
                </li>
               
            </ul>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { dim, gnb, hashDropDown } from "@/scripts/ui_common";

@Component({ components: {} })
export default class Hashtag extends Vue {
    private hashtags: string[] = ['hashtag1','hashtag2','hashtag3','hashtag4','hashtag5','hashtag6','hashtag7','hashtag8','hashtag9',
    'hashtag10','hashtag11','hashtag12','hashtag13','hashtag14','hashtag15','hashtag16','hashtag17']


    mounted() {
        hashDropDown.init();
    }

    txtClick() {
        hashDropDown.txtClick();
    }
    btnDropdownClick(arg: string) {

        
        //@ts-ignore
        hashDropDown.btnDropdownClick(this.$refs[arg][0]);
    }
    listsClose() {
        hashDropDown.listsClose();
    }
}
</script>

<style>
</style>