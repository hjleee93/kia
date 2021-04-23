<template>
    <button
        @click="likeToggle"
        :class="{ active: isActive, motion: isActive }"
        class="btn btn-like"
    ></button>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Like extends Vue {
    @Prop() toot!: any;
    private isActive: boolean = false;
    
    async mounted() {
        if (this.toot.favourited === true) {
            this.isActive = true;
        }
    }

    async likeToggle() {
        if (this.isActive === true) {
            try {
                this.isActive = !this.isActive;
                const result = await this.$api.sendUnfavourite(this.toot.id);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                this.isActive = !this.isActive;
                const result = await this.$api.sendFavourite(
                    this.toot.id
                );
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>
</style>