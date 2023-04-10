<template>
    <img v-if="userAvatar" :src="userAvatar" class="user-avatar"/>
    <img v-else src="https://picsum.photos/640/360" class="user-avatar"/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            userAvatar: {
                type: String,
                required: true,
            },
        },
    });
</script>

<style scoped>
    .user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>