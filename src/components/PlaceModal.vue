<template>
    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button @click="$emit('close')">
              <ion-icon slot="icon-only" :icon="closeIcon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <img :src="place.imageUrl" />
        <ion-card-content>
          <PlaceModalToolBar />
          <div class="posted-by">
            Posted by {{ place.username }}
          </div>
          <div class="description">
            {{ place.description }}
          </div>
        </ion-card-content>
      </ion-content>
    </ion-modal>
  </template>
  
  <script lang="ts">
  import { IonModal, IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonButton, IonButtons } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { closeOutline, heartOutline } from 'ionicons/icons';
  import PlaceModalToolBar from './PlaceModalToolBar.vue';
  
  export default defineComponent({
    name: 'PlaceModal',
    components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCardContent,
    IonIcon,
    IonButton,
    IonButtons,
    PlaceModalToolBar
},
    props: {
      place: {
        type: Object,
        required: true,
      },
      isOpen: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        closeIcon: closeOutline,
        heartIcon: heartOutline,
      };
    },
  });
  </script>
  
  <style scoped>
  .posted-by {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .likes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .description {
    margin-top: 10px;
  }
  </style>
  