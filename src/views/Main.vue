<template>
    <div>
        <div id="wrap">
            <Header @logout="logOut" />
            <section id="container">
                <router-view></router-view>
            </section>
        </div>
        <MobileAlbum />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/layouts/Header.vue";
import MobileAlbum from "@/components/layouts/MobileAlbum.vue";

@Component({
    components: { Header, MobileAlbum },
    props: ["currentUser"]
})
export default class Main extends Vue {
    mounted() {
    }

    logOut(){
        this.$emit('logout')
    }
}
</script>
