<template>
  <header id="header">
        <div class="header-fixed">
          <h1 class="logo"><router-link to="/" class="btn btn-logo">KN</router-link></h1>
          <nav class="navigation">
            <ul>
              <li class="list-ins"><router-link to="#" class="btn btn-link">INS</router-link></li>
              <li class="list-toot"><router-link to="#" class="btn btn-link">TOOT</router-link></li>
              <li class="list-hive"><router-link to="/" @click.native="active = 'HIVE'" :class="{active: isActive('HIVE')}" class="btn btn-link" >HIVE</router-link></li>
              <li class="list-posting"><router-link to="#" class="btn btn-link">Posting</router-link></li>
              <li class="list-inspiration"><router-link to="#" class="btn btn-link">Inspiration</router-link></li>
              <li class="list-exhibition"><router-link to="#" class="btn btn-link">Exhibition</router-link></li>
              <li class="list-project"><router-link to="#" class="btn btn-link">Project</router-link></li>
              <li class="list-mytag"><router-link to="/myTag" @click.native="active = 'MyTag'" :class="{active: isActive('MyTag')}" class="btn btn-link">MyTag</router-link></li>
              <li class="list-rank"><router-link to="/rank" @click.native="active = 'Rank'" :class="{active: isActive('Rank')}" class="btn btn-link">Rank</router-link></li>
            </ul>
          </nav>
          <button class="btn btn-logout">Logout</button>
        </div>
      </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Header extends Vue {
  private active = "";
    isActive(value: string) {
        return this.active === value;
    }

}
</script>

