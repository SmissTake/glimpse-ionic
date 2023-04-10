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
    <ion-content >
        <PlaceCard v-for="place in places" :key="place.id" :place="place" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PlaceCard from '@/components/PlaceCard.vue';
import { IonHeader, IonToolbar, IonSearchbar, IonPage, IonContent } from '@ionic/vue';
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
  },
});
</script>