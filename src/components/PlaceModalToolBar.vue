<template>
    <ion-grid :fixed="true">
      <ion-row>
        <ion-col>
            <LikeButton/>
        </ion-col>
        <ion-col>
            <ShareButton/>
        </ion-col>
        <ion-col>
            <GlimpseButton/>
        </ion-col>
      </ion-row>
    </ion-grid>
  </template>
  
  <script lang="ts">
    import { IonCol, IonGrid, IonRow } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import LikeButton from './LikeButton.vue';
    import ShareButton from './ShareButton.vue';
    import GlimpseButton from './GlimpseButton.vue';
  
    export default defineComponent({
      components: { IonCol, IonGrid, IonRow, LikeButton, ShareButton, GlimpseButton },
    });
  </script>
  
  <style scoped>
  </style>