<template>
    <div id="app">
        <div>
            <div id="wrap">
                <Header />
                <section id="container">
                    <router-view></router-view>
                </section>
            </div>
            <MobileAlbum />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { initApp } from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";
import MobileAlbum from "@/components/layouts/MobileAlbum.vue";

@Component({
    components: { Header, MobileAlbum },
})
export default class App extends Vue {   

    async mounted() {
        initApp();
    }
}
</script>
<style>
@import "../assets/css/common.css";
#app {
    height: 100%;
}
</style>
