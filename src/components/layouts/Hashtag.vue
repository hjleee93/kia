<template>
    <div class="box-hash-dropdown">
        <button data-val="" class="txt" @click="txtClick">
            <template v-if="$store.getters.currCategory !== 'Posting'">
                <span># {{ hashtags[0] }}</span>
            </template>
            <template v-else>
                <span># ALL TAG</span>
            </template>
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
                <li v-for="i in hashtags" :key="i">
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
        return tempCategory;
    }
    async initCate() {
        const categories = await this.getCategory();

        this.$store.commit("categories", categories);

        if (this.$store.getters.currCategory === "Posting") {
            for (const i in this.$store.getters.categories) {
                for (const j in this.$store.getters.categories[i].tags) {
                    this.hashtags.push(
                        this.$store.getters.categories[i].tags[j].name
                    );
                }
            }
        } else {
            const tags = this.$store.getters.category(this.tag)?.tags;
            if (tags) {
                for (const i in tags) {
                    this.hashtags.push(tags[i].name);
                }
            }
        }
    }

    @Watch("store.state.categories")
    watchC() {
        this.initCate();
    }

    txtClick() {
        hashDropDown.txtClick();
    }
    async btnDropdownClick(arg: string) {
        //미디어 태그 분류
        let mediaTag: any[] = [];
        //@ts-ignore
        hashDropDown.btnDropdownClick(this.$refs[arg][0]);

        // try {
        //     const result = await this.$api.getTagToots(arg);

        //     for (const i in result) {
        //         if (result[i].media_attachments.length > 0) {
        //             mediaTag.push(result[i]);
        //         }
        //     }
        this.$store.commit("hashtag", arg);
        // console.log(arg)

        //     this.$store.commit("tootCnt", mediaTag.length);
        //     this.$emit("tagResult", mediaTag);
        // } catch (err) {
        //     console.log(err);
        // }
    }
    listsClose() {
        hashDropDown.listsClose();
    }
}
</script>

<style scoped>
</style>
