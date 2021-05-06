<template>
    <div class="box-hash-dropdown" :key="$store.getters.currCategory">
        <button data-val="" class="txt" @click="txtClick">
            <span># ALL TAG</span>
        </button>
        <div class="lists">
            <strong class="tit">해시태그</strong
            ><!--모바일 전용-->
            <button
                class="btn-m-hash-close"
                @click="listsClose"
                onclick="window.hashDropDown.listsClose()"
            ></button
            ><!--모바일 전용-->
            <ul>
                <!--비선택-->
                <li v-for="i in hashtags" :key="i.idx">
                    <button
                        :data-val="i"
                        class="btn btn-dropdown"
                        @click="btnDropdownClick(i)"
                        :ref="i"
                        onclick="window.hashDropDown.btnDropdownClick(this)"
                    >
                        <span>#{{ i }}</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { dim, gnb, hashDropDown } from "@/scripts/ui_common";
import tempCategory from "@/scripts/categoryList";
@Component({ components: {} })
export default class Hashtag extends Vue {
    @Prop() tag!: string;
    private hashtags: string[] = [];

    mounted() {
        hashDropDown.init();
        this.initCate();
    }

    async getCategory() {
        const result = await this.$api.getCategory();
        console.log("getCategory", result);
        return result;
    }
    //todo: 한번만 불러오게 수정하기
    async initCate() {
        const categories = await this.getCategory();

        this.hashtags.push("ALL TAG");

        let category = Object.keys(categories);

        for (const i in category) {
            let detailCtgry = categories[category[i]];
            for (const j in detailCtgry) {
                if (
                    this.$store.getters.currCategory.toLowerCase() === "posting"
                ) {
                    this.hashtags.push(detailCtgry[j]);
                } else {
                    if (
                        category[i].toLowerCase() ===
                        this.$store.getters.currCategory.toLowerCase()
                    ) {
                        this.hashtags.push(detailCtgry[j]);
                    }
                }
            }
        }
    }

    @Watch("$store.getters.currCategory")
    watchC() {
        this.hashtags = [];
        this.initCate();
    }

    @Watch("tag")
    async watchTag() {
        console.log('Watch',this.tag)
        this.hashtags = [];
        this.hashtags.push("ALL TAG");
        const categories = await this.getCategory();
        let category = Object.keys(categories);
        for (const i in category) {
            let detailCtgry = categories[category[i]];
            for (const j in detailCtgry) {
                if (category[i].toLowerCase() === this.tag) {
                    this.hashtags.push(detailCtgry[j]);
                }
            }
        }
    }

    txtClick() {
        hashDropDown.txtClick();
    }
    btnDropdownClick(arg: string) {
        //@ts-ignore
        hashDropDown.btnDropdownClick(this.$refs[arg][0]);
        this.$store.commit("hashtag", arg);
    }
    listsClose() {
        hashDropDown.listsClose();
    }
}
</script>

<style scoped>
</style>
