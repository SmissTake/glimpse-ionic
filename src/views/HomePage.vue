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
  name: 'MyComponent',
  components: {
    PlaceCard,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonPage,
    IonContent,
  },
  data() {
    return {
      places: [
        {
          id: 0,
          title: 'Fonderie Abandonnée',
          category: 'Industriel',
          imageUrl: 'https://i.pinimg.com/564x/3f/06/5d/3f065dffd939e56ef443dafd3fa08f38.jpg',
          userId: 1,
          username: 'User2',
          likes: 10,
        },
        {
          id: 1,
          title: 'Cimetière de bateaux',
          category: 'Autre',
          imageUrl: 'https://i.pinimg.com/564x/6a/9f/4e/6a9f4e68a7e7684ed34c026645b8b1fb.jpg',
          userId: 1,
          username: 'User1',
          likes: 10,
        },
        {
          id: 2,
          title: 'Fonderie Abandonnée',
          category: 'Outdoor',
          imageUrl: 'https://i.pinimg.com/564x/4f/3a/b2/4f3ab22726426ffa115152af04de4f02.jpg',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
      ],
    };
  },
});
</script>