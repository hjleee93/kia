<template>
    <div id="wrap">
        <Header>
        </Header>

<!--        <iframe v-if="path" class="iframe" :src="`${'https://toot.wbcard.org/'}${path}`">-->
            <iframe v-if="path" class="iframe" :src="`${'https://famobi.com/?locale=en'}`">
        </iframe>


    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {gnb, initApp} from "@/scripts/ui_common";
import Header from "@/components/layouts/Header.vue";

@Component({
    components: { Header },
})
export default class App extends Vue {
    private baseURL:string = process.env.VUE_APP_BASE_API;
    private path : string = '';

    mounted() {
        initApp();
        gnb.init();

        console.log(this.$router);
        const { params } = this.$route;
        const {pathMatch} = params;
        console.log( pathMatch );
        this.path = pathMatch;
    }

}
</script>
<style scoped lang="scss">
    .iframe {
        border: 0;
        width: 100%;
        height: calc( 100vh - 46px);

        @media (min-width: 320px) and (max-width: 1023px) {
            height: calc( 100vh - 89px);
        }
    }
</style>
