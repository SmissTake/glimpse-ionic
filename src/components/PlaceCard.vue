<template>
  <ion-card @click="cardClicked" v-if="place">
    <ion-img v-if="place.PicturePlaces[0]" :src="imageSource+'/'+place.PicturePlaces[0].url" class="card-image"/>
    
    <ion-img v-else src="https://picsum.photos/640/360" class="card-image"/>
    <div class="cardInfos">
        <ion-card-header>
          <ion-card-title>{{ place.title }} - {{ place.Category.label }}</ion-card-title>
          <div class="posted-by">
            Posted by {{ place.postedBy.pseudonym }}
            <!-- <router-link :to="{ name: 'User', params: { userId: place.userId } }">{{ place.username }}</router-link> -->
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

  <ion-card v-else>
    <ion-skeleton-text animated style="width: 100%; height: 200px;"></ion-skeleton-text>
    <ion-card-header>
      <ion-card-title>
        <ion-skeleton-text animated style="width: 100%; height: 20px;"></ion-skeleton-text>
      </ion-card-title>
      <div class="posted-by">
        <ion-skeleton-text animated style="width: 100%; height: 20px;"></ion-skeleton-text>
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
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSkeletonText, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import { heartOutline } from 'ionicons/icons';
import PlaceModal from './PlaceModal.vue';
import LikeButton from './LikeButton.vue';

export default defineComponent({
    name: 'PlaceCard',
    components: {
    PlaceModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSkeletonText,
    IonImg,
    LikeButton
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
</style>
