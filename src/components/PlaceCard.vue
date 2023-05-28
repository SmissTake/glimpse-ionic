<template>
  <ion-card v-if="place" @click="clickOverlay">
    <ion-img v-if="place.PicturePlaces[0]" :src="imageSource+'/'+place.PicturePlaces[0].url" class="card-image"/>
    <ion-card-content :class="{ show: showOverlay }">
      <ion-row class="toolbar">
        <ion-col size="auto">
          <CategoryLink class="category" :category="place.Category" :style="'simple'" :label="false" :size="'small'"/>
        </ion-col>
        <ion-col size="auto">
          <LikeButton class="like-button" :placeId="place.id" :initialIsLiked="isFavorited(place.id)" :size="'large'"></LikeButton>
        </ion-col>
      </ion-row>
      <ion-row class="titles" @click="cardClicked">
        <ion-card-title>{{ place.title }}</ion-card-title>
        <ion-card-subtitle>{{ place.town }}</ion-card-subtitle>
      </ion-row>
      <ion-button @click="cardClicked" fill="clear" >
        <ion-icon :icon="chevronUpOutline"/>
      </ion-button>
    </ion-card-content>
  </ion-card>
  <PlaceModal v-if="place" :placeId="place.id" :placeCardInfo="place" :is-open="showModal" @close="showModal = false"/>

  <place-card-skeleton v-else>
  </place-card-skeleton>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonImg, IonCol, IonRow, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronUpOutline } from 'ionicons/icons';
import PlaceModal from './PlaceModal.vue';
import PlaceCardSkeleton from './skeletons/PlaceCardSkeleton.vue';
import LikeButton from './LikeButton.vue';
import CategoryLink from './CategoryLink.vue';
import { usePlaceStore } from '@/stores';

const store = usePlaceStore();

export default defineComponent({
    name: 'PlaceCard',
    components: {
    PlaceModal,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonImg,
    PlaceCardSkeleton,
    LikeButton,
    CategoryLink,
    IonCol,
    IonRow,
    IonButton,
    IonIcon,
},
    props: {
        place: {
          type: Object,
          required: true,
        },
        loadedSkeleton: {
            type: Boolean,
            required: false,
        },
    },
    data() {
        return {
          chevronUpOutline,
          showModal: false,
          imageSource : process.env.VUE_APP_API_URL,
          showOverlay: false,
        };
    },
    computed: {
      likeCount() {
        if(this.place.FavoriteUsers) {
          return this.place.FavoriteUsers.length;
        }
        else {
          return 0;
        }
      }
    },
    methods: {
        cardClicked() {
            this.showModal = true;
        },
        clickOverlay(event: Event) {
            event.stopPropagation();

            const target = event.target as HTMLElement;
            if (target.closest('.like-button') || target.closest('ion-button')) {
              return;
            }
            this.showOverlay = !this.showOverlay;
        },
        isFavorited(placeId: number) {
        const connectedUser = store.getUser(Number(localStorage.userId));
        if(connectedUser?.FavoritePlaces?.find(place => place.id === placeId)){
          return true;
        }
        else {
          return false;
        }
      },
    },
});
</script>

<style scoped>

ion-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  transition: all 0.1s ease-in-out;
}

.show {
  opacity: 1;
  visibility: visible;
  transition: all 0.1s ease-in-out;
}

.card-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

ion-card-title {
  font: var(--ion-title-small);
  color: var(--ion-color-light);
  text-align: center;
}
ion-card-subtitle {
  color: var(--ion-color-light);
}

ion-card {
  border-radius: 0.5rem;
  margin-inline: 0;
}

.toolbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.titles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ion-icon {
  color: white;
}
</style>
