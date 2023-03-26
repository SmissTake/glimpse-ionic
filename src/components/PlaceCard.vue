<template>
  <ion-card @click="cardClicked">
    <img :src="place.imageUrl" />
    <div class="cardInfos">
        <ion-card-header>
          <ion-card-title>{{ place.title }} - {{ place.category }}</ion-card-title>
          <div class="posted-by">
            Posted by {{ place.username }}
            <!-- <router-link :to="{ name: 'User', params: { userId: place.userId } }">{{ place.username }}</router-link> -->
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="likes">
            <ion-button fill="clear" size="small">
              <ion-icon :icon="heartIcon" />
            </ion-button>
            <span class="like-count">{{ place.likes }}</span>
          </div>
        </ion-card-content>
    </div>
  </ion-card>
  <PlaceModal :place="place" :is-open="showModal" @close="showModal = false" />
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { heartOutline } from 'ionicons/icons';
import PlaceModal from './PlaceModal.vue';

export default defineComponent({
    name: 'PlaceCard',
    components: {
        PlaceModal,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonIcon,
        IonButton,
    },
    props: {
        place: {
        type: Object,
        required: true,
        },
    },
    data() {
        return {
        heartIcon: heartOutline,
        showModal: false,
        };
    },
    methods: {
        cardClicked() {
            this.showModal = true;
            console.log('card clicked');
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
</style>
