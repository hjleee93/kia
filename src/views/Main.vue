<template>
    <div id="app">
        <div>
            <div id="wrap">
                <Header />
                <section id="container">
                    <router-view></router-view>
                </section>
            </div>
            <AlbumShow :key="$store.getters.currCategory" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";
import AlbumShow from "@/components/layouts/AlbumShow.vue";
import Image from "@/scripts/image";

@Component({
    components: { Header, AlbumShow },
})
export default class App extends Vue {
    private key: any = "";
    async mounted() {
        initApp();
        window.addEventListener("message", this.onMessage);
        
    }
    //share
    onMessage(e: MessageEvent) {
        const data = e.data || {};
        const type = data.type;
        const imgList = e.data.images;
        const imgFile = e.data.files;

        if (type === "shareImg") {
            this.$store.commit("sharedImg", imgList);
            this.$router.push("/mastodon/web/statuses/new");
            Image.getImgArr("https://toot.wbcard.org/system/media_attachments/files/106/187/593/299/168/169/small/2007d8ab2e19fe38.png, https://toot.wbcard.org/system/media_attachments/files/106/187/590/638/047/674/small/827b2b089b3994a2.png")
        } else if (type === "responseImage") {
            this.$store.commit("sharedImgFile", imgFile);
            this.$router.push("/mastodon/web/statuses/new");
        }
    }

    beforeDestroy() {
        window.removeEventListener("message", this.onMessage);
    }
}
</script>
<style>
@import "../assets/css/common.css";
#app {
    height: 100%;
}
</style>
