<template>
    <div class="share-button" @click="toggleShare">
      <ion-icon :icon="shareIcon" :class="{ 'shared': shared }" />
      <div class="share-label">{{ shared ? 'Shared' : 'Share' }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { shareSocialOutline, shareSocial } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'ShareButton',
    components: {
      IonIcon,
    },
    setup() {
      const shared = ref(false);
      const shareIcon = ref(shareSocialOutline);
  
      function toggleShare() {
        shared.value = !shared.value;
        shareIcon.value = shared.value ? shareSocial : shareSocialOutline;
      }
  
      return {
        shared,
        shareIcon,
        toggleShare,
      };
    },
  });
  </script>
  
  <style scoped>
  .share-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .share-label {
    font-size: 12px;
    margin-top: 3px;
  }
  </style>