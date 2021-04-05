<template>
    <div id="content" class="rank INS">
        <!--content(S)-->
        <div class="content" ref="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <div class="sec-tab">
                        <div class="box-tab">
                        </div>
                    </div>
<!--                    <Calendar />-->
                </div>
            </div>
            <!--컨텐츠 영역-->
            <div class="wrap-content">
                <div class="sec-left">
                    <!--인기 툿-->
                    <div class="sec-toot open">
                        <h2 class="b-tit">툿</h2>
                        <div class="box-toot">
                            <div class="toot-lists">
                                <toot-card v-for="toot in tootList" :toot="toot">
                                </toot-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--content(E)-->
    </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import BestUser from '../layouts/rank/BestUser.vue'
import Calendar from '../layouts/rank/Calendar.vue'
import BestHashtag from '../layouts/rank/BestHastag.vue'
import {gnb} from "@/scripts/ui_common";
import TootCard from "@/components/layouts/toot/TootCard.vue";

enum ETootLoadingState {
    none,
    loading,
    complete,
    end,
}

@Component({components: {TootCard, Calendar, BestUser, BestHashtag}})
export default class INS extends Vue {
    private tootList: any[] = [
        // {
        //     account: {
        //         username: 'Sunny Jeong',
        //         avatar: 'images/@temp/@temp_rank2.jpg',
        //     },
        //     media_attachments : [
        //         {
        //             preview_url : '',
        //         }
        //     ],
        //     created_at: '9월 13일',
        //     content: '광복절이 건국절이 아닌 이유가 삼일절과도 관련이 있다. 3.1 운동을 계기로 하여 한반도를 비롯하여 해외 각지에서 존재하던 독립운동 구심체가 통일된 민주주의 제도의 임시정부 수립운이어져이어이어동으로 이어져...',
        //     img: '',
        //     tags: [
        //         {name: '2020'},
        //         {name: '전시회'},
        //         {name: '하반기'},
        //     ],
        //     favourites_count: '1,504',
        // },
    ];
    private limitCount : number = 15;
    private loadingState : ETootLoadingState = ETootLoadingState.none;

    mounted() {
        gnb.init();
        this.loadToot();
        window.addEventListener('scroll', this.scrollHandler);
    }

    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler)
    }


    scrollHandler() {
        let el = document.documentElement;

        if (el.scrollTop === 0) {

        } else if (el.scrollTop + el.clientHeight >= el.offsetHeight - 150) {
            this.loadToot();
        }
    }

    async loadToot() {
        if( this.loadingState === ETootLoadingState.none || this.loadingState === ETootLoadingState.complete ) {

            let max_id = undefined;
            if( this.tootList.length ) {
                max_id = this.tootList[ this.tootList.length - 1 ].id;
            }
            this.loadingState = ETootLoadingState.loading;

            const result = await this.$api.getToots( max_id, this.limitCount );
            if( result.length < this.limitCount ) {
                this.loadingState = ETootLoadingState.end;
            }
            else {
                this.loadingState = ETootLoadingState.complete;

            }
            this.tootList.push(...result);
        }
    }
}
</script>

<style lang="scss">
//@media (min-width: 1024px)
#content.INS .wrap-content .sec-left, #content.rank .wrap-content .sec-right {
    height: 100%;
}

</style>