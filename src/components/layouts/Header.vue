<template>
  <header id="header">
    <div class="header-fixed">
      <h1 class="logo">
        <router-link to="/hive" class="btn btn-logo">KN</router-link>
      </h1>
      <nav class="navigation">
        <ul>
          <li class="list-ins">
            <router-link to="#" class="btn btn-link">INS</router-link>
          </li>
          <li class="list-toot">
            <router-link to="#" class="btn btn-link">TOOT</router-link>
          </li>
          <li class="list-hive" @click="clickedHeader('Hive')">
            <router-link
              to="/hive"
              :class="{ active: isActive('Hive') }"
              class="btn btn-link"
              >HIVE</router-link
            >
          </li>
          <li class="list-posting" @click="clickedHeader('Posting')">
            <router-link
              to="/posting"
              :class="{ active: isActive('Posting') }"
              class="btn btn-link"
              >Posting</router-link
            >
          </li>
          <li class="list-inspiration" @click="clickedHeader('Inspiration')">
            <router-link
              to="/inspiration"
              :class="{ active: isActive('Inspiration') }"
              class="btn btn-link"
              >Inspiration</router-link
            >
          </li>
          <li class="list-exhibition" @click="clickedHeader('Exhibition')">
            <router-link
              to="/exhibition"
              :class="{ active: isActive('Exhibition') }"
              class="btn btn-link"
              >Exhibition</router-link
            >
          </li>
          <li class="list-project" @click="clickedHeader('Project')">
            <router-link
              to="/project"
              :class="{ active: isActive('Project') }"
              class="btn btn-link"
              >Project</router-link
            >
          </li>
          <li class="list-mytag">
            <router-link
              to="/myTag"
              @click.native="active = 'MyTag'"
              :class="{ active: isActive('MyTag') }"
              class="btn btn-link"
              >MyTag</router-link
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
    </div>
  </header>
</template>

<script lang="ts">
import { bus } from "@/main";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Category from "./Category.vue";

@Component({ props: ["currentUser"] })
export default class Header extends Vue {
  @Prop() sendCategory!: string;
  private active: string = "";
  private loggedIn: boolean = localStorage.getItem("token") != null;

  private eventBus = new Vue();

  isActive(value: string) {
    return this.active === value;
  }
  logOut() {
    this.$emit("logout");
    localStorage.removeItem("token");
  }
  clickedHeader(category: string) {
    this.active = category;
  }

  mounted() {
    bus.$on(
      "category",
      (category: string) =>
        // console.log("eventBus", category)
        (this.active = category)
    );
  }
}
</script>
