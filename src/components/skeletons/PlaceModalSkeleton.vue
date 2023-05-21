<template>
  <ion-content class="ion-padding-bottom">
    <ion-col>
      <h1>  
        <ion-skeleton-text :animated="true" style="width: 80%; height: 1.5em;"></ion-skeleton-text>
      </h1>
      <ion-text>
        <p class="place-town">
          <ion-skeleton-text :animated="true" style="width: 50%; height: 1em;"></ion-skeleton-text>
        </p>
      </ion-text>
    </ion-col>
    <div style="padding: 20px;">  
      <ion-skeleton-text :animated="true" style="width: 100%; height: 400px;"></ion-skeleton-text>
    </div>
    <ion-card-content class="ion-margin-bottom">
      <ion-row class="posted-by" style="justify-content: space-between;">
        <ion-row style="width: 40%;">
          <ion-col size="auto">
            <ion-skeleton-text :animated="true" style="width: 2em; height: 2em;"></ion-skeleton-text>
          </ion-col>
          <ion-col>
            <ion-skeleton-text :animated="true" style="height: 1em;"></ion-skeleton-text>
            <ion-skeleton-text :animated="true" style="width: 80%; height: 1em;"></ion-skeleton-text>
          </ion-col>
        </ion-row>
        <ion-col size="auto" >
          <ion-skeleton-text :animated="true" style="width: 2em; height: 2em;"></ion-skeleton-text>
        </ion-col>
      </ion-row>
      <ion-skeleton-text :animated="true" class="hr"></ion-skeleton-text>
      <ion-row class="place-data">
        <ion-col class="flex">
          <ion-skeleton-text :animated="true" style="width: 2em; height: 2em;"></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 30%; height: 1em;"></ion-skeleton-text>
        </ion-col>
        <ion-col class="flex">
          <ion-skeleton-text :animated="true" style="width: 2em; height: 2em;"></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 30%; height: 1em;"></ion-skeleton-text>
        </ion-col>
        <ion-col class="flex">
          <ion-skeleton-text :animated="true" style="width: 2em; height: 2em;"></ion-skeleton-text>
          <ion-skeleton-text :animated="true" style="width: 30%; height: 1em;"></ion-skeleton-text>
        </ion-col>
      </ion-row>
      <div class="description">
        <h2>
          <ion-skeleton-text :animated="true" style="width: 80%; height: 2em;"></ion-skeleton-text>
        </h2>
        <ion-skeleton-text :animated="true" style="width: 100%; height: 10em;"></ion-skeleton-text>
      </div>
      <div class="history">
        <h2>
          <ion-skeleton-text :animated="true" style="width: 70%; height: 2em;"></ion-skeleton-text>
        </h2>
        <ion-skeleton-text :animated="true" style="width: 100%; height: 10em;"></ion-skeleton-text>
      </div>
      <div class="keywords">
        <ion-skeleton-text :animated="true" style="width: 20%; height: 1em; margin-right: 1em;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 25%; height: 1em; margin-right: 1em;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 30%; height: 1em; margin-right: 1em;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 25%; height: 1em; margin-right: 1em;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 15%; height: 1em; margin-right: 1em;"></ion-skeleton-text>
      </div>
      <div class="share flex">
        <ion-skeleton-text :animated="true" style="width: 2em; height: 2em;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 10%;"></ion-skeleton-text>
      </div>
      <hr>
      <div class="comments">
        <h2>
          <ion-skeleton-text :animated="true" style="width: 60%; height: 2em;"></ion-skeleton-text>
        </h2>
        <ion-row style="margin-bottom: 1em;">
          <ion-col size="auto">
            <ion-skeleton-text :animated="true" style="width: 3em; height: 3em;"></ion-skeleton-text>
          </ion-col>
          <ion-col>
            <ion-skeleton-text :animated="true" style="width: 40%; height: 1.5em;"></ion-skeleton-text>
            <ion-skeleton-text :animated="true" style="width: 100%; height: 4em;"></ion-skeleton-text>
          </ion-col>
        </ion-row>
      </div>
    </ion-card-content>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonCardContent, IonCol, IonRow, IonText, IonSkeletonText } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaceModalSkeleton',
  components: {
    IonContent,
    IonCardContent,
    IonSkeletonText,
    IonCol,
    IonRow,
    IonText,
  },
});
</script>

<style scoped>
.posted-by ion-col {
  margin-left: 1em;
}

.place-town {
  margin: 0 20px;
  font: var(--ion-title-small);
}

h1 {
  font: var(--ion-title-big);
  margin: 0 20px;
}

h2 {
  font: var(--ion-title-small);
  margin-top: 2em;
  margin-bottom: 0.5em;
  padding-left: 0;
}
.likes {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description {
  margin-top: 10px;
  font: var(--ion-text-paragraph);
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2em;
}

.share {
  margin-top: 2em;
}

.hr {
  height: 1px;
  margin: 2em 0;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
</style>