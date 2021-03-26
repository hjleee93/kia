<template>
    <div id="app">
        <router-view/>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {initApp} from "@/scripts/ui_common";

@Component({
    components: {
    }
})
export default class App extends Vue{
    mounted() {
        initApp();
    }
}
</script>
<style>
@import "./assets/css/common.css";
</style>