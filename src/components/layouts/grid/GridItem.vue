<template>
    <div class="grid-item" >
        <template v-if="mediaToot.media_attachments !== undefined">
            <template v-if="mediaToot.media_attachments[0] !== undefined">
                <a href="#" class="btn btn-link">
                    <router-link :to="'/mastodon/web/statuses/' + mediaToot.id">
                        <div class="box-img">
                            <template
                                v-if="
                                    mediaToot.media_attachments[0].type === 'video'
                                "
                            >
                                <i class="icon icon-play"></i>
                                <img
                                    :class="mediaToot.sensitive ? 'sensitive' : ''"
                                    :src="mediaToot.media_attachments[0].preview_url"
                                    alt=""
                                    style="width: 100%"
                                />
                            </template>
                            <template v-else>
                                <img
                                    :class="mediaToot.sensitive ? 'sensitive' : ''"
                                    :src="mediaToot.media_attachments[0].preview_url"
                                    alt=""
                                    style="width: 100%"
                                />
                            </template>
                        </div>
                    </router-link>
                    <div class="box-cont">
                        <template v-if="height > 38">
                            <p
                                ref="txtBox"
                                class="txt content"
                                v-html="tootContent"
                            ></p>

                            <router-link
                                :to="'/mastodon/web/statuses/' + mediaToot.id"
                            >
                                <p class="txt more">
                                    <span>더보기</span>
                                </p>
                            </router-link>
                        </template>
                        <template v-else>
                            <p
                                class="txt content"
                                ref="txtBox"
                                v-html="tootContent"
                            ></p>
                        </template>

                        <router-link
                            :to="'/mastodon/web/accounts/' + mediaToot.account.id"
                        >
                            <span class="nic-name">{{
                                mediaToot.account.username
                            }}</span>
                        </router-link>
                    </div>
                </a>
                <!--비활성-->
                <Like :toot="mediaToot" />
                <!--활성화-->
                <!--<button class="btn btn-like active"></button>-->
                <!--활성화 모션-->
                <!--<button class="btn btn-like active motion"></button>-->
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Like from "./Like.vue";

@Component({ components: { Like } })
export default class GridItem extends Vue {
    @Prop() toot!: any;
    private mediaToot = this.toot;
    private tootContent: string = "";
    private height: number = 0;
    private baseURL: string = process.env.VUE_APP_BASE_API!;

    mounted() {
       
        if (this.mediaToot.content !== undefined) {
            this.tootContent = this.mediaToot.content.replaceAll(
                `${this.baseURL}`,
                "#/mastodon/"
            );
        }
        this.matchHeight();
    }

    @Watch('toot')
    watchResult(){
      this.mediaToot = this.toot
      if (this.mediaToot.content !== undefined) {
            this.tootContent = this.mediaToot.content.replaceAll(
                `${this.baseURL}`,
                "#/mastodon/"
            );
        }
        this.matchHeight();
    }

    matchHeight() {
        this.$nextTick(() => {
            //@ts-ignore
            if (this.$refs.txtBox !== undefined) {
                //@ts-ignore
                this.height = this.$refs.txtBox.clientHeight;
            }
        });
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
.txt.more {
    float: right;
}
.sensitive {
    filter: blur(1.5em);
}
@media (min-width: 320px) and (max-width: 1023px) {
    #header + #container #content .content {
        padding-bottom: 0px;
    }
}
</style>
