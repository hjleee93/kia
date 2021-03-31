<template>
  <div class="box-grid-top">
                <div class="floated left">
                    <p class="txt">총 {{tootCnt}}개의 톳</p>
                    <!--<p class="txt">총 100개의 검색 결과</p>-->
                </div>
                <div class="floated right">
                    <ul class="sort-lists">
                        <li>
                            <button class="btn btn-sort active">
                                <span>최신순</span>
                            </button>
                        </li>
                        <!--활성화-->
                        <li>
                            <button class="btn btn-sort">
                                <span>인기순</span>
                            </button>
                        </li>
                        <!--비활성-->
                    </ul>
                </div>
            </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class BoxGridTop extends Vue {
    private tootCnt: Number = 0;

    mounted(){
        this.tootCnt = this.$store.state.test.tootList.length;
    }

}
</script>

<style>

</style>