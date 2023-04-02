<template>
    <img :src="userAvatar" class="user-avatar"/>
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