<template>
    <div id="wrap">
        <Header>
        </Header>

        <iframe class="iframe" ref="iframe" :src="`${baseURL}${path}`">
        </iframe>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {gnb, initApp} from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";

@Component({
    components: {Header},
})
export default class App extends Vue {
    private baseURL: string = process.env.VUE_APP_BASE_API!;
    private path: string = '';

    mounted() {
        initApp();
        //gnb.init();

        const {params} = this.$route;
        const {pathMatch} = params;
        this.path = pathMatch;

        window.addEventListener('message', this.onMessage);
    }

    beforeDestroy() {
        window.addEventListener('message', this.onMessage);
    }

    onMessage(e : MessageEvent) {
        const data = e.data || {};
        const type = data.type;
        if (type === 'loadedPage') {
            const url = new URL(data.url);
            if (url.pathname === '/auth/sign_in') {
                //로그아웃
                localStorage.removeItem("token");
                this.$router.push("/login").catch(() => {});
            }
        }
    }

}
</script>
<style scoped lang="scss">
.iframe {
    border: 0;
    width: 100%;
    height: calc(100vh - 46px);

    @media (min-width: 320px) and (max-width: 1023px) {
        height: calc(100vh - 89px);
    }
}
</style>
