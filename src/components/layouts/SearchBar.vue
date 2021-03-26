<template>
    <div class="sec-search">
        <div class="box-layer">
            <div class="box-search-form">
                <TootDropdown />
                <TootSearch />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TootDropdown from "./toot/TootDropdown.vue";
import TootSearch from "./toot/TootSearch.vue";
import {dim, getDevice, gnb, hashDropDown, search, tootDropDown} from "@/scripts/ui_common";

@Component({ components: { TootDropdown, TootSearch } })
export default class SearchBar extends Vue {
}
</script>

<style>
</style>