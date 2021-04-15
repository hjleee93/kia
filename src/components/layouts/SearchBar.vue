<template>
    <div class="sec-search">
        <div class="box-layer">
            <div class="box-search-form">
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
                                    :class="
                                        category === 'Posting' ? 'active' : ''
                                    "
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
                <div class="box-search-input">
                    <div class="box-input">
                        <label class="input" @click="listsOpen">
                            <input
                                type="text"
                                name="search"
                                :placeholder="
                                    $store.getters.currCategory === 'Posting'
                                        ? '내용검색'
                                        : '사용자, 내용 검색'
                                "
                                v-model="searchInput"
                                autocomplete="off"
                                @focus="inpFocus('searchInput')"
                                ref="searchInput"
                            />
                        </label>
                        <!--조회 전-->
                        <button
                            @click="searchToot"
                            class="btn btn-search"
                            :class="[
                                searchInput ? 'active' : '',
                                isDone ? 'delete' : '',
                            ]"
                        ></button>
                        <!--조회 중-->
                        <!-- <template v-if="!searchInput">
      <button class="btn btn-search active"></button>-->
                        <!-- </template>  -->
                        <!--조회 완료-->
                        <!--<button class="btn btn-search delete"></button>-->
                    </div>
                    <template v-if="searchInput.length === 0">
                        <div class="box-search-history">
                            <strong class="tit">최근 검색어</strong>
                            <ul class="search-history-lists">
                                <li
                                    v-for="(keyword, idx) in searchHistory"
                                    :key="keyword.id"
                                >
                                    <!-- issue: null -->
                                    <button
                                        class="btn btn-history"
                                        @click="searchInput = keyword"
                                    >
                                        <span>{{ keyword }}</span>
                                    </button>
                                    <button
                                        class="btn btn-history-delete"
                                        @click="deleteHistory(idx)"
                                    >
                                        삭제
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { dim, getDevice, gnb, search, tootDropDown } from "@/scripts/ui_common";

@Component({ components: {} })
export default class SearchBar extends Vue {
    private searchInput: string = "";
    private isDone: boolean = false;
    private category: string = "";

    private searchHistory: string[] = JSON.parse(
        localStorage.getItem("RecentKeyword")!
    );

    private searchResult: any[] = [];

    @Watch("$store.getters.currCategory")
    getCategory() {
        this.category = this.$store.getters.currCategory;
    }
    mounted() {
        tootDropDown.init();
        search.init();
        dim.init();
         window.addEventListener("keydown", this.handleKeyDown);
    }

    beforeDestroy() {
        search.destroy();        
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e: any) {
        if (e.code === "Enter" || e.keyCode === 13) {
            this.searchToot();
        }
    }

    @Watch("searchInput")
    watchInput() {
        if (this.searchInput.length >= 0) {
            dim.close();
        }
    }
    
    txtClick() {
        tootDropDown.txtClick();
    }
    tootDrop(arg: string) {
        tootDropDown.btnDropdownClick(this.$refs[arg]);
        this.$router.push('/Posting').catch(() => {});
    }
    mobileToggle(arg: string) {
        search.mobileToggle(this.$refs[arg]);
    }

    listsOpen() {
        search.listsOpen();
    }
    inpFocus(arg: string) {
        this.isDone = false;
        search.inpFocus(this.$refs[arg]);
    }
    async searchToot() {
        //스토리지에 없는 경우
        if (!localStorage.getItem("RecentKeyword")) {
            this.searchHistory = [];
            this.searchHistory.push(this.searchInput);
            localStorage.setItem(
                "RecentKeyword",
                JSON.stringify(this.searchHistory)
            );
        }
        //스토리지에 있는 경우
        else {
            //최근 검색어 10개 제한
            if (this.searchHistory.length === 10) {
                this.searchHistory.pop();
                localStorage.removeItem("RecentKeyword");
                localStorage.setItem(
                    "RecentKeyword",
                    JSON.stringify(this.searchHistory)
                );
            }
            this.searchHistory = JSON.parse(
                localStorage.getItem("RecentKeyword")!
            );
            this.searchHistory.unshift(this.searchInput);
            localStorage.setItem(
                "RecentKeyword",
                JSON.stringify(this.searchHistory)
            );
        }

        try {
            const result = await this.$api.searchToot(this.searchInput);
            //검색결과 없는 경우
            if (result.accounts.length === 0 && result.statuses.length === 0) {
                this.$store.commit("searchResult", null);
            } else {
                this.$store.commit("searchResult", result.statuses);
            }
            this.isDone = true;
            dim.close();
        } catch (err) {
            console.log(err);
        }
    }
    deleteHistory(idx: number) {
        this.searchHistory.splice(idx, 1);
        localStorage.removeItem("RecentKeyword");
        localStorage.setItem(
            "RecentKeyword",
            JSON.stringify(this.searchHistory)
        );
    }
    clickedRctKeyword(keyword: string) {
        this.searchInput = keyword;
    }
}
</script>

<style></style>
