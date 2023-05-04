<template>
    <div class="glimpse-button" @click="toggleGlimpse">
      <ion-icon :icon="glimpseIcon" :class="{ 'glimpsed': glimpsed }" />
      <div class="glimpse-label">{{ glimpsed ? 'Glimpsed' : 'Glimpse' }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'GlimpseButton',
    components: {
      IonIcon
    },
    setup() {
      const glimpsed = ref(false);
      const glimpseIcon = ref(eyeOutline);
  
      const toggleGlimpse = () => {
        glimpsed.value = !glimpsed.value;
        glimpseIcon.value = glimpseIcon.value === eyeOutline ? eyeOffOutline : eyeOutline;
      };
  
      return {
        glimpsed,
        glimpseIcon,
        toggleGlimpse,
      };
    },
  });
  </script>

  <style scoped>  
  .glimpse-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .glimpse-label {
    font-size: 12px;
    margin-top: 3px;
  }
    </style>