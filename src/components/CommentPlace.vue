<template>
    <ion-grid>
        <ion-row>
            <ion-col size="auto">
                <UserAvatar v-if="CommentPlace.postedBy.avatar" :userAvatar="imageSource+'/'+CommentPlace.postedBy.avatar" />
                <UserAvatar v-else userAvatar="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" />
            </ion-col>
            <ion-col>
                <p class="username" @click="$emit('username-clicked')">
                    <router-link :to="{ name: 'user', params: { id: CommentPlace.postedBy.id } }">{{ CommentPlace.postedBy.pseudonym }}</router-link>
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
    import UserAvatar from './UserAvatar.vue';

    export default defineComponent({
        components: { IonCol, IonRow, IonGrid, UserAvatar },
        props: {
            CommentPlace: {
                type: Object as () => CommentPlace,
                required: true,
            },
        },
        data() {
            return {
                imageSource: `${process.env.VUE_APP_API_URL}`,
            };
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