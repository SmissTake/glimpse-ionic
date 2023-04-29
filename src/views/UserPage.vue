<script setup lang="ts">
import type { User } from '@/interfaces/user.interface';
import { usePlaceStore } from '@/stores';
import { RouteLocationNormalized, useRoute } from 'vue-router';

const route: RouteLocationNormalized = useRoute();

const store = usePlaceStore();
// Get the user id from the route or if not found, use the connected user id
const userId = parseInt(route.params.id) || parseInt(`${process.env.VUE_APP_USER_ID}`);
const user: User = store.getUser(userId);
</script>

<template>
  <ion-page>
    <ion-content v-if="!store.fetchError && user">
      <div class="header">
      <ion-row class="banner ion-justify-content-end" >
        <ion-col size="2">
          <ion-button size="small" v-if="user.id == connectedUserId">
            <ion-icon :icon="settingsIcon"></ion-icon>
          </ion-button>
          <ion-button size="small" color="danger" v-else>
            <ion-icon :icon="flagIcon"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <ion-avatar class="user-avatar">
          <ion-img v-if="user.avatar" :src="imageSource+'/'+user.avatar"/>
          <ion-img v-else src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        </ion-avatar>
      </ion-row>
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-text>
          <h1>{{ user.pseudonym }}</h1>
        </ion-text>
        <!-- if connected user is the user page, don't display the follow button -->
        <ion-button v-if="user.id !== connectedUserId" color="primary" size="small" fill="outline">
          <ion-icon :icon="addOutline"></ion-icon>
          Suivre
        </ion-button>
      </ion-row>
      <ion-row>
        <ion-col>
          <span v-if="user.Followings">{{ user.Followings.length }}</span>
          <span v-else>0</span>
          abonné(s)
        </ion-col>
        <ion-col>
          <span v-if="user.FavoritePlaces">{{ user.FavoritePlaces.length }}</span>
          <span v-else>0</span>
          <p>like(s)</p>
        </ion-col>
        <ion-col>
          <span v-if="user.posted">{{ user.posted.length }}</span>
          <span v-else>0</span>
          <p>publication(s)</p>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text>
            <p class="biography">{{ user.biography }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center" v-if="user.id == connectedUserId">
        <ion-button color="primary" expand="block" href="/add">
          <ion-icon :icon="addOutline"></ion-icon>
          Publier une nouvelle experience
        </ion-button>
      </ion-row>
    </div>
    <div class="body">
      <ion-row v-if="user.posted.length">
        <h2>Publié</h2>
        <swiper
        :freemode="true"
        :modules="modules">
        <swiper-slide v-for="place in user.posted" :key="place.id">
          <PlaceCard :place="place" />
        </swiper-slide>
        </swiper>
      </ion-row>
      <ion-row v-if="user.Visited.length">
        <h2>Lieux visités</h2>
        <swiper
        :freemode="true"
        :modules="modules">
        <swiper-slide v-for="place in user.Visited" :key="place.id">
          <PlaceCard :place="place" />
        </swiper-slide>
        </swiper>
      </ion-row>
      <ion-row v-if="user.FavoritePlaces.length">
        <h2>Lieux favoris</h2>
        <swiper
        :freemode="true"
        :modules="modules">
        <swiper-slide v-for="place in user.FavoritePlaces" :key="place.id">
          <PlaceCard :place="place" />
        </swiper-slide>
        </swiper>
      </ion-row>
    </div>
    </ion-content>
    <ion-content v-else>
      <UserViewSkeleton />
      <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError = null"
    ></ion-toast>
    </ion-content>
    <ion-toast
      :message="store.successMessage"
      position="bottom"
      color="success"
      :duration="4000"
      @ionToastDidDismiss="store.successMessage = null"
      v-if="store.successMessage"
    ></ion-toast>
  </ion-page>
</template>

<style scoped>
</style>

<script lang="ts">
  import { IonContent, IonPage, IonRow, IonCol, IonText, IonAvatar, IonImg, IonButton, IonIcon, IonToast } from '@ionic/vue';
  import { flagOutline, settingsOutline, addOutline, checkmark } from 'ionicons/icons';
  import PlaceCard from '@/components/PlaceCard.vue';
  import UserViewSkeleton from '@/components/skeletons/UserViewSkeleton.vue';
  import { Swiper,SwiperSlide } from 'swiper/vue';
  import { FreeMode } from 'swiper';
  import 'swiper/css';

  import 'swiper/css/free-mode';

  export default {
    components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonText,
    IonAvatar,
    IonImg,
    Swiper,
    SwiperSlide,
    IonButton,
    IonToast
  },

    data() {
      return {
        imageSource : process.env.VUE_APP_API_URL,
        flagIcon: flagOutline,
        settingsIcon: settingsOutline,
        addOutline: addOutline,
        checkmarkIcon: checkmark,
        modules: [FreeMode],
        connectedUserId: parseInt(`${process.env.VUE_APP_USER_ID}`),
      };
    },

  };
  
</script>

<style scoped>
  .banner {
    background-color:rgb(44, 44, 44);
    background-size: cover;
    height: 100px;
  }
  .user-avatar {
    width: 150px;
    height: 150px;
    margin-top: -75px;
  }

  .biography {
    text-align: center;
  }
</style>