<template>
    <ion-card>
      <ion-skeleton-text animated style="width: 100%; height: 200px;"></ion-skeleton-text>
      <div class="cardInfos">
        <ion-card-header>
            <ion-card-title>
                <ion-skeleton-text animated style="width: 100%; height: 20px;"></ion-skeleton-text>
            </ion-card-title>
            <div class="posted-by">
                <ion-skeleton-text animated style="width: 80%; height: 20px;"></ion-skeleton-text>
            </div>
        </ion-card-header>
        <ion-card-content>
            <div class="likes">
                <ion-button fill="clear" size="small">
                    <ion-skeleton-text animated style="width: 20px; height: 20px;"></ion-skeleton-text>
                </ion-button>
                <span class="like-count">
                    <ion-skeleton-text animated style="width: 30px; height: 20px;"></ion-skeleton-text>
                </span>
            </div>
        </ion-card-content>
      </div>
    </ion-card>
  </template>
  
  <script lang="ts">
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSkeletonText, IonImg } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { heartOutline } from 'ionicons/icons';
  
  export default defineComponent({
      name: 'PlaceCardSkeleton',
      components: {
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonSkeletonText,
  },
  });
  </script>
  
  <style scoped>
  
  .cardInfos {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .likes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ion-card-header {
    width: 100%;
  }
  </style>