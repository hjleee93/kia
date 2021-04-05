<template>
  <div :key="toot.id">
    <div class="list">
      <div class="box-user-info">
        <a href="#none" class="btn btn-user">
          <i class="icon icon-user"
          ><img
              :src="toot.account.avatar"
              alt=""
          /></i>
        </a>
        <div class="box-txt">
          <strong class="username"
          >{{ toot.account.username }}</strong
          >
          <span class="date">{{toot.date}}</span>
        </div>
      </div>
      <div class="box-content">
        <a href="#none" class="btn btn-txt"
            v-html="toot.content"
        >
          <span class="more">더보기</span>
        </a
        >
        <p class="hash-lists">
          <a v-for="tag in toot.tags" href="#none" class="btn btn-hash" :key="tag.id">
            #{{tag.name}}
          </a>
        </p>
      </div>
      <div class="box-like">
        <i class="icon icon-like"></i>
        <strong class="like-num">{{ toot.favourites_count }}</strong>
      </div>
      <div v-if="toot.media_attachments && toot.media_attachments.length" class="box-img">
        <img
            :src="toot.media_attachments[0].preview_url"
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

<style lang="scss">
    .box-img {
        img {
            //object-fit: cover;
            //max-height: 200px;
        }
    }
</style>