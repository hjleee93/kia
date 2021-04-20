<template>
    <iframe
        class="iframe2"
        @load="loaded()"
        ref="iframe"
        :src="`${baseURL}${src}`"
    >
    </iframe>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class LoginMas extends Vue {
    @Prop() src!: string;
    private baseURL: string = process.env.VUE_APP_BASE_API!;
    private isIframeLoaded: boolean = false;

    destroyed() {
        window.removeEventListener("message", this.iframeHandler);
    }

    loaded() {
        if ((this.$refs.iframe as HTMLIFrameElement).src !== this.baseURL) {
            window.addEventListener("message", this.iframeHandler);
        }
    }

    iframeHandler(e: MessageEvent) {
        if (e.data.url === `${this.baseURL}about`) {
            window.location.href = "/";
        }
    }
}
</script>

<style scoped>
.iframe2 {
    height: 100%;
    width: 100%;
    position: relative;
    display: block;
}
</style>