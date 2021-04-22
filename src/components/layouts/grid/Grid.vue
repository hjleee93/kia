<template>
  <div class="sec-grid">
    <!--검색 결과가 없는경우-->
    <template v-if="allToots === null || allToots.length === 0">
      <div class="no-data">
        <p class="txt">검색 결과가 없습니다.</p>
      </div>
    </template>

    <template v-if="allToots !== null">
      <isotope
        v-if="device === 'pc'"
        :key="device"
        ref="isotope"
        class="grid"
        tabindex="11"
        :options="optionPc()"
        :list="allToots"
      >
        <GridItem v-for="(toot, index) in allToots" :toot="toot" :key="index" />
      </isotope>
      <isotope
        v-else-if="device === 'mo'"
        :key="device"
        ref="isotope"
        class="grid"
        tabindex="100"
        :options="optionsMo()"
        :list="allToots"
      >
        <GridItem v-for="(toot, index) in allToots" :toot="toot" :key="index" />
      </isotope>
    </template>
  </div>
</template>

<script lang="ts">
// import { isotope } from "@/scripts/ui_common";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import GridItem from "./GridItem.vue";

//@ts-ignore
import isotope from "vueisotope";
import { getDevice } from "@/scripts/ui_common";

@Component({ components: { GridItem, isotope } })
export default class Grid extends Vue {
  @Prop() result!: any;
  @Prop() tagSearch!: any;
  @Prop() allResult!: any;

  private end = 20;
  private start = 0;
  private active: boolean = false;
  private idx: number = 20;
  private device: string = "";
  // api
  private allToots: any[] = [];
  private foundUser: any[] = [];

  @Watch("device")
  changeDevice() {
    setTimeout(() => {
      //@ts-ignore
      this.$refs.isotope.layout();
    }, 100);
  }
  // @Watch("tagSearch")
  // changeTag() {
  //     this.allToots = this.tagSearch;
  // }

  @Watch("allResult")
  changeResult() {
    this.allToots = this.allResult;

    //@ts-ignore
    imagesLoaded(document.querySelector(".grid"), () => {
      setTimeout(() => {
        if (this.$refs.isotope !== undefined) {
          //@ts-ignore
          this.$refs.isotope.layout();
        }
      }, 1000);
    });
  }

  mounted() {
    this.device = getDevice();
    window.onresize = this.onResize;
  }

  beforeDestroy() {
    window.removeEventListener("onresize", this.onResize, false);
  }

  onResize() {
    this.device = getDevice();
    setTimeout(() => {
      if (this.$refs.isotope !== undefined) {
        //@ts-ignore
        this.$refs.isotope.layout();
      }
    }, 500);
  }

  optionPc() {
    return {
      masonry: {
        columnWidth: ".grid-item",
        itemSelector: ".grid-item",
        fitWidth: true,
      },

      horizontal: true,
      horizontalOrder: true,
      // transitionDuration: 0,
    };
  }

  optionsMo() {
    return {
      masonry: {
        columnWidth: ".grid-item",
        itemSelector: ".grid-item",
      },
    };
  }

  // @Watch("$store.getters.searchResult")
  // searchResult() {
  //     this.init();
  //     this.allToots = this.$store.getters.searchResult;
  //     console.log('finalS')
  // }
  // init() {
  //     this.allToots = [];
  // }
}
</script>

<style scoped>
/* .grid-item {
  margin-bottom: 10px;
} */

.grid-item {
  margin-bottom: 50px;
}
</style>
