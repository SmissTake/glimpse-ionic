<template>
  <ion-avatar v-if="category.avatar">
    <div class="circle">
      <img
      :src="imageSource+'/'+category.avatar"
        class="colored-svg"
      />
    </div>
    <label>
      {{ category.label }}
    </label>
  </ion-avatar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Category } from '@/interfaces/category.interface';
  import { IonAvatar } from '@ionic/vue';

  export default defineComponent({
    props: {
      category: {
        type: Object as () => Category,
        required: true,
      },
    },
    components: {
      IonAvatar,
    },
    data() {
      return {
        imageSource: `${process.env.VUE_APP_API_URL}`,
      };
    },
  });
</script>

<style scoped>
  ion-avatar {
    --border-radius: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  ion-avatar label {
    font: var(--ion-text-label);
  }
  .circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1));
  }
  ion-avatar img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  .colored-svg {
    filter: invert(60%) sepia(36%) saturate(485%) hue-rotate(36deg) brightness(96%) contrast(91%);
  }
</style>