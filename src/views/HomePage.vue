<script setup lang="ts">
const handleRefresh = (event: CustomEvent) => {
  store.fetchPlaces().then(() => {
    event.detail.complete();
  });
  store.fetchCategories().then(() => {
    event.detail.complete();
  });
  const userId = parseInt(localStorage.getItem('userId') || '0');
  store.fetchUser(userId).then(() => {
    event.detail.complete();
  });
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-searchbar class="custom" animated="true" placeholder="Rechercher"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="!store.fetchError">
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-row class="popular-categories" v-if="categories">
          <h2>Categories les plus populaires</h2>
          <ion-row class="slider">
            <ion-col v-for="category in categories" :key="category.id" >
              <CategoryLink :category="category"/>
            </ion-col>
          </ion-row>
        </ion-row>

        <ion-row class="popular-categories">
          <h2>Lieux les plus populaires</h2>
          <ion-row class="slider">
          <ion-col size="10" v-for="place in mostLikedPlaces" :key="place.id">
            <PlaceCard :place="place" />
          </ion-col>
          </ion-row>
        </ion-row>

        <ion-row class="last-categories">
          <h2>Categories avec le plus de lieux</h2>
          <ion-row class="slider">
            <ion-col v-for="category in mostPlacesCategories" :key="category.id">
              <CategoryCard :category="category" :label="true"/>
            </ion-col>
          </ion-row>
        </ion-row>

        <ion-row class="recent-places">
          <h2>Lieux les plus recents</h2>
          <ion-row class="slider">
            <ion-col size="10" v-for="place in mostRecentPlaces" :key="place.id">
              <PlaceCard :place="place" />
            </ion-col>
          </ion-row>
        </ion-row>

        <ion-button expand="full" color="primary" fill="solid">
          <ion-icon :icon="earth" slot="start"></ion-icon>
          Fais-moi rêver !
        </ion-button>
    </ion-content>
    <ion-content v-else>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <PlaceCardSkeleton v-for="n in 10" :key="n" />
      <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError == null"
    ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PlaceCard from '@/components/PlaceCard.vue';
import CategoryLink from '@/components/CategoryLink.vue';
import PlaceCardSkeleton from '@/components/skeletons/PlaceCardSkeleton.vue';
import { IonHeader, IonToolbar, IonSearchbar, IonPage, IonContent, IonToast, IonRefresher, IonRefresherContent, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { earth } from 'ionicons/icons';
import { usePlaceStore } from '@/stores';
import { Place } from '@/interfaces/place.interface';
import { Category } from '@/interfaces/category.interface';
import CategoryCard from '@/components/CategoryCard.vue';

const store = usePlaceStore();

export default defineComponent({
  name: 'HomePage',
  components: {
    PlaceCard,
    CategoryLink,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonPage,
    IonContent,
    IonToast,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonCol,
    IonButton,
    CategoryCard
},
  data() {
    return {
      earth,
    };
  },
  computed: {
    mostLikedPlaces() {
      //slice() to create a copy of the stored data to prevent mutation and so vue warn message (maximum recursive updates exceeded)
      return store.places.slice().sort((a: Place, b: Place) => {
        const aFavoriteUsersLength = (a.FavoriteUsers as string[] | undefined)?.length ?? 0;
        const bFavoriteUsersLength = (b.FavoriteUsers as string[] | undefined)?.length ?? 0;
        return bFavoriteUsersLength - aFavoriteUsersLength;
      });
    },
    mostPlacesCategories() {
      return store.categories.sort((a: Category, b: Category) => {
        return b.numberPlaces - a.numberPlaces;
      });
    },
    mostRecentPlaces() {
      return store.places.slice().sort((a: Place, b: Place) => {
        //created_at is a date so we cant compare it directly
        const aDate = new Date(a.created_at as string);
        const bDate = new Date(b.created_at as string);
        return bDate.getTime() - aDate.getTime();
      });
    },
    categories() {
      return store.categories;
    },
  }
});
</script>

<style scoped>
ion-toolbar {
  border-radius: 0 0 0.5em 0.5em;
}
ion-header {
  background : none;
}

ion-searchbar.ios.custom {
  --color: #fff;
  --placeholder-color: #fff;
  --icon-color: #fff;
  --clear-button-color: #fff;
}
ion-searchbar.md.custom {
  --background: var(--ion-color-primary);
  --border-radius: 0.5em;
  --placeholder-color: #fff;
  --icon-color: #fff;
  --color: #fff;
  --clear-button-color: #fff;
  --box-shadow: none;
}
</style>