<template>
  <header id="header">
        <div class="header-fixed">
          <h1 class="logo"><router-link to="#" class="btn btn-logo">KN</router-link></h1>
          <nav class="navigation">
            <ul>
              <li class="list-ins"><router-link to="#" class="btn btn-link">INS</router-link></li>
              <li class="list-toot"><router-link to="#" class="btn btn-link">TOOT</router-link></li>
              <li class="list-hive"><router-link to="#" class="btn btn-link active">HIVE</router-link></li>
              <li class="list-posting"><router-link to="#" class="btn btn-link">Posting</router-link></li>
              <li class="list-inspiration"><router-link to="#" class="btn btn-link">Inspiration</router-link></li>
              <li class="list-exhibition"><router-link to="#" class="btn btn-link">Exhibition</router-link></li>
              <li class="list-project"><router-link to="#" class="btn btn-link">Project</router-link></li>
              <li class="list-mytag"><router-link to="#" class="btn btn-link">MyTag</router-link></li>
              <li class="list-rank"><router-link to="#" class="btn btn-link">Rank</router-link></li>
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

}
</script>

