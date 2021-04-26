<template>
    <div id="layer">
        <div class="layer-outer">
            <div class="layer-inner type-alert">
                <div class="layer-content">
                    <div class="alert-content">
                        <strong class="tit">앨범 쇼 이용 안내</strong>
                        <p class="txt">
                            모바일 버전에서는 지원되지 않는 기능입니다.<br />PC로
                            접속 후 이용 부탁드립니다.
                        </p>
                    </div>
                    <div class="alert-btn">
                        <button class="btn btn-confirm" @click="layerClose">
                            <span>확인</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="layer-inner album-show type-full-size">
                <div class="box-btn">
                    <button class="btn btn-close" @click="albumPopClose">
                        <span>닫기</span>
                    </button>
                </div>
                <div class="layer-content" ref="scroll">
                    <div class="grid-wrap">
                        <isotope class="grid" :options="options()" :list="list">
                            <div
                                class="grid-item"
                                v-for="(item, index) in list"
                                :key="index"
                            >
                                <button
                                    class="btn btn-image"
                                    @click="layerOpenDepth2(item)"
                                >
                                    <div
                                        class="box-img"
                                        :style="`width: ${item.width}px; background-image: url(${item.url})`"
                                    ></div>
                                </button>
                            </div>
                            <!--
                              개발 관련하여 안내 사항
                              image를 강제로 188로 줄여 그 비율이 1.0681818182(176px)이 넘어가면
                              image를 강제로 width 480으로 늘려야합니다.

                              이미지가 미리 로딩이 되어서 width height값을 출력할수 있어야합니다.
                              아니면 data에 width height값을 저장이 필요할것으로 판단됩니다.

                              테스트 코드는 아래의 쪽 isotopeHorizontal 함수를 확인바랍니다.
                            -->
                            <!--
                <div class="grid-item">
                  <button class="btn btn-image" style="width: 변동px; background-image: url(src)" onclick="albumPop.layerOpenDepth2()">
                    <div class="box-img"></div>
                  </button>
                </div>
                -->
                        </isotope>
                    </div>
                </div>

                <!--상세 이미지-->
                <div class="layer-depth2" @click="layerCloseDepth2()">
                    <div class="layer-depth2-content">
                        <div class="box-img">
                            <img :src="detailStc" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { albumPop, isDesktop } from "@/scripts/ui_common";
//@ts-ignore
import isotope from "vueisotope";

@Component({ components: { isotope } })
export default class AlbumShow extends Vue {
    isOpen: boolean = false;
    list: any[] = [];
    detailStc: string = "";
    category: string = "";
    autoScroll!: any;
    private imgArr: string[] = [];

    async mounted() {
        this.stopInterval();
        albumPop.init(this.openCallback);
    }
    beforeCreate() {
        this.$store.dispatch("resetSearchInfo");
    }

    stopInterval() {
        clearInterval(this.autoScroll);
    }
    beforeDestroy() {
        albumPop.destroy();
    }

    @Watch("$store.getters.albumResult")
    async watchResult() {
        this.imgArr = [];
        let result = await this.$store.getters.albumResult;
        this.imgArr = result;

        this.init();
    }
    openCallback() {
        this.isOpen = true;
        this.init();
    }
    async init() {
        const heightRatio = 1.0681818182;

        const imageList = this.imgArr;
        for (let i = 0; i < imageList.length; i++) {
            if (!this.isOpen) {
                return;
            }

            const img = document.createElement("img") as HTMLImageElement;
            img.src = imageList[i];
            await new Promise<void>((resolve) => {
                img.onload = function () {
                    resolve();
                };
            });

            let w;
            const width = img.width;
            const height = img.height;
            const imgheightRatio = height / width;
            const imgWidthRatio = width / height;
            if (imgheightRatio > heightRatio) {
                w = 480;
            } else {
                w = Math.min(188 * imgWidthRatio, 480);
            }

            this.list.push({
                width: img.width,
                url: imageList[i],
            });

            this.autoScroll = setInterval(() => {
                if (this.$refs.scroll !== undefined) {
                    this.$refs.scroll.scrollLeft += 10;
                    if (
                        this.$refs.scroll.scrollWidth -
                            this.$refs.scroll.clientWidth ===
                        this.$refs.scroll.scrollLeft
                    ) {
                        console.log("?");
                        this.stopInterval();
                    }
                }
            }, 1000);
        }
    }

    layerClose() {
        this.isOpen = false;
        albumPop.layerClose();
    }

    albumPopClose() {
        this.isOpen = false;
        this.list.length = 0;
        albumPop.layerClose(() => {
            // 상세 레이어 닫기
            // isDesktop();
            // document.querySelector("#layer .grid")!.innerHTML = "";
        });
    }

    layerOpenDepth2(image: any) {
        this.detailStc = image.url;
        // document.querySelector(".layer-depth2 .box-img img").src = src;
        albumPop.layerOpenDepth2(); //상세 레이어 열기
    }

    layerCloseDepth2() {
        albumPop.layerCloseDepth2();
    }

    options() {
        return {
            layoutMode: "masonryHorizontal",
            // initLayout: false,
            mansonryHorizontal: {
                itemSelector: ".grid-item",
            },
            transitionDuration: 0,
        };
    }
}
</script>

<style></style>
