<template>
    <div :key="toot.id">
        <div class="list">
            <div class="box-user-info">
                <a href="#none" class="btn btn-user">
                    <i class="icon icon-user">
                        <!-- <img
                        :src="toot.account.avatar"
                        alt=""
                    /> -->
                    </i>
                </a>
                <div class="box-txt">
                    <strong class="username"> 유저이름 </strong>
                    <span class="date"
                        >{{ toot.created_at.split("-")[1] }}월
                        {{
                            toot.created_at.split("-")[2].substring(0, 2)
                        }}일</span
                    >
                </div>
            </div>
            <div class="box-content">
                <template v-if="height > 59">
                    <p
                        ref="txtBox"
                        class="btn btn-txt content"
                        v-html="toot.text"
                    ></p>

                    <p >
                        <router-link :to="'/mastodon/web/statuses/' + toot.id" >
                            <span class="txt more">더보기</span></router-link
                        >
                    </p>
                </template>
                <template v-else>
                    <a
                        ref="txtBox"
                        href="#none"
                        class="btn btn-txt content"
                        v-html="toot.text"
                    >
                    </a>
                </template>
                <!--        <p class="hash-lists">-->
                <!--          <a v-for="tag in toot.tags" href="#none" class="btn btn-hash" :key="tag.id">-->
                <!--            #{{tag.name}}-->
                <!--          </a>-->
                <!--        </p>-->
            </div>
            <router-link
                v-for="i in this.tag"
                :key="i"
                :to="`mastodon/tags/${i}`"
                ><span class="tag">#{{ i }} </span></router-link
            >
            <div class="box-like">
                <i class="icon icon-like"></i>
                <strong class="like-num">{{
                    toot.stat.favourites_count
                }}</strong>
            </div>
            <!-- <div v-if="toot.media_attachments && toot.media_attachments.length" class="box-img">
                <img
                    v-if="toot.media_attachments[0].type === 'image'"
                    :src="toot.media_attachments[0].preview_url"
                    alt=""
                />
                <video v-else-if="toot.media_attachments[0].type === 'video'"
                       :src="toot.media_attachments[0].url"
                       controls
                >

                </video>
            </div> -->
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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

    mounted() {
        this.matchHeight();
        // this.parsingTag();
        this.tag = parseTags( this.toot.text );
        console.log( this.tag );
    }

    parsingTag() {
        // console.log("text", this.toot.text);

        for (let i = 1; i < this.toot.text.split("#").length; i++) {
            if (this.toot.text.split("#")[i] !== "")
                this.tag.push(this.toot.text.split("#")[i]);
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
    color: #838d97;
}
.tag {
    font-size: 12px;
    color: #838d97;
}
</style>
