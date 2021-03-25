<template>
    <div id="wrap">
        <Header />
        <section id="container">            
            <router-view></router-view>
        </section>        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/layouts/Header.vue";

@Component({
    components: { Header },
})
export default class Main extends Vue {}
</script>
