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
                <div class="toot-lists">
                  <div v-for="toot in tootList" :key="toot.id">
                    <div class="list">
                      <div class="box-user-info">
                        <a href="#none" class="btn btn-user">
                          <i class="icon icon-user"
                            ><img :src="toot.userImg" alt=""
                          /></i>
                        </a>
                        <div class="box-txt">
                          <strong class="username">{{ toot.userName }}</strong>
                          <span class="date">{{ toot.date }}</span>
                        </div>
                      </div>
                      <div class="box-content">
                        <a href="#none" class="btn btn-txt"
                          >{{ toot.content }}
                          <span v-if="toot.isMore" class="more">더보기</span>
                        </a>
                        <p class="hash-lists">
                          <a
                            v-for="tag in toot.tags"
                            href="#none"
                            class="btn btn-hash"
                            :key="tag.id"
                          >
                            #{{ tag.tag }}
                          </a>
                        </p>
                      </div>
                      <div class="box-like">
                        <i class="icon icon-like"></i>
                        <strong class="like-num">{{ toot.likeCount }}</strong>
                      </div>
                      <div v-if="toot.img" class="box-img">
                        <img :src="toot.img" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sec-right">
            <!--best 사용자-->
            <BestUser />
            <!--best 해스태그-->
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

@Component({ components: { Calendar, BestUser, BestHashtag } })
export default class Rank extends Vue {
  private tootList: any[] = [
    {
      userImg: "images/@temp/@temp_rank2.jpg",
      userName: "Sunny Jeong",
      date: "9월 13일",
      content:
        "광복절이 건국절이 아닌 이유가 삼일절과도 관련이 있다. 3.1 운동을 계기로 하여 한반도를 비롯하여 해외 각지에서 존재하던 독립운동 구심체가 통일된 민주주의 제도의 임시정부 수립운이어져이어이어동으로 이어져...",
      img: "",
      tags: [{ tag: "2020" }, { tag: "전시회" }, { tag: "하반기" }],
      likeCount: "1,504",
      isMore: true,
    },
    {
      userImg: "images/@temp/@temp_rank2.jpg",
      userName: "Sunny Jeong",
      date: "9월 13일",
      content: "2020년 하반기 전시회 사진입니다.",
      img: "images/@temp/@temp_rank1.jpg",
      tags: [{ tag: "2020" }, { tag: "전시회" }, { tag: "하반기" }],
      likeCount: "1,504",
      isMore: false,
    },
    {
      userImg: "images/@temp/@temp_rank2.jpg",
      userName: "Sunny Jeong",
      date: "9월 13일",
      content: "2020년 하반기 전시회 사진입니다.",
      img: "images/@temp/@temp_rank1.jpg",
      tags: [{ tag: "2020" }, { tag: "전시회" }, { tag: "하반기" }],
      likeCount: "1,504",
      isMore: false,
    },
    {
      userImg: "images/@temp/@temp_rank2.jpg",
      userName: "Sunny Jeong",
      date: "9월 13일",
      content: "2020년 하반기 전시회 사진입니다.",
      img: "images/@temp/@temp_rank1.jpg",
      tags: [{ tag: "2020" }, { tag: "전시회" }, { tag: "하반기" }],
      likeCount: "1,504",
      isMore: false,
    },
  ];

  mounted() {
    gnb.init();
    tab.init();
    dim.init();
    calendar.init();
  }

  onClickTab(event: Event) {
    tab.click(event.target);
  }
}
</script>

<style></style>
