<template>
    <div class="box-toot-dropdown">
        <button data-val="" class="btn txt" @click="tootDropDown.txtClick()">
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
                        class="btn btn-dropdown active"
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
            onclick="search.mobileToggle(this)"
        ></button>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class TootDropdown extends Vue {}
</script>

<style>
</style>