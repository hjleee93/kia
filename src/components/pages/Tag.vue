<template>
    <div id="content" class="my-tag">
        <!--content(S)-->
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <!-- <SearchHashtag :hashtag="hashtag" @tags="getTags" /> -->
                    <div class="sec-search">
                        <div class="box-layer">
                            <div class="box-search-form">
                                <div class="box-input">
                                    <label class="input">
                                        <input
                                            v-model="inputHashtag"
                                            type="text"
                                            name="search"
                                            placeholder="해시태그 검색"
                                            autocomplete="off"
                                        />
                                    </label>
                                    <!--검색용-->
                                    <template v-if="!isDone">
                                        <button
                                            class="btn btn-search"
                                            @click="
                                                searchTag(inputHashtag, true)
                                            "
                                            :class="[
                                                inputHashtag.length === 0
                                                    ? ''
                                                    : 'active',
                                                isDone ? 'delete' : '',
                                            ]"
                                        ></button>
                                    </template>
                                    <!-- 삭제용 -->
                                    <template v-else>
                                        <button
                                            class="btn btn-search delete"
                                            @click="deleteTag"
                                        ></button>
                                    </template>
                                    <!--조회 중-->
                                    <!--<button class="btn btn-search active"></button>-->
                                    <!--조회 완료-->
                                    <!--<button class="btn btn-search delete"></button>-->
                                </div>
                            </div>
                        </div>
                    </div>
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
import { gnb } from "@/scripts/ui_common";

@Component({ components: {} })
export default class Tag extends Vue {
    isSearch: boolean = false;
    tagList: string[] = [];
    private hashtag: string = "";
    private inputHashtag: string = "";
    private isDone: boolean = false;
    private offset = 0;

    mounted() {
        gnb.init();
        this.$store.commit("currCategory", "Tag");
        window.addEventListener("scroll", this.scrollHandler);
        window.addEventListener("keydown", this.handleKeyDown);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e: any) {
        if (e.code === "Enter" || e.keyCode === 13) {
            this.tagList = [];
            this.offset = 0;
            this.searchTag(this.inputHashtag);
        }
    }

    clickedHashtag(val: string) {
        this.hashtag = val;
        this.$router.push(`/mastodon/web/timelines/tag/${val}`);
    }
    getTags(tags: string[]) {
        if (tags) {
            this.tagList = tags;
            this.isSearch = true;
        }
    }

    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight > el.scrollHeight - 150) {
            this.searchTag(this.inputHashtag);
        }
    }

    async searchTag(input: string, newSearch?: boolean) {
        const limit = 30;

        if (newSearch) {
            this.tagList = [];
            this.offset = 0;
        }
        this.isSearch = true;
        const el = document.documentElement;

        try {
            const result = await this.$api.searchHashtag(
                input,
                this.offset,
                limit
            );
            if (result.length < 30) {
                this.offset += result.length;
            } else {
                this.offset += limit;
            }
            this.tagList.push(...result);
            this.isDone = true;
        } catch (err) {
            console.log(err);
        }
    }
    deleteTag() {
        this.isSearch = false;
        this.inputHashtag = "";
        this.tagList = [];
        this.offset = 0;
        this.isDone = false;
    }
}
</script>
