<template>
    <div id="app" class="no-drag">
        <!-- <router-view v-if="isInit" :currentUser="currentUser" /> -->
        <router-view/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";

@Component({
    components: {},
})
export default class App extends Vue {
    private token = localStorage.getItem("token");
  

    async mounted() {
        // if(this.token !== null){
        //     this.token = this.token.substr(1).slice(0,-1)
        //     await this.$store.dispatch("userStatus", this.token).
        //     then()
        //     console.log("async-await", this.$store.dispatch("userStatus", this.token).then(()=>{
        //         this.$store.getters.currentUser
        //     })            
        // }
    }

    // async init() {
        //     const categories = await this.$api.getCategory();
    //     this.$store.commit("categories", categories);
    //     this.isInit = true;
    // }

    // async updateCurrentUser(token: string) {
    //     try {            
    //         console.log("app mount")
    //         await this.$store.dispatch("userStatus", token);
    //     } catch (err) {
    //         console.log("Failed to fetch current user");
    //     }
    // }
    // created() {
    //     if (this.loggedIn && !this.currentUser) {
    //         this.updateCurrentUser();
    //     }
    // }
}
</script>
<style>
@import "./assets/css/common.css";
#app {
    height: 100%;
}

.no-drag {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>
