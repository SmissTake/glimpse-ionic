<template>
    <div class="glimpse-button" @click="toggleGlimpse">
      <ion-icon :icon="glimpsed ? eyeOutline : eyeOffOutline" :class="{ 'glimpsed': glimpsed }" />
      <div class="glimpse-label">{{ glimpsed ? 'Glimpsed' : 'Glimpse' }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
  import { usePlaceStore } from '@/stores';
  import { logout } from '@/utils/auth';

  const store = usePlaceStore();
  
  export default defineComponent({
    name: 'GlimpseButton',
    components: {
      IonIcon
    },
    props: {
      initialIsVisited: {
        type: Boolean,
        default: false,
      },
      placeId: {
        type: Number,
        required: true,
      },
      eyeOutline: {
        type: String,
        default: eyeOutline,
      },
      eyeOffOutline: {
        type: String,
        default: eyeOffOutline,
      },
    },
    setup(props) {
      const glimpsed = ref(props.initialIsVisited);
  
      const toggleGlimpse = () => {
        if (glimpsed.value) {
          glimpsePlace(props);
        }
        glimpsed.value = !glimpsed.value;
      };

      const glimpsePlace = (props:any) => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.VUE_APP_API_URL}/visit`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            placesId: parseInt(props.placeId)
          }),
        })
        .then((response) => {
          if (response.status === 401) {
            store.setFetchError("Vous devez être connecté");
            setTimeout(() => {
              store.setFetchError("");
            }, 3000);
            logout();
          }
          else {
            return response.json();
          }
        })
        .then((data) => {
          store.setSuccessMessage("Lieu Glimpsé !");
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
      };
      return {
        glimpsed,
        toggleGlimpse,
      };
    },
  });
  </script>

  <style scoped>  
  .glimpse-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .glimpse-label {
    font-size: 12px;
    margin-top: 3px;
  }
    </style>