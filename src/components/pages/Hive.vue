<template>
    <div id="content" class="hive">
        <div class="content">
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <SearchBar />
                    <Category />
                    <div class="sec-grid-top">
                        <BoxGridTop />
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <GridItem />
        </div>
        
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Category from "../layouts/Category.vue";
import GridItem from "../layouts/grid/GridItem.vue";
import BoxGridTop from "../layouts/grid/BoxGridTop.vue";
import SearchBar from "../layouts/SearchBar.vue";
import {
    dim,
    gnb,
    hashDropDown,
    search,
    tootDropDown,
    getDevice
} from "@/scripts/ui_common";

@Component({
    components: { SearchBar, Category, GridItem, BoxGridTop },
})
export default class Hive extends Vue {
    beforeUpdate() {
        tootDropDown.init();
        hashDropDown.init();
        search.init();
        dim.init();
        gnb.init();
    }
    isotope() {
        var elem = document.querySelector(".hive")!.querySelector(".grid");
        var msnry: any = null;
        var device: string = null!;

        function injection(target: string) {
            //isotope script 제거
            if (msnry) {
                msnry.destroy();
                msnry = null;
            }
            //PC 일경우
            if (target === "pc") {
                //@ts-ignore
                msnry = new Isotope(elem, {
                    masonry: {
                        columnWidth: ".grid-item",
                        itemSelector: ".grid-item",
                        fitWidth: true,
                    },
                    // horizontal: true,
                    // horizontalOrder: false,
                    // transitionDuration: 0,
                });
            }
            //MOBILE 일경우
            else {
                //@ts-ignore
                msnry = new Isotope(elem, {
                    masonry: {
                        columnWidth: ".grid-item",
                        itemSelector: ".grid-item",
                    },
                    horizontalOrder: false,
                    transitionDuration: 0,
                });
            }
        }

        const init = () => {
            device = getDevice(); //device
            (document.querySelector(
                ".sec-grid"
            ) as HTMLElement)!.style.display = "none";

            setTimeout(function () {
                (document.querySelector(
                    ".sec-grid"
                ) as HTMLElement)!.style.display = "block";
                injection(device);
            }, 1000);
        };

        window.addEventListener(
            "resize",
            () => {
                if (
                    (device === "mo" && getDevice() === "pc") || //desktop
                    (device === "pc" && getDevice() === "mo") //mobile
                ) {
                    device = getDevice();
                    injection(device);
                }
            },
            false
        );

        init();
    }
    mounted() {
        this.isotope();
    }
}
</script>

<style>
</style>