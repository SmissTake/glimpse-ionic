<template>
    <ion-grid>
        <ion-row>
            <ion-col size="auto">
                <!-- <UserAvatar :userAvatar="CommentPlace.User.avatar" /> -->
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" class="user-avatar"/>
            </ion-col>
            <ion-col>
                <p class="username">
                    <!-- {{ CommentPlace.User.pseudonym }} -->
                    UserComment
                </p>
                <p class="comment">
                    {{ CommentPlace.comment }}
                </p>
            </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-end">
            <ion-col v-for="(image, index) in CommentPlace.PictureComments" :key="index"  size="2">
                <img :src="image.url" class="comment-image"/>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
    import { IonCol, IonRow, IonGrid } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { CommentPlace } from '@/interfaces/comment.interface';
    // import UserAvatar from './UserAvatar.vue';

    export default defineComponent({
        components: { IonCol, IonRow, IonGrid },
        props: {
            CommentPlace: {
                type: Object as () => CommentPlace,
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