<template>
  <toot-search/>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import TootSearch from "../layouts/TootSearch.vue"

@Component({ components: { TootSearch } })
export default class Hive extends Vue {

}
</script>

<style>

</style>