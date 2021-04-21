<template>
  <div :key="toot.id">
    <div class="list">
      <div class="box-user-info">
        <router-link :to="'/mastodon/web/accounts/' + toot.account.id">
          <a class="btn btn-user">
            <i class="icon icon-user">
              <img :src="toot.account.avatar" alt="" />
            </i>
          </a>
        </router-link>
        <div class="box-txt">
          <router-link :to="'/mastodon/web/accounts/' + toot.account.id"
            ><strong class="username"> {{ toot.account.acct }} </strong>
          </router-link>
          <span class="date"
            >{{ toot.created_at.split("-")[1] }}월
            {{ toot.created_at.split("-")[2].substring(0, 2) }}일</span
          >
        </div>
      </div>
      <div class="box-content">
        <template v-if="height > 59">
          <p ref="txtBox" class="btn btn-txt content" v-html="toot.text"></p>

          <p class="txt more">
            <router-link :to="'/mastodon/web/statuses/' + toot.id">
              <span class="txt more">더보기</span></router-link
            >
          </p>
        </template>
        <template v-else>
          <a ref="txtBox" class="btn btn-txt content" v-html="toot.text"> </a>
        </template>
      </div>
      <p class="hash-lists">
        <router-link
          v-for="idx in this.tag"
          :key="idx.id"
          :to="`mastodon/tags/${idx}`"
          ><span class="tag">#{{ idx }}</span></router-link
        >
      </p>
      <div class="box-like">
        <i class="icon icon-like"></i>
        <strong class="like-num">{{ toot.stat.favourites_count }}</strong>
      </div>
      <div
        v-if="toot.media_attachments && toot.media_attachments.length"
        class="box-img"
      >
        <img
          v-if="toot.media_attachments[0].type === 'image'"
          :class="toot.media_attachments[0].sensitive ? 'sensitive' : ''"
          :src="toot.media_attachments[0].preview_url"
          alt=""
        />
        <video
          v-else-if="toot.media_attachments[0].type === 'video'"
          :class="toot.media_attachments[0].sensitive ? 'sensitive' : ''"
          :src="toot.media_attachments[0].url"
          controls
        ></video>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ components: {} })
export default class TootCard extends Vue {
  @Prop() private toot: any;
  private height: number = 0;
  private tag: string[] = [];
  tempToot: any;

  mounted() {
    this.matchHeight();
    this.contentsParser();
  }

  @Watch("toot")
  contentsParser() {
    for (let i = 1; i < this.toot.text.split("#").length; i++) {
      if (this.toot.text.split("#")[i] !== "")
        if (this.toot.text.split("#")[i].includes(" ")) {
          this.tag.push(this.toot.text.split("#")[i].split(" ")[0]);
        } else {
          this.tag.push(this.toot.text.split("#")[i]);
        }
    }
  }

  matchHeight() {
    if (this.$refs.txtBox !== undefined) {
      //@ts-ignore
      this.height = this.$refs.txtBox.clientHeight;
    }
  }
}
</script>

<style lang="scss">
.box-img {
  img {
    //object-fit: cover;
    //max-height: 200px;
  }
  video {
    width: 100%;
  }
}

.mention.hashtag {
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.3px;
  color: #788087;
}
.btn-txt.content {
  text-align: left !important;
  width: 100%;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.txt.more {
  font-size: 12px;
  text-align: right;
  color: #838d97;
}
.txt.more:hover {
  cursor: pointer;
}
.tag {
  font-size: 12px;
  color: #838d97;
}
@media (min-width: 1024px) {
  .hash-lists {
    margin-top: 6px;
  }
}

@media (min-width: 320px) and (max-width: 1023px) {
  .hash-lists {
    margin-top: 8px;
  }
}
</style>
