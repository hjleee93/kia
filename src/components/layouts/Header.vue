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
                                to="/mastodon/web/timelines/public"
                                class="btn btn-link"
                                :class="{ active: isActive('INS') }"
                                >INS</router-link
                            >
                        </li>
                        <li class="list-toot" @click="clickedHeader('Posting')">
                            <router-link
                                to="/posting"
                                class="btn btn-link"
                                :class="{ active: isActive('Posting') }"
                                >TOOT</router-link
                            >
                        </li>
                        <li class="list-hive" @click="clickedHeader('Hive')">
                            <router-link
                                to="/hive"
                                :class="{ active: isActive('Hive') }"
                                class="btn btn-link"
                                >HIVE</router-link
                            >
                        </li>
                        <li
                            class="list-posting"
                            @click="clickedHeader('Posting')"
                        >
                            <router-link
                                to="/posting"
                                :class="{ active: isActive('Posting') }"
                                class="btn btn-link"
                                >Posting</router-link
                            >
                        </li>
                        <li
                            class="list-inspiration"
                            @click="clickedHeader('Inspiration')"
                        >
                            <router-link
                                to="/inspiration"
                                :class="{ active: isActive('Inspiration') }"
                                class="btn btn-link"
                                >Inspiration</router-link
                            >
                        </li>
                        <li
                            class="list-exhibition"
                            @click="clickedHeader('Exhibition')"
                        >
                            <router-link
                                to="/exhibition"
                                :class="{ active: isActive('Exhibition') }"
                                class="btn btn-link"
                                >Exhibition</router-link
                            >
                        </li>
                        <li
                            class="list-project"
                            @click="clickedHeader('Project')"
                        >
                            <router-link
                                to="/project"
                                :class="{ active: isActive('Project') }"
                                class="btn btn-link"
                                >Project</router-link
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
                <button class="btn btn-logout" @click="toLogin">Login</button>
            </template>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
    private active: string = this.$store.getters.currCategory;
    private loggedIn: boolean = localStorage.getItem("token") != null;

    isActive(value: string) {
        return this.active === value;
    }

    logOut() {
        this.$emit("logout");
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    clickedHeader(category: string) {
        this.$store.commit("currCategory", category);
        this.active = category;
    }
    @Watch("$store.getters.currCategory")
    getCategory() {
        this.active = this.$store.getters.currCategory;
    }
    toLogin() {
        window.location.href = "/";
    }
    clickedLogo() {
        if (this.$store.getters.currCategory.toLowerCase() === "login") {
            window.location.href = "/";
        } else {
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
.btn-logo:hover {
    cursor: pointer;
}
</style>
