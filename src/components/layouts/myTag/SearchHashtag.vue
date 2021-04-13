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
                    <button
                        class="btn btn-search"
                        @click="searchMyTag(inputHashtag)"
                        :class="[
                            inputHashtag.length > 0 ? 'active' : '',
                            isDone ? 'delete' : '',
                        ]"
                    ></button>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ components: {} })
export default class SearchHashtag extends Vue {
    @Prop() hashtag!: string;
    private inputHashtag: string = this.hashtag;
    private isDone: boolean = false;

    @Watch("hashtag")
    watchHashtag() {
        this.inputHashtag = this.hashtag;
    }

    searchMyTag(input: string) {
        //todo: 자신이 사용한 해시태그 get 연결
        let result = ['123', '234', '안녕']
        // let result:any[] = []
        //결과값 저장
        this.$emit('myTags', result)
        this.isDone = true;
    }
}
</script>

<style>
</style>