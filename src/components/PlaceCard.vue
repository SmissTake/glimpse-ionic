<template>
  <ion-card>
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
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { heartOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'PlaceCard',
  components: {
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
        };
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
