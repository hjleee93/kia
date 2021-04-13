<template>
    <div class="root">
        <div>
            <!-- <form @submit.prevent="send" @keydown.ctrl.enter.prevent="send">
        <textarea placeholder="Toot something!" v-model="message"></textarea>
        <div class="previews" v-if="uploads.length > 0">
          <div v-for="image in uploads">
            <img :src="image.preview_url" />
            <button @click="unUpload(image)">Delete</button>
          </div>
        </div>
        <div>
          <label
            title="Upload files"
            class="fileSelect"
            for="fileUploader"
          /><button @click="send">Toot!</button>
          <input
            type="file"
            multiple
            id="fileUploader"
            name="fileUploader"
            @change="onSelectFile"
            :disabled="uploads.length > 3"
          />
        </div>
      </form> -->
        </div>

        <div id="content" class="rank">
            <!--content(S)-->
            <div class="content">
                <!--날짜 영역-->
                <div class="wrap-fixed">
                    <div class="sec-fixed">
                        <!--모바일 전용 탭-->
                        <div class="sec-tab">
                            <div class="box-tab">
                                <ul class="tab-lists">
                                    <!--
                        tab 개발시 안내사항

                        tab.init 의 경우
                        .btn-tab.active 초기의 찾아 해당 data-target에 해당하는 content list 활성화 합니다.
                      -->
                                    <!--활성화-->
                                    <!--<button class="btn btn-tab active">인기 툿</button>-->
                                    <!--비활성화-->
                                    <!--<button class="btn btn-tab">인기 툿</button>-->
                                    <li>
                                        <button
                                            data-target="sec-toot"
                                            class="btn btn-tab active"
                                            @click="onClickTab"
                                        >
                                            <span>인기 툿</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            data-target="sec-best-user"
                                            class="btn btn-tab"
                                            @click="onClickTab"
                                        >
                                            <span>BEST 사용자</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            data-target="sec-best-hash"
                                            class="btn btn-tab"
                                            @click="onClickTab"
                                        >
                                            <span>BEST 해시태그</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Calendar />
                    </div>
                </div>
                <!--컨텐츠 영역-->
                <div class="wrap-content">
                    <div class="sec-left">
                        <!--인기 툿-->
                        <div class="sec-toot">
                            <h2 class="b-tit">인기 툿</h2>
                            <div class="box-toot">
                                <div class="toot-lists" @scroll="scrollHandler">
                                    <toot-card
                                        v-for="toot in tootList"
                                        :toot="toot"
                                        :key="toot.id"
                                        class="single-toot"
                                    >
                                    </toot-card>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sec-right">
                        <!--best 사용자-->
                        <BestUser />
                        <!--best 해시태그-->
                        <BestHashtag />
                    </div>
                </div>
            </div>
            <!--content(E)-->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BestUser from "../layouts/rank/BestUser.vue";
import Calendar from "../layouts/rank/Calendar.vue";
import BestHashtag from "../layouts/rank/BestHastag.vue";
import { calendar, dim, gnb, tab } from "@/scripts/ui_common";

import TootCard from "@/components/layouts/toot/TootCard.vue";

enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}

@Component({ components: { Calendar, BestUser, BestHashtag, TootCard } })
export default class Rank extends Vue {
    private tootList: any[] = [];

    private limitCount: number = 5;
    private loadingState: ETootLoadingState = ETootLoadingState.none;

    mounted() {
        gnb.init();
        this.loadToot();
        // window.addEventListener("scroll", this.scrollHandler);

        const listElm = document.querySelector(".list");
        if (listElm !== null) {
            listElm.addEventListener("scroll", (e) => {
                if (
                    listElm.scrollTop + listElm.clientHeight >=
                    listElm.scrollHeight
                ) {
                    this.scrollHandler();
                }
            });
        }

        // Initially load some items.
        this.scrollHandler();
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    scrollHandler() {
        console.log("scroll");
        let el = document.querySelector(".wrap-content")!;

        if (el.scrollTop === 0) {
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
            console.log("123", el.scrollTop);
            this.loadToot();
        }
    }

    onClickTab(event: Event) {
        tab.click(event.target);
    }

    async loadToot() {
        if (
            this.loadingState === ETootLoadingState.none ||
            this.loadingState === ETootLoadingState.complete
        ) {
            let max_id = undefined;
            if (this.tootList.length) {
                max_id = this.tootList[this.tootList.length - 1].id;
            }
            this.loadingState = ETootLoadingState.loading;

            const result = await this.$api.getToots(max_id, this.limitCount);

            if (result.length < this.limitCount) {
                this.loadingState = ETootLoadingState.end;
            } else {
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        const el = document.documentElement;
                        if (el.scrollHeight <= el.clientHeight) {
                            this.loadingState = ETootLoadingState.complete;
                            this.loadToot();
                        } else {
                            this.loadingState = ETootLoadingState.complete;
                        }
                    });
                });
            }
            this.tootList.push(...result);
        }
    }
}
</script>

<style></style>
