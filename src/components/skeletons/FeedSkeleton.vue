<template>
  <div class="body">
    <div>
      <h2>
        <ion-skeleton-text
          :animated="true"
          style="width: 60%; height: 2em"
        ></ion-skeleton-text>
      </h2>
      <ion-row class="slider">
        <ion-col size="10" v-for="n in 5" :key="n">
          <PlaceCardSkeleton />
        </ion-col>
      </ion-row>
    </div>
    <div>
      <h2>
        <ion-skeleton-text
          :animated="true"
          style="width: 75%; height: 2em"
        ></ion-skeleton-text>
      </h2>
      <ion-row class="slider">
        <ion-col size="10" v-for="n in 5" :key="n">
          <PlaceCardSkeleton />
        </ion-col>
      </ion-row>
    </div>
    <div>
      <h2>
        <ion-skeleton-text
          :animated="true"
          style="width: 50%; height: 2em"
        ></ion-skeleton-text>
      </h2>
      <ion-row class="slider">
        <ion-col size="10" v-for="n in 5" :key="n">
          <PlaceCardSkeleton />
        </ion-col>
      </ion-row>
    </div>
  </div>
</template>

<script lang="ts">
import { IonRow, IonCol, IonSkeletonText } from '@ionic/vue';
import PlaceCardSkeleton from '@/components/skeletons/PlaceCardSkeleton.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'FeedSkeleton',
  components: {
    IonRow,
    IonCol,
    IonSkeletonText,
    PlaceCardSkeleton
  },
});
</script>

<style scoped>
ion-card {
  border-radius: 16px;
  width: 100%;
  height: 300px;
  margin-inline: 0;
}
h2 {
  font: var(--ion-title-small);
  margin-top: 2em;
  margin-bottom: 0.5em;
  padding-left: 0;
  width: 100%;
  margin-left: 20px;
}
</style>
