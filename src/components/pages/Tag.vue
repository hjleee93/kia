<template>
    <div id="content" class="my-tag">
        <!--content(S)-->
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchHashtag :hashtag="hashtag" @tags="getTags" />
                    <div class="sec-category">
                        <div class="box-grid-top">
                            <div class="floated left">
                                <template v-if="!isSearch">
                                    <p class="txt">검색결과</p>
                                </template>
                                <!--검색 전-->
                                <template v-else>
                                    <p class="txt">
                                        총 {{ tagList.length }}개의 검색 결과
                                    </p>
                                </template>
                                <!--검색 결과 없음-->
                                <!--<p class="txt">총 10개의 검색 결과</p>--><!--검색 결과 있음-->
                            </div>
                        </div>
                    </div>
                    <div class="dim" onclick="closeLayerSearch()"></div>
                </div>
            </div>
            <div class="sec-hash">
                <!--검색-->
                <div class="box-hash">
                    <!--검색 전-->
                    <div v-if="!isSearch" class="box-no-data">
                        <p class="txt">해시태그를 검색해주세요.</p>

                    </div>
                    <ul v-else-if="tagList.length > 0" class="hash-lists">
                        <!--검색 결과 있음-->
                        <template v-for="hashData in tagList">
                          
                            <li>
                                <button
                                    class="btn btn-hash"
                                    @click="clickedHashtag(hashData.name)"
                                >
                                    <span class="hash"
                                        ><span>#</span>{{ hashData.name }}</span
                                    >
                                </button>
                            </li>
                        </template>
                    </ul>

                    <!--검색 결과 없음-->
                    <div v-else class="box-no-data">
                        <p class="txt">
                            이 해시태그는 아직 사용되지 않았습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SearchHashtag from "@/components/layouts/myTag/SearchHashtag.vue";
import { gnb } from "@/scripts/ui_common";

@Component({ components: { SearchHashtag } })
export default class Tag extends Vue {
    isSearch: boolean = false;
    tagList: string[] = [];
    private hashtag: string = "";
    mounted() {
        gnb.init();
        this.$store.commit("currCategory", "Tag");
    }

    clickedHashtag(val: string) {
        this.hashtag = val;
        this.$router.push(`/mastodon/web/timelines/tag/${val}`)

    }
    getTags(tags: string[]) {
        if (tags) {
            this.tagList = tags;
            this.isSearch = true;
        }
    }
}
</script>
