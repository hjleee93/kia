<template>
  <div class="sec-search">
                    <div class="box-layer">
                        <div class="box-search-form">
                            <div class="box-input">
                                <label class="input">
                                    <input
                                        v-model="inputHashtag"
                                        type="text"
                                        name="search"
                                        placeholder="해시태그 검색"
                                        autocomplete="off"
                                    />
                                </label>
                                <!--조회 전-->
                                <button class="btn btn-search"></button>
                                <!--조회 중-->
                                <!--<button class="btn btn-search active"></button>-->
                                <!--조회 완료-->
                                <!--<button class="btn btn-search delete"></button>-->
                            </div>
                        </div>
                    </div>
                </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class SearchHashtag extends Vue{
    private inputHashtag: string = ' '

    

}
</script>

<style>

</style>