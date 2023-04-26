<script setup lang="ts">
import type { Place } from '@/interfaces/place.interface';
import { usePlaceStore } from '@/stores';

const store = usePlaceStore();
const places: Place[] = store.places;
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="!store.fetchError">
        <PlaceCard v-for="place in places" :key="place.id" :place="place" />
    </ion-content>
    <ion-content v-else>
      <PlaceCardSkeleton v-for="n in 10" :key="n" />
      <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError = null"
    ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PlaceCard from '@/components/PlaceCard.vue';
import PlaceCardSkeleton from '@/components/skeletons/PlaceCardSkeleton.vue';
import { IonHeader, IonToolbar, IonSearchbar, IonPage, IonContent, IonToast } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlaceCard,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonPage,
    IonContent,
    IonToast,
  },
});
</script>