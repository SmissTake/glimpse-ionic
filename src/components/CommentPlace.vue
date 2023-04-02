<template>
    <ion-grid>
        <ion-row>
            <ion-col size="auto">
                <UserAvatar :userAvatar="comment.userAvatar" />
            </ion-col>
            <ion-col>
                <p class="username">
                    {{ comment.username }}
                </p>
                <p class="comment">
                    {{ comment.comment }}
                </p>
            </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-end">
            <ion-col v-for="image in comment.images" :key="image"  size="2">
                <img :src="image" class="comment-image"/>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
    import { IonCol, IonRow, IonGrid } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import UserAvatar from './UserAvatar.vue';

    export default defineComponent({
        components: { IonCol, IonRow, IonGrid, UserAvatar },
        props: {
            comment: {
                type: Object as () => Comment,
                required: true,
            },
        },
    });
</script>

<style scoped>
    .username {
        font-weight: bold;
    }
    .comment {
        margin-top: 0;
    }
    .comment-image {
        width: auto;
        height: 50px;
        object-fit: cover;
    }
</style>