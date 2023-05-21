<script setup lang="ts">
import { RouteLocationNormalized, useRoute } from 'vue-router';
import { computed } from 'vue';


const route: RouteLocationNormalized = useRoute();
// Get the user id from the route or if not found, use the connected user id
const userId = parseInt(route.params.id) || parseInt(localStorage.getItem('userId') || '0');
const user = computed(() => {
  return store.getUser(userId);
});

const handleRefresh = (event: CustomEvent) => {
  store.fetchUser(userId).then(() => {
    event.detail.complete();
  });
};
</script>

<template>
  <ion-page>
    <ion-content v-if="!store.fetchError && user">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="header">
      <ion-row class="ion-justify-content-end dark banner" >
        <ion-col size="2">
          <ion-button size="small" v-if="user.id == connectedUserId">
            <ion-icon :icon="settingsIcon"></ion-icon>
          </ion-button>
          <ion-button size="small" color="danger" v-else>
            <ion-icon :icon="flagIcon"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center dark">
        <ion-avatar class="user-avatar">
          <ion-img v-if="user.avatar" :src="imageSource+'/'+user.avatar"/>
          <ion-img v-else src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        </ion-avatar>
      </ion-row>
      <ion-row class="ion-justify-content-center ion-align-items-center dark">
        <ion-text>
          <h1>{{ user.pseudonym }}</h1>
        </ion-text>
        <FollowButton v-if="user.id !== connectedUserId" :initialIsFollowed="isFollowed(userId)" :userId="user.id"/>
      </ion-row>
      <ion-row class="ion-justify-content-center row-data">
        <ion-col class="data" size="auto">
          <span v-if="user.Followers">{{ user.Followers.length }}</span>
          <span v-else>0</span>
          <p>glimpsers</p>
        </ion-col>
        <ion-col class="data" size="auto">
          <span v-if="user.FavoritePlaces">{{ user.FavoritePlaces.length }}</span>
          <span v-else>0</span>
          <p>likes</p>
        </ion-col>
        <ion-col class="data" size="auto">
          <span v-if="user.posted">{{ user.posted.length }}</span>
          <span v-else>0</span>
          <p>publications</p>
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
      <hr>
    </div>
    <div class="body">
      <ion-row v-if="user.posted?.length" class="section">
        <h2>Publié</h2>
        <ion-row class="slider">
        <ion-col size="10" v-for="place in user.posted" :key="place.id">
          <PlaceCard :place="place" />
        </ion-col>
        </ion-row>
      </ion-row>
      <ion-row v-if="user.Visited?.length" class="section">
        <h2>Lieux visités</h2>
        <ion-row class="slider">
        <ion-col size="10" v-for="place in user.Visited" :key="place.id">
          <PlaceCard :place="place" />
        </ion-col>
        </ion-row>
      </ion-row>
      <ion-row v-if="user.FavoritePlaces?.length" class="section">
        <h2>Lieux favoris</h2>
        <ion-row class="slider">
        <ion-col size="10" v-for="place in user.FavoritePlaces" :key="place.id">
          <PlaceCard :place="place" />
        </ion-col>
        </ion-row>
      </ion-row>
    </div>
    </ion-content>
    <ion-content v-else>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <UserViewSkeleton />
      <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError = ''"
      v-if="store.fetchError"
    ></ion-toast>
    </ion-content>
    <ion-toast
      :message="store.successMessage"
      position="bottom"
      color="success"
      :duration="4000"
      @ionToastDidDismiss="store.successMessage = ''"
      v-if="store.successMessage"
    ></ion-toast>
  </ion-page>
</template>

<style scoped>
</style>

<script lang="ts">
  import { IonContent, IonPage, IonRow, IonCol, IonText, IonAvatar, IonImg, IonButton, IonIcon, IonToast, IonRefresher, IonRefresherContent } from '@ionic/vue';
  import { flagOutline, settingsOutline, addOutline, checkmark } from 'ionicons/icons';
  import PlaceCard from '@/components/PlaceCard.vue';
  import UserViewSkeleton from '@/components/skeletons/UserViewSkeleton.vue';
  import FollowButton from '@/components/FollowButton.vue';
  import { usePlaceStore } from '@/stores';
  
  const store = usePlaceStore();

  export default {
    components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonText,
    IonAvatar,
    IonImg,
    IonButton,
    IonToast,
    IonRefresher,
    IonRefresherContent,
    FollowButton
},

    data() {
      return {
        imageSource : process.env.VUE_APP_API_URL,
        flagIcon: flagOutline,
        settingsIcon: settingsOutline,
        addOutline: addOutline,
        checkmarkIcon: checkmark,
        connectedUserId: parseInt(`${localStorage.getItem('userId')}`),
      };
    },
    methods: {
      isFollowed(userId: number) {
        const connectedUserId = Number(localStorage.getItem('userId'));
        const userProfile = store.getUser(userId);

        if (connectedUserId == userProfile?.id) {
          console.log('same user');
          return false;
        }
        else if(userProfile?.Followers?.find((follower) => follower.id == connectedUserId)) {
          return true;
        }
        else {
          return false;
        }
      },
    }

  };
  
</script>

<style scoped>
  .banner {
    background-size: cover;
    height: 100px;
  }

  .dark {
    background-color:rgb(44, 44, 44);
  }

  .dark:nth-of-type(3) {
    padding-bottom: 30px;
  }

  .user-avatar {
    width: 150px;
    height: 150px;
    margin-top: -75px;
  }

  h1 {
    color: white;
    font: var(--ion-title-medium);
  }

  hr {
    background-color: var(--ion-color-primary);
    margin: 1em 0;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }

  .row-data {
    gap: 2em;
  }

  .data {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 4em;
    padding: 10px;
    margin-top: -30px;

    font: var(--ion-text-paragraph);

    box-shadow: 0 0 7px var(--ion-color-primary);
    background-color: white;
    border-radius: 0.5em;
  }

  .data p {
    margin: 0;
  }

  .biography {
    text-align: center;
  }

  .section {
    display: flex;
    flex-direction: column;
  }
</style>