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
          <!--  @click="[(active = 'Hive'), $router.push('/hive')]" -->
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
            @click="[(active = 'Project'), $router.push('/project')]"
            :class="{ active: isActive('Project') }"
          >
            <span>Project</span>
          </button>
        </li>
        <li class="list-exhibition divider">
          <button
            class="btn btn-category"
            @click="[(active = 'Exhibition'), $router.push('/exhibition')]"
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
    <Hashtag :tag="category" />
  </div>
</template>

<script lang="ts">
import Hashtag from "@/components/layouts/Hashtag.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { albumPop, dim, gnb, isDesktop, search } from "@/scripts/ui_common";

@Component({ components: { Hashtag } })
export default class Category extends Vue {
  @Prop() category!: string;
  private active: string = this.category;

  isActive(value: string) {
    return this.active === value;
  }

  mounted() {
    gnb.init();
    search.init();
    dim.init();
  }

  openAlbum(): void {
    albumPop.layerOpen();
  }
  clickedCategory(category: string) {
    this.active = category;
    this.$router.push("/" + category.toLowerCase());
  }
}
</script>

<style></style>
