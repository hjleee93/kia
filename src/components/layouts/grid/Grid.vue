<template>
    <div class="sec-grid">
        <!--검색 결과가 없는경우-->
        <template v-if="allToots === null || allToots.length === 0">
            <div class="no-data">
                <p class="txt">검색 결과가 없습니다.</p>
            </div>
        </template>
        <!--        <div class="grid">-->
        <!--            <GridItem-->
        <!--                v-for="toot in tootList.slice(start, end)"-->
        <!--                :toot="toot"-->
        <!--                :key="toot.id"-->
        <!--            />-->
        <!--        </div>-->
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
                <GridItem
                    v-for="(toot, index) in allToots"
                    :toot="toot"
                    :key="index"
                />
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
                <GridItem
                    v-for="(toot, index) in allToots"
                    :toot="toot"
                    :key="index"
                />
            </isotope>
        </template>
        <!-- <button style="color: white" @click="moreItem">더보기</button> -->
    </div>
</template>

<script lang="ts">
// import { isotope } from "@/scripts/ui_common";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import GridItem from "./GridItem.vue";

//@ts-ignore
import isotope from "vueisotope";
import { getDevice } from "@/scripts/ui_common";
import config from "@/lib/config";

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
    // // api
    private allToots: any[] = [];
    private foundUser: any[] = [];

    @Watch("device")
    changeDevice() {
        setTimeout(() => {
            //@ts-ignore
            this.$refs.isotope.layout();
        }, 100);
    }
    @Watch("tagSearch")
    changeTag() {
        this.allToots = this.tagSearch;
    }
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
            }, 100);
        });
        //  setTimeout(() => {
        //     //@ts-ignore
        //     this.$refs.isotope.layout();
        // }, 100);
        // this.$nextTick(()=>{
        //      this.$nextTick(()=>{
        //          this.$nextTick(()=>{
        //              console.log(this.allToots.length)

        //         //@ts-ignore
        //         this.$refs.isotope.layout();
        //          });

        //      });
        // });
    }

    mounted() {
        // this.changeResult();
        // this.getGridItem(10);
        // console.log(this.changeResult);
        // this.$watch(
        //   "result",
        //   (result) => {
        //     if (result.length > 0) {
        //       this.tootList = result;
        //     }
        //     console.log("?", result);
        //   },
        //   { immediate: true }
        // );

        // isotope.init();

        this.device = getDevice();
        // console.log(this.device)
        // setTimeout(() => {
        //     //@ts-ignore
        //     this.$refs.isotope.layout();
        // }, 1000);
        // window.addEventListener("resize", this.onResize, false)
        window.onresize = this.onResize;
    }

    beforeDestroy() {
        window.removeEventListener("onresize", this.onResize, false);
    }

    moreItem() {
        this.end += 20;
        // isotope.init();
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

    @Watch("$store.getters.searchResult")
    searchResult() {
        this.allToots = this.$store.getters.searchResult;
        console.log(this.allToots)
    }
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
