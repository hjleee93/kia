<template>
    <div id="app" class="no-drag">
        <!-- <router-view v-if="isInit" :currentUser="currentUser" /> -->
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import config from "./lib/config";

@Component({
    components: {},
})
export default class App extends Vue {

    async mounted() {
        // const result = await this.$api.getCurrentUser(config.token);
        this.$store.dispatch("userStatus", config.token);
    }
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
