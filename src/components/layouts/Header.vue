<template>
    <header id="header">
        <div class="header-fixed">
            <h1 class="logo">
                <span @click="clickedLogo" class="btn btn-logo">KN</span>
            </h1>

            <template v-if="$store.getters.currentUser">
                <nav class="navigation">
                    <ul>
                        <li class="list-ins" @click="clickedHeader('INS')">
                            <router-link
                                :to="{
                                    path:'/mastodon/web/timelines/public',
                                     query:
                                        $store.getters.currCategory ===
                                            'inspiration' ||
                                        $store.getters.currCategory ===
                                            'project' ||
                                        $store.getters.currCategory ===
                                            'exhibition'
                                            ? {
                                                  tag: `${$store.getters.currCategory}`,
                                              }
                                            : '',
                                } "
                                class="btn btn-link"
                                :class="{ active: isActive('INS') }"
                                >INS</router-link
                            >
                        </li>
                        <li class="list-toot" @click="clickedHeader('Toot')">
                            <router-link
                                :to="{
                                    path: '/mastodon/web/statuses/new',
                                    query:
                                        $store.getters.currCategory ===
                                            'inspiration' ||
                                        $store.getters.currCategory ===
                                            'project' ||
                                        $store.getters.currCategory ===
                                            'exhibition'
                                            ? {
                                                  tag: `${$store.getters.currCategory}`,
                                              }
                                            : '',
                                }"
                                class="btn btn-link"
                                :class="{ active: isActive('Toot') }"
                                >TOOT</router-link
                            >
                        </li>
                        <li class="list-hive" @click="clickedHeader('hive')">
                            <router-link
                                to="/hive"
                                :class="{ active: isActive('hive') }"
                                class="btn btn-link"
                                >HIVE</router-link
                            >
                        </li>
                        <li
                            class="list-posting"
                            @click="clickedHeader('posting')"
                        >
                            <router-link
                                to="/posting"
                                :class="{ active: isActive('posting') }"
                                class="btn btn-link"
                                >Posting</router-link
                            >
                        </li>
                        <li
                            class="list-inspiration"
                            @click="clickedHeader('inspiration')"
                        >
                            <router-link
                                to="/inspiration"
                                :class="{ active: isActive('inspiration') }"
                                class="btn btn-link"
                                >Inspiration</router-link
                            >
                        </li>

                        <li
                            class="list-project"
                            @click="clickedHeader('project')"
                        >
                            <router-link
                                to="/project"
                                :class="{ active: isActive('project') }"
                                class="btn btn-link"
                                >Project</router-link
                            >
                        </li>
                        <li
                            class="list-exhibition"
                            @click="clickedHeader('exhibition')"
                        >
                            <router-link
                                to="/exhibition"
                                :class="{ active: isActive('exhibition') }"
                                class="btn btn-link"
                                >Exhibition</router-link
                            >
                        </li>
                        <li class="list-mytag">
                            <router-link
                                to="/tag"
                                @click.native="active = 'Tag'"
                                :class="{ active: isActive('Tag') }"
                                class="btn btn-link"
                                >Tag</router-link
                            >
                        </li>
                        <li class="list-rank">
                            <router-link
                                to="/rank"
                                @click.native="active = 'Rank'"
                                :class="{ active: isActive('Rank') }"
                                class="btn btn-link"
                                >Rank</router-link
                            >
                        </li>
                    </ul>
                </nav>

                <button class="btn btn-logout" @click="logOut">Logout</button>
            </template>
            <template v-else>
                <li class="list-ins mobile-header">
                    <router-link to="/login" class="btn btn-link"
                        >Login</router-link
                    >
                </li>
                <button class="btn btn-logout">
                    <router-link to="/login" class="btn btn-link"
                        >Login</router-link
                    >
                </button>
            </template>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
    private active: string = this.$store.getters.currCategory;

    isActive(value: string) {
        return this.active === value;
    }

    logOut() {
        this.$store.dispatch("logout");
        this.$router.push("/login").catch(() => {});
    }

    clickedHeader(category: string) {
        this.$store.commit("currCategory", category);

        this.active = category;
    }

    @Watch("$store.getters.currCategory")
    getCategory() {
        this.active = this.$store.getters.currCategory;
    }
    clickedLogo() {
        this.$router.push("/mastodon/web/timelines/public").catch(() => {});
    }
}
</script>

<style scoped>
.btn-logo:hover {
    cursor: pointer;
}

@media (min-width: 320px) and (max-width: 1023px) {
    #header .mobile-header {
        display: block;
        text-align: center;
        font-size: 12px;
        line-height: 12px;
        color: #848e98;
        transition: color 0.3s;
        position: relative;
        text-transform: uppercase;
        flex: 1;
    }
}
@media (min-width: 1024px) {
    #header .mobile-header {
        display: none;
    }
}
</style>
