<template>
    <div>
        <div>Test</div>
        <button
            style="color: black; background-color: #fff"
            @click="sendMessage"
        >
            send Message
        </button>
        <iframe
            class="iframe"
            ref="iframe"
            src="https://apptoot.wbcard.org/mastodon/web/statuses/new"
        ></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({ components: {} })
export default class Test extends Vue {
    private imgList: string[] = [];

    sendMessage() {
        this.imgList = [
            "https://toot.wbcard.org/system/media_attachments/files/106/170/682/630/342/728/original/e008ba855158feb3.png",
            "https://toot.wbcard.org/system/media_attachments/files/106/170/682/630/342/728/original/e008ba855158feb3.png",
        ];
        //@ts-ignore
        this.$refs.iframe.contentWindow.postMessage(
            {
                type: "shareImg",
                //@ts-ignore
                images: this.imgList,
            },
            "*"
        );
    }
}
</script>
<style scoped lang="scss">
#wrap {
    overflow-y: hidden !important;
}
.iframe {
    border: 0;
    width: 100%;
    height: calc(100vh - 46px);

    @media (min-width: 320px) and (max-width: 1023px) {
        height: calc(100vh - 89px);
    }
}
</style>