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

        <li v-for="(userinfo, idx) in userList" :key="idx">
          <template v-if="idx === 0">
            <span class="number gold">{{ idx + 1 }}</span>
          </template>
          <template v-else-if="idx === 1">
            <span class="number silver">{{ idx + 1 }}</span>
          </template>
          <template v-else-if="idx === 2">
            <span class="number bronze">{{ idx + 1 }}</span>
          </template>

          <template v-else>
            <span class="number">{{ idx + 1 }}</span>
          </template>

          <template v-if="idx + 1 === 1 || idx + 1 === 2 || idx + 1 === 3">
            <router-link :to="'/mastodon/web/accounts/' + userinfo.account.id">
              <i class="icon icon-user"
                ><img :src="userinfo.account.avatar" alt=""
              /></i>
            </router-link>
          </template>

          <span class="username">
            <router-link
              :to="'/mastodon/web/accounts/' + userinfo.account.id"
              >{{ userinfo.account.acct }}</router-link
            ></span
          >

          <template v-if="idx + 1 === 1 || idx + 1 === 2 || idx + 1 === 3">
            <span class="m-toot">작성한 툿 : {{ userinfo.count }}</span
            ><!--mobile 전용-->
          </template>
          <template v-else>
            <span class="m-toot">{{ userinfo.count }} 툿</span
            ><!--mobile 전용-->
          </template>

          <span class="toot">{{ userinfo.count }} 툿</span
          ><!--desktop 전용-->
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { bus } from "@/main";

@Component({ components: {} })
export default class BestUser extends Vue {
  private userList: any[] = [];
  private gte!: string;
  private lte: string = `${this.getFormatDate(new Date())} 23:59:59`;

  async mounted() {
    let today = new Date();
    today.setDate(today.getDate() - 30);
    this.gte = `${this.getFormatDate(today)} 00:00:01`;
    const result = await this.$api.getBestUser(this.gte, this.lte, 10);
    this.userList = result;

    this.getBestUsers();
  }
  beforeDestroy() {
    bus.$off("gte");
    bus.$off("lte");
  }
  async getBestUsers() {
    bus.$on("gte", (gte: string) => {
      this.gte = gte;
      bus.$on("lte", async (lte: string) => {
        this.lte = lte;

        const result = await this.$api.getBestUser(this.gte, this.lte, 10);
        this.userList = result;
      });
    });
  }

  getFormatDate(date: Date) {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    //@ts-ignore
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    //@ts-ignore
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  }
}
</script>

<style></style>
