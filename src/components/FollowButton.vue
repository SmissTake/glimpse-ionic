<template>
    <div v-if="!isFollowed">
      <ion-button @click="follow">
        Suivre
      </ion-button>
    </div>
    <div v-else :class="'follow-button'" @click="unfollow">
      <ion-button>
        Suivi
        <ion-icon :icon="checkmarkOutline"></ion-icon>
      </ion-button>
      <ion-button>
        <ion-icon :icon="sendOutline"></ion-icon>
      </ion-button>
    </div>
  </template>
  
  <script lang="ts">
  import { IonIcon, IonButton } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { sendOutline, checkmarkOutline } from 'ionicons/icons';
  import { usePlaceStore } from '@/stores';
  import { logout } from '@/utils/auth';

  const store = usePlaceStore();
  
  export default defineComponent({
    name: 'FollowButton',
    components: { IonIcon, IonButton },
    props: {
      initialIsFollowed: {
        type: Boolean,
        default: false,
      },
      sendOutline : {
        type: String,
        default: '',
      },
      checkmarkOutline : {
        type: String,
        default: '',
      },
      userId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const isFollowed = ref(props.initialIsFollowed);

      const follow = () => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.VUE_APP_API_URL}/follow`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({followingId: props.userId})
        })
        .then((response) => {
          if (response.status === 401) {
            store.setFetchError("Vous devez être connecté");
            setTimeout(() => {
              store.setFetchError("");
            }, 4000);
            logout();
          }
          else {
            return response.json();
          }
        })
        .then((data) => {
          store.setSuccessMessage("Vous êtes abonné !");
          isFollowed.value = true;
          console.log(data);
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

      const unfollow = () => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.VUE_APP_API_URL}/unfollow`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({followingId: props.userId})
        })
        .then((response) => {
          if (response.status === 401) {
            store.setFetchError("Vous devez être connecté");
            setTimeout(() => {
              store.setFetchError("");
            }, 4000);
            logout();
          }
          else {
            return response.json();
          }
        })
        .then((data) => {
          store.setSuccessMessage("Vous n'êtes plus abonné");
          isFollowed.value = false;
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
        isFollowed,
        follow,
        unfollow,
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

  .large ion-icon {
    color : #fff;
  }
  </style>