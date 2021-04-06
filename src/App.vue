<template>
  <div id="app" class="no-drag">
    <router-view v-if="isInit" :currentUser="currentUser" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";

@Component({
  components: {},
})
export default class App extends Vue {
  private loggedIn: boolean = localStorage.getItem("token") != null;
  private currentUser: any = {};
  private isInit : boolean = false;

  async mounted() {
    initApp();
    await this.updateCurrentUser();
    await this.init();
  }

  async init() {
    const categories = await this.$api.getCategory();
    this.$store.commit("categories", categories);
    this.isInit = true;
  }

  async updateCurrentUser() {
    if (this.loggedIn === true) {
      try {
        const result = await this.$api.getCurrentUser();
        this.currentUser = result.data;
      } catch (err) {
        console.log("Failed to fetch current user");
      }
    }
  }
  created() {
    if (this.loggedIn && !this.currentUser) {
      this.updateCurrentUser();
    }
  }
}
</script>
<style>
@import "./assets/css/common.css";
#app {
  height: 100%;
}


.no-drag {-ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;}
</style>
