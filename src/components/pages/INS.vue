<template>
  <div id="content" class="rank">
    <!--content(S)-->
    <div class="content">
      <div class="wrap-fixed">
      </div>
      <!--컨텐츠 영역-->
      <div class="wrap-content">
        <div class="sec-left">
          <!--인기 툿-->
          <div class="sec-toot">
            <h2 class="b-tit">툿</h2>
            <div class="box-toot">
              <div class="toot-lists">
                <toot-card  v-for="toot in tootList" :toot="toot">
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
import { Component, Prop, Vue } from "vue-property-decorator";

import BestUser from '../layouts/rank/BestUser.vue'
import Calendar from '../layouts/rank/Calendar.vue'
import BestHashtag from '../layouts/rank/BestHastag.vue'
import {gnb} from "@/scripts/ui_common";
import TootCard from "@/components/layouts/toot/TootCard.vue";

@Component({components: {TootCard, Calendar, BestUser,BestHashtag}})
export default class INS extends Vue {
  private tootList : any[] = [
    {
      userImg : 'images/@temp/@temp_rank2.jpg',
      userName : 'Sunny Jeong',
      date : '9월 13일',
      content : '광복절이 건국절이 아닌 이유가 삼일절과도 관련이 있다. 3.1 운동을 계기로 하여 한반도를 비롯하여 해외 각지에서 존재하던 독립운동 구심체가 통일된 민주주의 제도의 임시정부 수립운이어져이어이어동으로 이어져...',
      img : '',
      tags : [
        { tag : '2020' },
        { tag : '전시회' },
        { tag : '하반기' },
      ],
      likeCount : '1,504',
      isMore : true,
    },
    {
      userImg : 'images/@temp/@temp_rank2.jpg',
      userName : 'Sunny Jeong',
      date : '9월 13일',
      content : '2020년 하반기 전시회 사진입니다.',
      img : 'images/@temp/@temp_rank1.jpg',
      tags : [
        { tag : '2020' },
        { tag : '전시회' },
        { tag : '하반기' },
      ],
      likeCount : '1,504',
      isMore : false,
    },
    {
      userImg : 'images/@temp/@temp_rank2.jpg',
      userName : 'Sunny Jeong',
      date : '9월 13일',
      content : '2020년 하반기 전시회 사진입니다.',
      img : 'images/@temp/@temp_rank1.jpg',
      tags : [
        { tag : '2020' },
        { tag : '전시회' },
        { tag : '하반기' },
      ],
      likeCount : '1,504',
      isMore : false,
    },
    {
      userImg : 'images/@temp/@temp_rank2.jpg',
      userName : 'Sunny Jeong',
      date : '9월 13일',
      content : '2020년 하반기 전시회 사진입니다.',
      img : 'images/@temp/@temp_rank1.jpg',
      tags : [
        { tag : '2020' },
        { tag : '전시회' },
        { tag : '하반기' },
      ],
      likeCount : '1,504',
      isMore : false,
    },
  ];

  mounted() {
    gnb.init();
  }
}
</script>

<style>
</style>