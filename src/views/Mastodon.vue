<template>
  <div id="wrap">
    <Header></Header>

    <iframe class="iframe" ref="iframe" :src="`${baseURL}${path}`"> </iframe>
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

  mounted() {
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
    if (type === "loadedPage") {
      const url = new URL(data.url);

      switch (url.pathname) {
        case "/about":
          this.$router.push("/").catch(() => {});
        case "/auth/sign_in":
          localStorage.removeItem("token");
          this.$router.push("/login").catch(() => {});
      }
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
dasxc
