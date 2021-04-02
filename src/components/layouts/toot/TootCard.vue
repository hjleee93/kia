<template>
  <div :key="toot.id">
    <div class="list">
      <div class="box-user-info">
        <a href="#none" class="btn btn-user">
          <i class="icon icon-user"
          ><img
              :src="toot.userImg"
              alt=""
          /></i>
        </a>
        <div class="box-txt">
          <strong class="username"
          >{{ toot.userName }}</strong
          >
          <span class="date">{{toot.date}}</span>
        </div>
      </div>
      <div class="box-content">
        <a href="#none" class="btn btn-txt"
        >{{ toot.content }}
          <span v-if="toot.isMore" class="more">더보기</span>
        </a
        >
        <p class="hash-lists">
          <a v-for="tag in toot.tags" href="#none" class="btn btn-hash" :key="tag.id">
            #{{tag.tag}}
          </a>
        </p>
      </div>
      <div class="box-like">
        <i class="icon icon-like"></i>
        <strong class="like-num">{{ toot.likeCount }}</strong>
      </div>
      <div v-if="toot.img" class="box-img">
        <img
            :src="toot.img"
            alt=""
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class TootCard extends Vue {
  @Prop() private toot : any;

}
</script>

<style>
</style>