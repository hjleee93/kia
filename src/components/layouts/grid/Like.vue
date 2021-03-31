<template>
  <button @click="likeToggle" :class="{active:isActive, motion: isActive }" class="btn btn-like" ></button>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Like extends Vue{

    private isActive: boolean = false;

    likeToggle(){
        this.isActive = !this.isActive;       
    }
}
</script>

<style>

</style>