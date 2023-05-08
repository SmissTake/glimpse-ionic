<template>
  <ion-card @click="cardClicked" v-if="place">
    <ion-img v-if="place.PicturePlaces[0]" :src="imageSource+'/'+place.PicturePlaces[0].url" class="card-image"/>
    
    <ion-img v-else src="https://picsum.photos/640/360" class="card-image"/>
    <div class="cardInfos">
        <ion-card-header>
          <ion-card-title>{{ place.title }} - {{ place.Category.label }}</ion-card-title>
          <div class="posted-by" v-if="place.postedBy">
            Posted by {{ place.postedBy.pseudonym }}
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="likes">
            <LikeButton :placeId="place.id" />
            <span class="like-count">{{ place.likes }}</span>
          </div>
        </ion-card-content>
    </div>
  </ion-card>
  <PlaceModal v-if="place" :placeId="place.id" :placeCardInfo="place" :is-open="showModal" @close="showModal = false"/>

  <place-card-skeleton v-else>
  </place-card-skeleton>
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import { heartOutline } from 'ionicons/icons';
import PlaceModal from './PlaceModal.vue';
import LikeButton from './LikeButton.vue';
import PlaceCardSkeleton from './skeletons/PlaceCardSkeleton.vue';

export default defineComponent({
    name: 'PlaceCard',
    components: {
    PlaceModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    LikeButton,
    PlaceCardSkeleton,
},
    props: {
        place: {
        type: Object,
        required: false,
        },
        loadedSkeleton: {
            type: Boolean,
            required: false,
        },
    },
    data() {
        return {
        heartIcon: heartOutline,
        showModal: false,
        imageSource : process.env.VUE_APP_API_URL,
        };
    },
    methods: {
        cardClicked() {
            this.showModal = true;
        },
    },
});
</script>

<style scoped>

.cardInfos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.posted-by {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.posted-by router-link {
  margin-left: 5px;
}

.likes {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

ion-card-title {
  font: var(--ion-title-small);
}

ion-card {
  max-width: 400px;
}
</style>
