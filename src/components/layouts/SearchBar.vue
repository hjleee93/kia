<template>
    <div class="sec-search">
        <div class="box-layer">
            <div class="box-search-form">
                <TootDropdown />
                <TootSearch />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TootDropdown from "./toot/TootDropdown.vue";
import TootSearch from "./toot/TootSearch.vue";
import Isotope from "../../scripts/isotope.js";
import {dim, getDevice, gnb, hashDropDown, search, tootDropDown} from "@/scripts/ui_common";

@Component({ components: { TootDropdown, TootSearch } })
export default class SearchBar extends Vue {
    dim: any;
    gnb: any;
    search: any;
    tootDropDown: any;
    hashDropDown: any;
    getDevice: any;

    mounted() {
        this.gnb = gnb;
        this.gnb.init();

        this.search = search;
        this.search.init();

        this.dim = dim;
        this.dim.init();

        this.tootDropDown = tootDropDown;
        this.tootDropDown.init();

        this.hashDropDown = hashDropDown;
        this.hashDropDown.init();

        this.getDevice = getDevice;
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
                msnry = new Isotope(elem, {
                    masonry: {
                        columnWidth: ".grid-item",
                        itemSelector: ".grid-item",
                        fitWidth: true,
                    },
                    horizontal: true,
                    horizontalOrder: false,
                    transitionDuration: 0,
                });
            }
            //MOBILE 일경우
            else {
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
            device = this.getDevice(); //device
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
                    (device === "mo" && this.getDevice() === "pc") || //desktop
                    (device === "pc" && this.getDevice() === "mo") //mobile
                ) {
                    device = this.getDevice();
                    injection(device);
                }
            },
            false
        );

        init();
    }

    tootDrop(arg: string) {
        this.tootDropDown.btnDropdownClick(this.$refs[arg]);
    }

    listsOpen() {
        this.search.listsOpen();
        // this.dim.open()
    }
}
</script>

<style>
</style>