<template>
    <div id="wrap">
        <Header></Header>

        <iframe
            id="iframeContents"
            class="iframe"
            ref="iframe"
            :src="`${baseURL}${path}`"
        >
        </iframe>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { gnb, initApp } from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";
//@ts-ignore
window.uploadBtnEvent = function () {};

@Component({
    components: { Header },
})
export default class App extends Vue {
    private baseURL: string = process.env.VUE_APP_BASE_API!;
    private path: string = "";
    private isShared: boolean = false;
    private imgList: string[] = [];

    mounted() {
        this.$store.commit("currCategory", "INS");
        initApp();
        const { params } = this.$route;
        const { pathMatch } = params;
        this.path = pathMatch;
        if (this.path === "web/statuses/new") {
            this.$store.commit("currCategory", "Toot");
        } else if (this.path === "web/timelines/public") {
            this.$store.commit("currCategory", "INS");
        }
        window.addEventListener("message", this.onMessage);
        window.uploadBtnEvent = () => {
            //@ts-ignore
            this.$refs.iframe.contentWindow.postMessage(
                {
                    type: "clickUploadButton",
                },
                "*"
            );
        };
    }

    beforeDestroy() {
        //@ts-ignore
        window.uploadBtnEvent = function () {};
        window.removeEventListener("message", this.onMessage);
        this.$store.commit("sharedImg", []);
    }

    @Watch("$route.params.pathMatch")
    watchPathMatch() {
        const { params } = this.$route;
        const { pathMatch } = params;
        this.path = pathMatch;

        if (this.path === "web/statuses/new") {
            this.$store.commit("currCategory", "Toot");
        } else if (this.path === "web/timelines/public") {
            this.$store.commit("currCategory", "INS");
        }
    }
    onMessage(e: MessageEvent) {
        console.log(e);
        const data = e.data || {};
        const type = data.type;
        if (type === "loadedPage") {
            const url = new URL(data.url);

            switch (url.pathname) {
                case "/about":
                    this.$router.push("/login").catch(() => {});
                    break;
                case "/auth/sign_in":
                    this.$store.dispatch("logout");
                    this.$router.push("/login").catch(() => {});
                    break;
            }
        } else if (type === "shareImg") {
            if (e.data.images) {
                //@ts-ignore
                this.$refs.iframe.contentWindow.postMessage(
                    {
                        type: "responseImage",
                        images: e.data.images || this.$store.getters.sharedImg,
                    },
                    "*"
                );
            }
        } else if (type === "requestImage") {
            //@ts-ignore
            this.$refs.iframe.contentWindow.postMessage(
                {
                    type: "responseImage",
                    images: this.$store.getters.sharedImgFile,
                },
                "*"
            );
        }
        if (this.$store.getters.sharedImg.length > 0) {
            if (this.isShared === false) {
                //@ts-ignore
                this.$refs.iframe.contentWindow.postMessage(
                    {
                        type: "responseImage",
                        images: this.$store.getters.sharedImg,
                    },
                    "*"
                );
                this.isShared = true;
            }
        } else if (this.$store.getters.sharedImgFile.length > 0) {
            //@ts-ignore
            this.$refs.iframe.contentWindow.postMessage(
                {
                    type: "responseImage",
                    files: [this.$store.getters.sharedImgFile],
                },
                "*"
            );
        }
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