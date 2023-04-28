<template>
<ion-modal>
<ion-header>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button @click="$emit('close')">
          <ion-icon slot="icon-only" :icon="closeIcon"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding-bottom">
    <div>
      <ion-img class="card-image">
        <ion-skeleton-text :animated="true" />
      </ion-img>
    </div>
    <ion-card-content class="ion-margin-bottom">
      <PlaceModalToolBar />
      <ion-row class="place-data">
        <ion-col class="flex">
          <ion-icon :icon="accessibilityIcon"></ion-icon>
          <span>
            <ion-skeleton-text :animated="true" width="70px" />
          </span>
        </ion-col>
        <ion-col class="flex">
          <ion-icon :icon="businessIcon"></ion-icon>
          <span>
            <ion-skeleton-text :animated="true" width="70px" />
          </span>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <h1>
            <ion-skeleton-text :animated="true" width="80%" />
          </h1>
        </ion-col>
        <ion-col>
          <div class="posted-by">
            <ion-row>
              <ion-col>
                <p class="username">
                  <ion-skeleton-text :animated="true" width="70px" />
                </p>
                <p class="posted-at">
                  <ion-skeleton-text :animated="true" width="50px" />
                </p>
              </ion-col>
              <ion-col class="flex">
                <ion-thumbnail slot="start">
                  <ion-skeleton-text :animated="true"/>
                </ion-thumbnail>
              </ion-col>
            </ion-row>
          </div>
        </ion-col>
      </ion-row>
      <div class="description">
        <h2>
          <ion-skeleton-text :animated="true" width="100px" />
        </h2>
        <p>
          <ion-skeleton-text :animated="true" width="100%" />
          <ion-skeleton-text :animated="true" width="80%" />
          <ion-skeleton-text :animated="true" width="90%" />
          <ion-skeleton-text :animated="true" width="70%" />
        </p>
      </div>
      <div class="history">
        <h2>
          <ion-skeleton-text :animated="true" width="100px" />
        </h2>
        <p>
          <ion-skeleton-text :animated="true" width="100%" />
          <ion-skeleton-text :animated="true" width="80%" />
          <ion-skeleton-text :animated="true" width="90%" />
          <ion-skeleton-text :animated="true" width="70%" />
        </p>
      </div>
      <div class="keywords">
        <h2>
          <ion-skeleton-text :animated="true" width="100px" />
        </h2>
        <p>
          <ion-skeleton-text :animated="true" width="100%" />
          <ion-skeleton-text :animated="true" width="80%" />
        </p>
      </div>
      <div class="comments">
        <h2>
          <ion-skeleton-text :animated="true" width="100px" />
        </h2>
        <CommentInput/>
        <div>
          <p>
            <ion-skeleton-text :animated="true" width="70px" />
          </p>
        </div>
      </div>
    </ion-card-content>
  </ion-content>
</ion-modal>
</template>
<script lang="ts">
  import { IonModal, IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonButton, IonButtons, IonSkeletonText, IonThumbnail, IonCol, IonRow, IonImg } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { closeOutline, heartOutline, accessibilityOutline, businessOutline, key } from 'ionicons/icons';
  import PlaceModalToolBar from './PlaceModalToolBar.vue';
  import CommentPlace from './CommentPlace.vue';
  import UserAvatar from './UserAvatar.vue';
  import CommentInput from './CommentInput.vue';
  import 'swiper/css';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  
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
    PlaceModalToolBar,
    CommentPlace,
    UserAvatar,
    CommentInput,
    IonSkeletonText,
    IonThumbnail,
    IonCol,
    IonRow,
    IonImg,
    Swiper,
    SwiperSlide
},
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      presentingElement: null
    },
    data() {
      return {
        closeIcon: closeOutline,
        heartIcon: heartOutline,
        accessibilityIcon: accessibilityOutline,
        businessIcon: businessOutline,
      };
    },
  });
  </script>
  
  <style scoped>
  .username {
    font-weight: bold;
  }
  .posted-at {
    font-size: 0.8rem;
    color: #8c8c8c;
  }
  .posted-by p {
    text-align: end;
  }

  h1 {
    font-weight: bold;
    font-size: 40px;
  }

  h2 {
    font-weight: bold;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  
  .likes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .description {
    margin-top: 10px;
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .place-data {
    border-top: #8c8c8c solid 1px;
  }

  .place-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  ion-modal {
    --border-radius: 16px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  ion-modal::part(backdrop) {
    background: rgba(209, 213, 219);
    opacity: 1;
  }

  ion-modal ion-toolbar {
    --background: var(--ion-color-light);
    --color: var(--ion-color-primary);
  }
  </style>