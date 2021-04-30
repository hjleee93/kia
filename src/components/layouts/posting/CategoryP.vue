<template>
    <div class="sec-category">
        <!--검색 한경우 외-->
        <div class="box-category">
            <ul class="category-lists">
                <!--비활성화-->
                <!--<button class="btn btn-category"></button>-->
                <!--활성화-->

                <!--<button class="btn btn-category active"></button>-->
                <li class="list-all divider">
                    <button
                        @click="clickedCategory('posting')"
                        :class="{ active: isActive('posting') }"
                        class="btn btn-category"
                    >
                        <span>All</span>
                    </button>
                </li>
                <li class="list-inspiration">
                    <button
                        @click="clickedCategory('inspiration')"
                        :class="{ active: isActive('inspiration') }"
                        class="btn btn-category"
                    >
                        <span>Inspiration</span>
                    </button>
                </li>
                <li class="list-project">
                    <button
                        class="btn btn-category"
                        @click="clickedCategory('project')"
                        :class="{ active: isActive('project') }"
                    >
                        <span>Project</span>
                    </button>
                </li>
                <li class="list-exhibition divider">
                    <button
                        class="btn btn-category"
                        @click="clickedCategory('exhibition')"
                        :class="{ active: isActive('exhibition') }"
                    >
                        <span>Exhibition</span>
                    </button>
                </li>
                <li class="list-albumshow">
                    <button class="btn btn-category" @click="openAlbum">
                        <span>Albumshow</span>
                    </button>
                </li>
            </ul>
        </div>

        <Hashtag :tag="$store.getters.currCategory" @tagResult="tagResult" />
    </div>
</template>

<script lang="ts">
import Hashtag from "@/components/layouts/Hashtag.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { albumPop, dim, gnb } from "@/scripts/ui_common";

@Component({ components: { Hashtag } })
export default class CategoryP extends Vue {
    private active: string = this.$store.getters.currCategory;

    isActive(value: string) {

        return this.active === value;
    }

    tagResult(result: any) {
        this.$emit("tagResult", result);
    }

    openAlbum(): void {
        albumPop.layerOpen();
    }
    clickedCategory(category: string) {
        this.active = category;
        this.$emit('category', category)
    }

    @Watch("$store.getters.currCategory")
    getCategory() {
        this.active = this.$store.getters.currCategory;
    }
}
</script>

<style></style>
