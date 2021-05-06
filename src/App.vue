<template>
    <div id="app" class="no-drag">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
    components: {},
})
export default class App extends Vue {
    created() {
        try {
            if (
                this.$store.getters.userToken !== "null" &&
                this.$store.getters.userToken !== null
            ) {
                this.$store.dispatch(
                    "userStatus",
                    this.$store.getters.userToken
                );
            } else {
                this.$router.push("/login").catch(() => {});
            }
        } catch (err) {
            console.log(err);
        }
    }

    @Watch('$route')
    watchRoute(){        
        this.$store.commit("currCategory",  this.$route.name?.toLowerCase());
    }
    
}
</script>
<style>
@import "./assets/css/common.css";
#app {
    height: 100%;
}

.no-drag {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>
