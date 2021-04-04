<template>
  <div id="app">
    <div>
      <div id="wrap">
        <Header @logout="logOut" :sendCategory="category" />

        <section id="container">
          <router-view
            @category="category"
            :currentUser="currentUser"
          ></router-view>
        </section>
      </div>
      <MobileAlbum />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";
import config from "@/lib/config";

import Header from "@/components/layouts/Header.vue";
import MobileAlbum from "@/components/layouts/MobileAlbum.vue";

@Component({
  components: { Header, MobileAlbum },
})
export default class App extends Vue {
  @Prop() currentUser!: any;
  // private loggingOut: boolean = false;
  private loggedIn: boolean = localStorage.getItem("token") != null;
  // private currentUser: any = {};
  private sendCategory: string = "";

  category(val: any) {
    this.sendCategory = val;
  }
  async mounted() {
    initApp();
    console.log("=========", this.category);
    // this.updateCurrentUser();
  }
  // async updateCurrentUser() {
  //   if (this.loggedIn === true) {
  //     try {
  //       //@ts-ignore
  //       const response = await this.$http.get(
  //         config.instance + "/api/v1/accounts/verify_credentials",
  //         {
  //           headers: { Authorization: "Bearer " + config.token },
  //         }
  //       );
  //       this.currentUser = response.data;
  //       console.log("111", this.currentUser);
  //     } catch (err) {
  //       console.log("Failed to fetch current user");
  //     }
  //   }
  // }
  logOut() {
    this.loggedIn = false;
    this.currentUser = {};
    this.$router.push("/login");
  }
  created() {
    //@ts-ignore
    if (this.loggedIn && !this.currentUser) {
      //@ts-ignore
      // this.updateCurrentUser();
    }
  }
}
</script>
<style>
@import "../assets/css/common.css";
#app {
  height: 100%;
}
</style>
