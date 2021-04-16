<template>
    <div id="app">
        <div>
            <div id="wrap">
                <Header @logout="logOut" />
                <section id="container">
                    <router-view ></router-view>
                </section>
            </div>
            <MobileAlbum />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";
import MobileAlbum from "@/components/layouts/MobileAlbum.vue";

@Component({
    components: { Header, MobileAlbum },
})
export default class App extends Vue {
    private loggedIn: boolean = localStorage.getItem("token") != null;
    
    async mounted() {
       
        initApp();
    }
    logOut() {
        
        this.loggedIn = false;
        this.$router.push("/login").catch(() => {});
    }
}
</script>
<style>
@import "../assets/css/common.css";
#app {
    height: 100%;
}
</style>
