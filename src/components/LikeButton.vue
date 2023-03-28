<template>
    <div class="like-button" @click="toggleLike">
      <ion-icon :icon="isLiked ? filledIcon : outlineIcon" />
      <span class="like-count">{{ likeCount }}</span>
    </div>
  </template>
  
  <script lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { heartOutline, heart } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'LikeButton',
    components: { IonIcon },
    props: {
      initialLikeCount: {
        type: Number,
        default: 0,
      },
      initialIsLiked: {
        type: Boolean,
        default: false,
      },
      filledIcon: {
        type: String,
        default: heart,
      },
      outlineIcon: {
        type: String,
        default: heartOutline,
      },
    },
    setup(props) {
      const likeCount = ref(props.initialLikeCount);
      const isLiked = ref(props.initialIsLiked);
  
      const toggleLike = () => {
        if (isLiked.value) {
          likeCount.value--;
        } else {
          likeCount.value++;
        }
        isLiked.value = !isLiked.value;
      };
  
      return {
        likeCount,
        isLiked,
        toggleLike,
      };
    },
  });
  </script>
  
  <style scoped>
  .like-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .like-button .like-count {
    font-size: 12px;
    margin-top: 3px;
  }
  </style>