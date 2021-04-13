<template>
    <div class="sec-best-user">
        <h2 class="b-tit">BEST 사용자</h2>
        <div class="box-best-user">
            <ol class="best-user-lists">
                <!-- LOOP 영역
                      <li>
                        <span class="number gold">1</span>
                        <span class="number silver">2</span>
                        <span class="number bronze">3</span>
                        <span class="number">4</span>
                        <i class="icon icon-user"><img src="" alt="" /></i>
                        <span class="username">user name</span>
                        <span class="toot">486 툿</span>
                      </li>
                      -->
                <li v-for="userinfo in userList" :key="userinfo.userNumber">
                    <template v-if="userinfo.userNumber === 1">
                        <span class="number gold">{{
                            userinfo.userNumber
                        }}</span>
                    </template>
                    <template v-else-if="userinfo.userNumber === 2">
                        <span class="number silver">{{
                            userinfo.userNumber
                        }}</span>
                    </template>
                    <template v-else-if="userinfo.userNumber === 3">
                        <span class="number bronze">{{
                            userinfo.userNumber
                        }}</span>
                    </template>

                    <template v-else>
                        <span class="number">{{ userinfo.userNumber }}</span>
                    </template>

                    <template v-if="userinfo.userImg !== ''">
                        <i class="icon icon-user"
                            ><img :src="userinfo.userImg" alt=""
                        /></i>
                    </template>
                    <span class="username">{{ userinfo.userName }}</span>
                    <template
                        v-if="
                            userinfo.userNumber === 1 ||
                            userinfo.userNumber === 2 ||
                            userinfo.userNumber === 3
                        "
                    >
                        <span class="m-toot"
                            >작성한 툿 :
                            {{ userinfo.tootCnt.toLocaleString() }}</span
                        ><!--mobile 전용-->
                    </template>
                    <template v-else>
                        <span class="m-toot"
                            >{{ userinfo.tootCnt.toLocaleString() }} 툿</span
                        ><!--mobile 전용-->
                    </template>

                    <span class="toot"
                        >{{ userinfo.tootCnt.toLocaleString() }} 툿</span
                    ><!--desktop 전용-->
                </li>
            </ol>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class BestUser extends Vue {
    private userList: any[] = [];
    async mounted() {
        this.getBestUsers();
    }
    async getBestUsers() {
        let result: any[] = [
            {
                userNumber: 1,
                userName: "user1",
                userImg: "images/@temp/@temp_rank2.jpg",
                tootCnt: 486,
            },
            {
                userNumber: 2,
                userName: "user name 2",
                userImg: "images/@temp/@temp_rank2.jpg",
                tootCnt: 486,
            },
            {
                userNumber: 3,
                userName: "user name 3",
                userImg: "images/@temp/@temp_rank2.jpg",
                tootCnt: 486,
            },
            {
                userNumber: 4,
                userName: "user name 4",
                userImg: "",
                tootCnt: 1990,
            },
            {
                userNumber: 5,
                userName: "user name 5",
                userImg: "",
                tootCnt: 0,
            },
            {
                userNumber: 6,
                userName: "user name 6",
                userImg: "",
                tootCnt: 0,
            },
            {
                userNumber: 7,
                userName: "user name 7",
                userImg: "",
                tootCnt: 0,
            },
            {
                userNumber: 8,
                userName: "user name 8",
                userImg: "",
                tootCnt: 0,
            },
            {
                userNumber: 9,
                userName: "user name 9",
                userImg: "",
                tootCnt: 0,
            },
            {
                userNumber: 10,
                userName: "user name 10",
                userImg: "",
                tootCnt: 0,
            },
        ];
        this.userList = result;
    }
}
</script>

<style>
</style>