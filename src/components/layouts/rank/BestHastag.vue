<template>
   <div class="sec-best-hash">
                        <h2 class="b-tit">BEST 해시태그</h2>
                        <div class="box-best-hash">
                            <ol class="best-hash-lists">

                                <li v-for="hashtag in hastagList" :key="hashtag.tagNumber">
                                    <span class="number">{{hashtag.tagNumber}}</span>
                                    <p class="hash">
                                        <span>#</span> {{hashtag.tagName}}
                                    </p>
                                    <span class="toot">{{hashtag.tagTootCnt.toLocaleString()}} 툿</span>
                                </li>

                               
                            </ol>
                        </div>
                    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class BestHashtag extends Vue{
    private hastagList: any[] = [
        {
            tagNumber: 1,
            tagName : '해시 태그명 노출',
            tagTootCnt: 486
        },
        {
            tagNumber: 2,
            tagName : '해시 태그명 노출2',
            tagTootCnt: 0
        },
        {
            tagNumber: 3,
            tagName : '해시 태그명 노출3',
            tagTootCnt: 0
        },
        {
            tagNumber: 4,
            tagName : '해시 태그명 노출4',
            tagTootCnt: 0
        },
        {
            tagNumber: 5,
            tagName : '해시 태그명 노출5',
            tagTootCnt: 0
        },
        {
            tagNumber: 6,
            tagName : '해시 태그명 노출6',
            tagTootCnt: 0
        },
        {
            tagNumber: 7,
            tagName : '해시 태그명 노출7',
            tagTootCnt: 0
        },
        {
            tagNumber: 8,
            tagName : '해시 태그명 노출8',
            tagTootCnt: 0
        },
        {
            tagNumber: 9,
            tagName : '해시 태그명 노출9',
            tagTootCnt: 0
        },
        {
            tagNumber: 10,
            tagName : '해시 태그명 노출10',
            tagTootCnt: 0
        },
        

    ]

}
</script>

<style>

</style>