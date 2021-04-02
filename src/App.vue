<template>
    <div id="app">
        <router-view :currentUser="currentUser" @logout="logOut" />
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";
import config from "@/lib/config";

@Component({
    components: {},
})
export default class App extends Vue {
    // private loggingOut: boolean = false;
    private loggedIn: boolean = localStorage.getItem("token") != null;
    private currentUser: any = {};

    mounted() {
        initApp();
        this.updateCurrentUser();
    }
    async updateCurrentUser() {
        if (this.loggedIn === true) {
            try {
                //@ts-ignore
                const response = await this.$http.get(
                    config.instance + "/api/v1/accounts/verify_credentials",
                    {
                        headers: { Authorization: "Bearer " + config.token },
                    }
                );

                this.currentUser = response.data;
            } catch (err) {
                console.log("Failed to fetch current user");
            }
        }
    }
    logOut() {
        this.loggedIn = false;
        this.currentUser = {};
        this.$router.push("/login");
    }
    created() {
        //@ts-ignore
        if (this.loggedIn && !this.currentUser) {
            //@ts-ignore
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
</style>