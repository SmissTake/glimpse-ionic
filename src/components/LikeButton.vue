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
  import { usePlaceStore } from '@/stores';

  const store = usePlaceStore();
  
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
      placeId: {
        type: Number,
        required: true,
      }
    },
    setup(props) {
      const likeCount = ref(props.initialLikeCount);
      const isLiked = ref(props.initialIsLiked);
  
      const toggleLike = () => {
        if (isLiked.value) {
          likeCount.value--;
          unlikePlace(props);
        } else {
          likeCount.value++;
          likePlace(props);
        }
        isLiked.value = !isLiked.value;
      };

      const likePlace = (props:any) => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.VUE_APP_API_URL}/favorite`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({placesId: parseInt(props.placeId)})
        })
        .then((response) => response.json())
        .then((data) => {
          store.setSuccessMessage("Lieu ajouté aux favoris");
          console.log('Success: ', data);
          setTimeout(() => {
            store.setSuccessMessage("");
          }, 4000);
        })
        .catch((error) => {
          store.setFetchError("Une erreur est survenue");
          console.error('Error:', error);
          setTimeout(() => {
            store.setSuccessMessage("");
          }, 4000);
        })
      }

      const unlikePlace = (props:any) => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.VUE_APP_API_URL}/unfavorite`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({placesId: parseInt(props.placeId)})
        })
        .then((response) => response.json())
        .then((data) => {
          store.setSuccessMessage("Lieu supprimé des favoris");
          console.log('Success: ', data);
          setTimeout(() => {
            store.setSuccessMessage("");
          }, 4000);
        })
        .catch((error) => {
          store.setFetchError("Une erreur est survenue");
          console.error('Error:', error);
          setTimeout(() => {
            store.setSuccessMessage("");
          }, 4000);
        })
      }
  
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