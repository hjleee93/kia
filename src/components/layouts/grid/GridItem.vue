<template>
    <div class="grid-item">
        <template v-if="toot.media_attachments !== undefined">
            <template v-if="toot.media_attachments[0] !== undefined">
                <a href="#" class="btn btn-link">
                    <router-link :to="'/mastodon/web/statuses/' + toot.id">
                        <div class="box-img">
                            <template
                                v-if="
                                    toot.media_attachments[0].type === 'video'
                                "
                            >
                                <i class="icon icon-play"></i>
                            </template>
                            <template v-else>
                                <img
                                    :src="toot.media_attachments[0].preview_url"
                                    alt=""
                                    style="width: 100%"
                                />
                            </template>
                        </div>
                    </router-link>
                    <div class="box-cont">
                        <router-link :to="'/mastodon/web/statuses/' + toot.id">
                        <template v-if="toot.content.length > 65">
                            <p class="txt content" v-html="toot.content"></p>
                            <p class="txt more"><span>더보기</span></p>
                        </template>
                        <template v-else>
                          <p class="txt " v-html="toot.content"></p>
                        </template>
                    
                            </router-link>
                        <router-link
                            :to="'/mastodon/web/accounts/' + toot.account.id"
                        >
                            <span class="nic-name">{{
                                toot.account.username
                            }}</span>
                        </router-link>
                    </div>
                </a>
                <!--비활성-->
                <Like :toot="toot" />
                <!--활성화-->
                <!--<button class="btn btn-like active"></button>-->
                <!--활성화 모션-->
                <!--<button class="btn btn-like active motion"></button>-->
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import config from "@/lib/config";
import { Component, Prop, Vue } from "vue-property-decorator";
import Like from "./Like.vue";

@Component({ components: { Like } })
export default class GridItem extends Vue {
    @Prop() toot!: any;

    goUserDetail(userId: number) {
        window.location.href = `${config.instance}/web/accounts/${userId}`;
    }
}
</script>

<style scope>
.grid-item.hidden {
    display: none !important;
}
.txt.content {
text-align: left !important;
    width: 100%;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.txt.more{
  float: right;
}
</style>
