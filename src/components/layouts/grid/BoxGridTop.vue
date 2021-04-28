<template>
    <div class="box-grid-top">
        <div class="floated left">
            <p class="txt">총 {{ $store.getters.tootCnt }}개의 톳</p>
        </div>
        <div class="floated right">
            <ul class="sort-lists">
                <li>
                    <button
                        class="btn btn-sort"
                        @click="tootStatus('recent')"
                        :class="{ active: isActive('recent') }"
                    >
                        <span>최신순</span>
                    </button>
                </li>
                <li>
                    <button
                        class="btn btn-sort"
                        @click="tootStatus('popular')"
                        :class="{ active: isActive('popular') }"
                    >
                        <span>인기순</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ components: {} })
export default class BoxGridTop extends Vue {
    private active: string = "recent";

    tootStatus(value: string) {
        this.active = value;
        this.$store.commit("sortOrder", value);
    }

    isActive(value: string) {
        return this.active === value;
    }
}
</script>

<style></style>
