<template>
    <div class="sec-grid">
        <!--검색 결과가 없는경우-->
        <template v-if="allToots.length === 0 || allToots === undefined">
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
        <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
            <div
                slot="no-more"
                style="
                    color: rgb(102, 102, 102);
                    font-size: 14px;
                    padding: 10px 0px;
                "
            >
                목록의 끝입니다 :)
            </div>
        </infinite-loading> -->
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

    // private base = config.instance + "/api/v1";
    // private apiBase = this.base + "/timelines";

    // private streamBase =
    //   this.base.replace(/^https?/i, "ws") +
    //   "/streaming?access_token=" +
    //   config.token +
    //   "&stream=";

    // private endpoints = {
    //   rest: {
    //     home: this.apiBase + "/home",
    //     fed: this.apiBase + "/public",
    //     local: this.apiBase + "/public?local=true",
    //   },
    //   stream: {
    //     home: this.streamBase + "user",
    //     fed: this.streamBase + "public",
    //     local: this.streamBase + "public:local",
    //   },
    // };

    // @Watch("result")
    // changeResult() {
    //   console.log("result in Grid", this.result);
    //   this.foundUser = this.result.accounts
    //   // this.allToots = this.result;
    // }
    @Watch("tagSearch")
    changeTag() {
        this.allToots = this.tagSearch;
    }
    @Watch("allResult")
    changeResult() {
        this.allToots = this.allResult;
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
        setTimeout(() => {
            //@ts-ignore
            this.$refs.isotope.layout();
        }, 100);
        window.addEventListener("resize", this.onResize);
    }

    // getGridItem(howMany = config.statusLimit) {
    //   let endpoint = this.endpoints.rest.fed;
    //   //@ts-ignore
    //   this.$http
    //     .get(endpoint, {
    //       params: Object.assign({ only_media: true }),
    //       headers: { Authorization: "Bearer " + config.token },
    //     })
    //     .then(
    //       (response: any) => {
    //         //@ts-ignore
    //         var result = response.data;
    //         this.allToots = result;
    //       },
    //       (response: any) => {
    //         console.log(endpoint + " request failed");
    //       }
    //     );
    // }

    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    }

    moreItem() {
        this.end += 20;
        // isotope.init();
    }

    onResize() {
        this.device = getDevice();
        console.log(this.device);
    }

    optionPc() {
        return {
            masonry: {
                columnWidth: ".grid-item",
                itemSelector: ".grid-item",
                fitWidth: true,
            },

            horizontal: true,
            horizontalOrder: false,
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
}
</script>
