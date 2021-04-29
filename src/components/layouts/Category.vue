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
                        @click="clickedCategory('Hive')"
                        :class="{ active: isActive('Hive') }"
                        class="btn btn-category"
                    >
                        <span>All</span>
                    </button>
                </li>
                <li class="list-inspiration">
                    <button
                        @click="clickedCategory('Inspiration')"
                        :class="{ active: isActive('Inspiration') }"
                        class="btn btn-category"
                    >
                        <span>Inspiration</span>
                    </button>
                </li>
                <li class="list-project">
                    <button
                        class="btn btn-category"
                        @click="clickedCategory('Project')"
                        :class="{ active: isActive('Project') }"
                    >
                        <span>Project</span>
                    </button>
                </li>
                <li class="list-exhibition divider">
                    <button
                        class="btn btn-category"
                        @click="clickedCategory('exhibition')"
                        :class="{ active: isActive('Exhibition') }"
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
        
        <template v-if="$store.getters.currCategory !== 'Hive'">
            <Hashtag
                :tag="$store.getters.currCategory"
            />
        </template>
    </div>
</template>

<script lang="ts">
import Hashtag from "@/components/layouts/Hashtag.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { albumPop, dim, gnb } from "@/scripts/ui_common";

@Component({ components: { Hashtag } })
export default class Category extends Vue {
    private active: string = this.$store.getters.currCategory;

    isActive(value: string) {
        return this.active === value;
    }

    

    openAlbum(): void {
        albumPop.layerOpen();
        let elem = document.documentElement;
        //@ts-ignore
        if (elem.requestFullscreen) {
            //@ts-ignore
            elem.requestFullscreen();
            //@ts-ignore
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            //@ts-ignore
            elem.mozRequestFullScreen();
            //@ts-ignore
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            //@ts-ignore
            elem.webkitRequestFullscreen();
            //@ts-ignore
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem = window.top.document.body; //To break out of frame in IE
            //@ts-ignore
            elem.msRequestFullscreen();
        }
    }
    clickedCategory(category: string) {
        this.active = category;
        this.$store.commit('currCategory', category)
        this.$router.push("/" + category.toLowerCase()).catch(() => {});
    }

    @Watch("$store.getters.currCategory")
    getCategory() {
        this.active = this.$store.getters.currCategory;
    }
}
</script>

<style></style>
