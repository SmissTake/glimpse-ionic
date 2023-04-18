<script setup lang="ts">
import type { User } from '@/interfaces/user.interface';
import { usePlaceStore } from '@/stores';

const store = usePlaceStore();
const user: User = store.getUser(parseInt(`${process.env.VUE_APP_USER_ID}`));
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-row class="banner ion-justify-content-end" >
        <ion-col size="2">
          <ion-button size="small">
            <ion-icon :icon="settingsIcon"></ion-icon>
          </ion-button>
          <ion-button size="small" color="danger">
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
        <ion-button color="success">Suivre</ion-button>
      </ion-row>
      <ion-row>
        <ion-col>
          <span v-if="user.followedUsers">{{ user.followedUsers.length }}</span>
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
      <ion-row class="ion-justify-content-center">
        <ion-button color="primary" expand="block" >
          <ion-icon :icon="addOutline"></ion-icon>
          Publier une nouvelle experience
        </ion-button>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text>
            <p class="biography">{{ user.biography }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<style scoped>
</style>

<script lang="ts">
  import { IonContent, IonPage, IonRow, IonCol, IonText, IonAvatar, IonImg, IonButton, IonIcon } from '@ionic/vue';
  import { flagOutline, settingsOutline, addOutline } from 'ionicons/icons';

  export default {
    components: { 
      IonContent,
      IonPage,
      IonRow,
      IonCol,
      IonText,
      IonAvatar,
      IonImg
    },

    data() {
      return {
        imageSource : process.env.VUE_APP_API_URL,
        flagIcon: flagOutline,
        settingsIcon: settingsOutline,
        addOutline: addOutline
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