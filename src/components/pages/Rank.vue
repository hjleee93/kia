<template>
    <div class="root">
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
                        <Calendar @gte="getGte" @lte="getLte" />
                    </div>
                </div>
                <!--컨텐츠 영역-->
                <div class="wrap-content">
                    <div class="sec-left" @scroll="handleScroll">
                        <!--인기 툿-->
                        <div class="sec-toot">
                            <h2 class="b-tit">인기 툿</h2>
                            <div class="box-toot">
                                <div class="toot-lists">
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import BestUser from "../layouts/rank/BestUser.vue";
import Calendar from "../layouts/rank/Calendar.vue";
import BestHashtag from "../layouts/rank/BestHastag.vue";
import { calendar, dim, gnb, tab } from "@/scripts/ui_common";

import TootCard from "@/components/layouts/toot/TootCard.vue";
import { bus } from "@/main";
enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}

@Component({ components: { Calendar, BestUser, BestHashtag, TootCard } })
export default class Rank extends Vue {
    private tootList: any[] = [];
    private limitCount: number = 10;
    private loadingState: ETootLoadingState = ETootLoadingState.none;
    private gte!: string;
    private lte: string = this.getFormatDate(new Date());
    private offset = 20;
    private limit = 20;

    async mounted() {
        gnb.init();
        this.$store.commit("currCategory", "Rank");
        let today = new Date();
        today.setDate(today.getDate() - 30);
        this.gte = this.getFormatDate(today);
        const result = await this.$api.getBestToot(
            this.gte,
            this.lte,
            this.limit
        );
        this.tootList = result;
    }
    beforeDestroy() {
        bus.$off("gte");
        bus.$off("lte");
    }
    handleScroll(el: any) {
        if (
            el.target.offsetHeight + el.target.scrollTop >=
            el.target.scrollHeight
        ) {
            this.loadToot();
        }
    }
    onClickTab(event: Event) {
        tab.click(event.target);
    }

    @Watch("gte")
    @Watch("lte")
    async loadToot() {
        try {
            const result = await this.$api.getBestToot(
                this.gte,
                this.lte,
                this.limit,
                this.offset
            );

            console.log("watch", this.gte, this.lte, result);
            if (result.length < 10) {
                this.offset += result.length;
            } else {
                this.offset += this.limit;
            }
            this.tootList.push(...result);
        } catch (err) {
            console.log(err);
        }
    }

    getFormatDate(date: Date) {
        let year = date.getFullYear();
        let month = 1 + date.getMonth();
        //@ts-ignore
        month = month >= 10 ? month : "0" + month;
        let day = date.getDate();
        //@ts-ignore
        day = day >= 10 ? day : "0" + day;
        return year + "-" + month + "-" + day;
    }
    getLte(e: any) {
        this.offset = 0;
        this.limit = 20;
        this.tootList = [];
        this.lte = e;
    }
    getGte(e: any) {
        this.offset = 0;
        this.limit = 20;
        this.tootList = [];
        this.gte = e;
    }
}
</script>

<style></style>
