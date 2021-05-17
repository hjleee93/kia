<template>
    <div id="wrap">
        <Header></Header>

        <iframe class="iframe" ref="iframe" :src="`${baseURL}${path}`">
        </iframe>
        <!-- <iframe class="iframe" ref="iframe" src="http://apptoot.wbcard.org/posting" ></iframe> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { gnb, initApp } from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";

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
        //gnb.init();
        const { params } = this.$route;
        const { pathMatch } = params;
        this.path = pathMatch;
        if (this.path === "web/statuses/new") {
            this.$store.commit("currCategory", "Toot");
        } else if (this.path === "web/timelines/public") {
            this.$store.commit("currCategory", "INS");
        }

        window.addEventListener("message", this.onMessage);
    }

    beforeDestroy() {
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
        const data = e.data || {};
        const type = data.type;
        this.imgList = data.imgList;

        console.log(type);

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
        } else if (type === "requestImage") {
            //@ts-ignore
            if (data.imgList) {
                console.log("here?", data.imgList);
                //@ts-ignore
                this.$refs.iframe.contentWindow.postMessage(
                    {
                        type: "responseImage",
                        //@ts-ignore
                        images: data.imgList,
                    },
                    "*"
                );
            }
            this.isShared = true;
        }

        // else if(type==="shardImg"){
        //     if (!this.isShared) {
        //         //@ts-ignore
        //         if (this.imgList) {
        //             //@ts-ignore
        //             this.$refs.iframe.contentWindow.postMessage(
        //                 {
        //                     type: "responseImage",
        //                     //@ts-ignore
        //                     images: this.imgList ,
        //                 },
        //                 "*"
        //             );
        //         }
        //         this.isShared = true;
        //         this.$router.push("/mastodon/web/statuses/new");
        //     }
        // }
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