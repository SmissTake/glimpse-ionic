<template>
    <ion-page>
      <ion-content>
        <div class="header">
        <ion-row class="banner ion-justify-content-end" >
          <ion-col size="2">
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-avatar class="user-avatar">
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
          </ion-avatar>
        </ion-row>
        <ion-row class="ion-justify-content-center ion-align-items-center">
          <h1 style="width: 100%;">
              <ion-skeleton-text animated style="width: 50%; height: 2em; margin: auto;"></ion-skeleton-text>
          </h1>
        </ion-row>
        <ion-row>
          <ion-col style="margin-left: 1em;">
            <span>
                <ion-skeleton-text animated style="width: 80%; height: 2em;"></ion-skeleton-text>
            </span>
          </ion-col>
          <ion-col>
            <span>
                <ion-skeleton-text animated style="width: 80%; height: 2em;"></ion-skeleton-text>
            </span>
          </ion-col>
          <ion-col>
            <span>
                <ion-skeleton-text animated style="width: 80%; height: 2em;"></ion-skeleton-text>
            </span>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text>
              <p class="biography">
                <ion-skeleton-text :animated="true" style="width: 60%; height: 1em;" />
                <ion-skeleton-text :animated="true" style="width: 40%; height: 1em;" />
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </div>
      <FeedSkeleton />
      </ion-content>
    </ion-page>
  </template>

<script lang="ts">
import { IonContent, IonPage, IonRow, IonCol, IonAvatar, IonSkeletonText, IonText } from '@ionic/vue';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'UserViewSkeleton',
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonAvatar,
    IonSkeletonText,
    IonText,
    FeedSkeleton
  },
});
</script>

<style scoped>
ion-card {
  border-radius: 16px;
  margin-inline: 0;
}
h1 {
  font: var(--ion-title-medium);
}
h2 {
  font: var(--ion-title-small);
  margin-top: 2em;
  margin-bottom: 0.5em;
  padding-left: 0;
  width: 100%;
  margin-left: 20px;
}
.biography {
  display: flex;
  flex-direction: column;
  align-items: center;
  }
</style>