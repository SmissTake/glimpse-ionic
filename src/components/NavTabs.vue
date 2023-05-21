<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom" color="dark">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="homeIcon"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="map" href="/map">
            <ion-icon :icon="mapIcon"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="add" href="/add">
            <ion-icon :icon="addIcon"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="notifications" href="/notifications">
            <ion-icon :icon="notificationsIcon"></ion-icon>
          </ion-tab-button>

          <ion-tab-button tab="user" :href="'/user/' + userId">
            <ion-icon :icon="personIcon"></ion-icon>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script lang="ts">
    import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/vue';
  
    import { homeOutline, mapOutline, notificationsOutline, personOutline, addOutline } from 'ionicons/icons';
  
    export default {
      components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon },
      data() {
        return {
          homeIcon: homeOutline,
          mapIcon: mapOutline,
          addIcon: addOutline,
          notificationsIcon: notificationsOutline,
          personIcon: personOutline,
          userId : localStorage.userId
        };
      },
    };
  </script>

<style scoped>
  ion-tab-button {
    --color-selected: var(--ion-color-primary);
  }
  ion-tab-button.tab-selected ion-icon {
    color: var(--ion-color-primary);
  }
  ion-tab-button.tab-selected::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--ion-color-primary);
    position: relative;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
  }

</style>