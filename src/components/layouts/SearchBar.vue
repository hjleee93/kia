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

@Component({ components: { TootDropdown, TootSearch } })
export default class SearchBar extends Vue {
    dim: any;
    gnb: any;
    search: any;
    tootDropDown: any;
    hashDropDown: any;
    getDevice: any;

    mounted() {
        //@ts-ignore
        this.gnb = window.gnb();
        this.gnb.init();
        //@ts-ignore
        this.search = window.search();
        this.search.init();
        //@ts-ignore
        this.dim = window.dim();
        this.dim.init();
        //@ts-ignore
        this.tootDropDown = window.tootDropDown(".box-toot-dropdown");
        this.tootDropDown.init();
        //@ts-ignore
        this.hashDropDown = window.hashDropDown(".box-hash-dropdown");
        this.hashDropDown.init();
        //@ts-ignore
        this.getDevice = window.getDevice();
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