<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="homeIcon"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="like" href="/like">
            <ion-icon :icon="heartIcon"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="add" href="/add">
            <ion-icon :icon="addIcon"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="notifications" href="/notifications">
            <ion-icon :icon="notificationsIcon"></ion-icon>
          </ion-tab-button>

          <ion-tab-button tab="user" href="/user">
            <ion-icon :icon="personIcon"></ion-icon>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script lang="ts">
    import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/vue';
  
    import { homeOutline, heartOutline, atCircle, notificationsOutline, personOutline, addOutline } from 'ionicons/icons';
  
    export default {
      components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon },
      data() {
        return {
          homeIcon: homeOutline,
          heartIcon: heartOutline,
          addIcon: addOutline,
          notificationsIcon: notificationsOutline,
          personIcon: personOutline,
        };
      },
    };
  </script>