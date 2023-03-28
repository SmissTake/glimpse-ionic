<template>
  <ion-page>
    <ion-header>
    <ion-toolbar>
      <ion-searchbar></ion-searchbar>
    </ion-toolbar>
    <ion-toolbar>
      <ion-segment value="home">
        <ion-segment-button value="home">
          <ion-icon :icon="sparklesIcon"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="heart">
          <ion-icon :icon="heartIcon"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="pin">
          <ion-icon :icon="albumsIcon"></ion-icon>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  </ion-header>
    <ion-content >
      <div class="example-content">
        <PlaceCard :place="places[0]" />
        <PlaceCard :place="places[1]" />
        <PlaceCard :place="places[2]" />
        <!-- ... -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PlaceCard from '@/components/PlaceCard.vue';
import { IonHeader, IonToolbar, IonSearchbar, IonPage, IonContent, IonIcon, IonSegment, IonSegmentButton } from '@ionic/vue';
import { sparkles, heartOutline, albumsOutline } from 'ionicons/icons';
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
    IonIcon,
    IonSegment,
    IonSegmentButton,
  },
  data() {
    return {
      sparklesIcon: sparkles,
      heartIcon: heartOutline,
      albumsIcon: albumsOutline,
      places: [
        {
          id: 0,
          title: 'Beach',
          category: 'Outdoor',
          imageUrl: 'https://via.placeholder.com/500x300',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
        {
          id: 1,
          title: 'Beach',
          category: 'Outdoor',
          imageUrl: 'https://via.placeholder.com/500x300',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
        {
          id: 2,
          title: 'Beach',
          category: 'Outdoor',
          imageUrl: 'https://via.placeholder.com/500x300',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
      ],
    };
  },
});
</script>