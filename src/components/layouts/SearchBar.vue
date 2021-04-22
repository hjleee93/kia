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
                <!-- 사용자, 검색어 추가 dropdown -->
                <template v-if="$store.getters.currCategory !== 'Posting'">
                    <div class="box-toot-dropdown2">
                        <button data-val="" class="btn txt2" @click="txtClick2">
                            <span>내용</span>
                        </button>
                        <div class="lists2">
                            <ul>
                                <!--비선택-->
                                <li>
                                    <button
                                        data-val="contents"
                                        class="btn btn-dropdown2"
                                        @click="tootDrop2('contents')"
                                        ref="contents"
                                    >
                                        <span>내용</span>
                                    </button>
                                </li>
                                <!--선택-->
                                <li>
                                    <button
                                        data-val="user"
                                        class="btn btn-dropdown2"
                                        :class="
                                            category === 'Posting'
                                                ? 'active'
                                                : ''
                                        "
                                        @click="tootDrop2('user')"
                                        ref="user"
                                    >
                                        <span>사용자</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
                <div class="box-search-input">
                    <div class="box-input">
                        <label class="input" @click="listsOpen">
                            <input
                                type="text"
                                name="search"
                                :placeholder="
                                    $store.getters.currCategory === 'Posting'
                                        ? '내용검색'
                                        : '검색'
                                "
                                v-model="searchInput"
                                autocomplete="off"
                                @focus="inpFocus('searchInput')"
                                ref="searchInput"
                            />
                        </label>
                        <!--조회 전-->
                        <template v-if="!isDone">
                            <button
                                @click="searchToot"
                                class="btn btn-search"
                                :class="[
                                    searchInput ? 'active' : '',
                                    isDone ? 'delete' : '',
                                ]"
                            ></button>
                        </template>
                        <template v-else>
                            <button
                                class="btn btn-search delete"
                                @click="deleteResult"
                            ></button>
                        </template>
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
import {
    dim,
    getDevice,
    gnb,
    search,
    tootDropDown,
    tootDropDown2,
} from "@/scripts/ui_common";

@Component({ components: {} })
export default class SearchBar extends Vue {
    private searchInput: string = "";
    private isDone: boolean = false;
    private category: string = "";
    private isAllToot!: Boolean;
    private searchType: string = "contents";

    private searchHistory: string[] = JSON.parse(
        localStorage.getItem("RecentKeyword")!
    );

    private searchResult: any[] = [];

    @Watch("$store.getters.currCategory")
    getCategory() {
        this.category = this.$store.getters.currCategory;

        if (this.category === "Posting") {
            this.isAllToot = false;
        } else {
            this.isAllToot = true;
        }
    }
    mounted() {
        tootDropDown.init();
        tootDropDown2.init();
        search.init();
        dim.init();
        window.addEventListener("keydown", this.handleKeyDown);
    }

    beforeDestroy() {
        search.destroy();
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e: any) {
        if (this.searchInput.length !== 0) {
            if (e.keyCode === 13) {
                this.searchToot();
            }
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
    txtClick2() {
        tootDropDown2.txtClick();
    }
    tootDrop2(arg: string) {
        tootDropDown2.btnDropdownClick(this.$refs[arg]);
        this.searchType = arg;
    }
    tootDrop(arg: string) {
        tootDropDown.btnDropdownClick(this.$refs[arg]);
        if (arg === "myToot") {
            this.isAllToot = false;
            this.$router.push("/Posting").catch(() => {});
        } else if (arg === "allToot") {
            this.isAllToot = true;
            this.$router.push("/Hive").catch(() => {});
        }
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
        if (this.searchInput.length !== 0) {
            let result!: any;
            let hasDuplicatedKeyword: boolean = false;
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
                //중복검색어 체크용
                for (const i in this.searchHistory) {
                    if (this.searchHistory[i] === this.searchInput) {
                        //@ts-ignore
                        this.searchHistory.splice(i, 1);
                        this.searchHistory.unshift(this.searchInput);
                        localStorage.setItem(
                            "RecentKeyword",
                            JSON.stringify(this.searchHistory)
                        );
                        hasDuplicatedKeyword = true;
                        break;
                    } else {
                        hasDuplicatedKeyword = false;
                    }
                }

                if (!hasDuplicatedKeyword) {
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
            }
            try {
                let temp = [];
                //검색 페이지 별로 분류
                if (this.searchType === "user") {
                    this.$store.commit("searchType", this.searchType);
                    this.$store.commit("searchInput", this.searchInput);
                    result = await this.$api.searchMedia(this.searchInput);
                } else if (this.searchType === "contents") {
                    this.$store.commit("searchType", this.searchType);
                    result = await this.$api.searchMediaContents(this.searchInput);
                    
                }

                //검색결과 없는 경우
                if (result.length === 0) {
                    this.$store.commit("searchResult", null);
                } else {
                    this.$store.commit("searchResult", result);
                }
                this.$store.commit("tootCnt", result.length);
                this.isDone = true;

                dim.close();
            } catch (err) {
                console.log(err);
            }
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

    deleteResult() {
        this.searchInput = "";
        this.isDone = false;
        location.reload();
    }
}
</script>

<style scoped>
@media (min-width: 1024px) {
    .box-layer {
        width: 568px !important;
    }
}
.box-search-form {
    flex-wrap: nowrap !important;
}

@media (min-width: 320px) and (max-width: 1023px) {
    #content.hive .box-toot-dropdown2 .lists2 {
        left: 135px !important;
    }
}
</style>
