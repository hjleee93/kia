<template>
    <div class="box-toot-dropdown">
        <button data-val="" class="btn txt" @click="txtClick">
            <span>모든 툿</span>
        </button>
        <div class="lists">
            <ul>
                <!--비선택-->
                <li>
                    <button
                        data-val="all"
                        class="btn btn-dropdown"
                        @click="tootDrop('allToot')"
                        ref="allToot"
                    >
                        <span>모든 툿</span>
                    </button>
                </li>
                <!--선택-->
                <li>
                    <button
                        data-val="my"
                        class="btn btn-dropdown"
                        :class="category === 'Posting' ? 'active' : ''"
                        @click="tootDrop('myToot')"
                        ref="myToot"
                    >
                        <span>내가 쓴 툿</span>
                    </button>
                </li>
            </ul>
        </div>

        <!--모바일 전용 search open버튼-->
        <button
            class="btn btn-m-search open"
            @click="mobileToggle('mobileSearch')"
            ref="mobileSearch"
        ></button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { dim, getDevice, gnb, search, tootDropDown } from "@/scripts/ui_common";

@Component({ components: {} })
export default class Dropdwon extends Vue {
    private category: string = "";

    @Watch("$store.getters.currCategory")
    getCategory() {
        this.category = this.$store.getters.currCategory;
    }
    mounted() {
        tootDropDown.init();
    }

    txtClick() {
        tootDropDown.txtClick();
    }
    tootDrop(arg: string) {
        tootDropDown.btnDropdownClick(this.$refs[arg]);
    }
}
</script>

<style>
</style>