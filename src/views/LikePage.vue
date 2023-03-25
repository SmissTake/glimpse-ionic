<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-page>
    <ion-content>
      <div class="example-content">Like content</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonPage } from '@ionic/vue';

  export default {
    components: { IonContent, IonPage },
  };
</script>