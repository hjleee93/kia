<template>
    <div class="box-hash-dropdown" :key="key">
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
@Component({ components: {} })
export default class Hashtag extends Vue {
    @Prop() tag!: string;
    private hashtags: string[] = [];
    private categories: any;
    private category: string = "";
    private key: string = '';

    async mounted() {
        hashDropDown.init();
        this.category = this.$store.getters.currCategory.toLowerCase();
        await new Promise<void>(async (resolve, reject) => {
            this.categories = await this.$store.getters.categories;
            resolve();
        }).then(() => {
            this.createHashtag();
        });
    }

    @Watch("$store.getters.currCategory")
    watchC() {
        this.category = this.$store.getters.currCategory.toLowerCase();
        this.key = this.category
        this.createHashtag();
    }

    //posting 용
    @Watch("tag")
    async watchTag() {
        this.categories = this.tag;      
        this.key = this.categories
        this.createHashtag();
    }

    createHashtag() {
        this.hashtags = [];
        this.hashtags.push("ALL TAG");
        
        let category = Object.keys(this.categories);
        for (const i in category) {
            let detailCtgry = this.categories[category[i]];
            for (const j in detailCtgry) {
                if (this.category === "posting") {
                    this.hashtags.push(detailCtgry[j]);
                } else {
                    if (category[i].toLowerCase() === this.category) {
                        this.hashtags.push(detailCtgry[j]);
                    }
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
