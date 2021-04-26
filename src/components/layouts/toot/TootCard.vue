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
            ><strong class="username">
              {{ toot.account.acct }}
            </strong>
          </router-link>
          <span class="date"
            >{{ toot.created_at.split("-")[1] }}월
            {{ toot.created_at.split("-")[2].substring(0, 2) }}일</span
          >
        </div>
      </div>
      <div class="box-content">
        <template v-if="height > 59">
          <p ref="txtBox" class="btn btn-txt content" v-html="tootContent"></p>

          <p class="txt more">
            <router-link :to="'/mastodon/web/statuses/' + toot.id">
              <span class="txt more">더보기</span></router-link
            >
          </p>
        </template>
        <template v-else>
          <a ref="txtBox" class="btn btn-txt content" v-html="tootContent"> </a>
        </template>
      </div>
      <p class="hash-lists">
        <router-link
          v-for="idx in this.tag"
          :key="idx.id"
          :to="`mastodon/tags/${idx}`"
        >
          <template v-if="idx.length !== 0">
            <span class="tag">#{{ idx }}</span>
          </template>
        </router-link>
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
          :class="toot.sensitive ? 'sensitive' : ''"
          :src="toot.media_attachments[0].preview_url"
          alt=""
        />
        <video
          v-else-if="toot.media_attachments[0].type === 'video'"
          :class="toot.sensitive ? 'sensitive' : ''"
          :src="toot.media_attachments[0].url"
          controls
        ></video>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

function parseTags( text : string ) {
    const regexp = /(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/;
    const arr = [];
    let ma = text.match( regexp ) as RegExpMatchArray;
    while (ma) {
        text = text.substr( (ma.index||0) + ma[0].length + 1 );
        const tag = ma[0].replace('#', '');
        if( tag !== '' ) {
            arr.push( tag );
        }
        ma = text.match( regexp ) as RegExpMatchArray;
    }
    return arr;
}

@Component({ components: {} })
export default class TootCard extends Vue {
  @Prop() private toot: any;
  private height: number = 0;
  private tag: string[] = [];
  private mention: string[] = [];
  private tootContent: string = "";

  mounted() {
    this.matchHeight();
    this.contentsParser();
    //태그
    if (this.tag.length > 0) {
      if (this.tag.length === 1) {
        this.tootContent = this.toot.text.replace(
          "#" + this.tag[0],
          `<a href='#/mastodon/tags/${this.tag[0]}' class="mention hashtag">#${this.tag[0]}</a>`
        );
      } else {
        this.tootContent = this.toot.text.replace(
          "#" + this.tag[0],
          `<a href='#/mastodon/tags/${this.tag[0]}' class="mention hashtag">#${this.tag[0]}</a>`
        );
        for (let i = 1; i < this.tag.length; i++) {
          this.tootContent = this.tootContent.replace(
            "#" + this.tag[i],
            `<a href='#/mastodon/tags/${this.tag[i]}' class="mention hashtag">#${this.tag[i]}</a>`
          );
        }
      }
    } else {
      this.tootContent = this.toot.text;
    }

    //멘션
    if (this.mention.length > 0) {
      this.tootContent = this.tootContent.replace(
        this.mention[0],
        `<a href='#/mastodon/web/accounts/${this.mention[0]}' class="mention hashtag">${this.mention[0]}</a>`
      );

      for (let i = 1; i < this.tag.length; i++) {
        this.tootContent = this.tootContent.replace(
          this.mention[i],
          `<a href='#/mastodon/web/accounts/${this.mention[i]}' class="mention hashtag">${this.mention[i]}</a>`
        );
      }
    }
  }
  @Watch("toot")
  contentsParser() {
    //tag
    for (let j = 0; j < this.toot.text.split(/\s/g).length; j++) {
      let temp = this.toot.text.split(/\s/g);

      if (temp[j].includes("#")) {
        for (let i = 0; i < temp[j].split(/(?=[.#])/).length; i++) {
          if (temp[j].split(/(?=[.#])/)[i].length !== 1) {
            if (temp[j].split(/(?=[.#])/)[i].substr(0, 1) === "#") {
              this.tag.push(
                temp[j]
                  .split(/(?=[.#])/)
                  [i].substr(1, temp[j].split(/(?=[.#])/)[i].length)
              );
              i = temp[j].split(/(?=[.#])/).length;
            }
          }
        }
      }
    }
    //mention
    for (let i = 1; i < this.toot.text.split("@").length; i++) {
      if (this.toot.text.split("@")[i] !== "")
        if (this.toot.text.split("@")[i].includes(" ")) {
          this.mention.push(this.toot.text.split("@")[i].split(" ")[0]);
        } else {
          this.mention.push(this.toot.text.split("@")[i]);
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

.sensitive {
  filter: blur(1.5em);
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
  color: #fff;
}
.txt.more:hover {
  cursor: pointer;
}
.tag {
  font-size: 12px;
  color: #fff;
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

