<template>
  <ion-avatar 
    v-if="category.avatar"
    :class="style + ' ' + size">
    <div class="circle">
      <img
      :src="imageSource+'/'+category.avatar"
      />
    </div>
    <label v-if="label">
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
      style: {
        type: String,
        default: 'green',
      },
      label: {
        type: Boolean,
        default: true,
      },
      size: {
        type: String,
        default: 'medium',
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
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .medium .circle {
    width: 50px;
    height: 50px;
  }
  .small .circle {
    width: 30px;
    height: 30px;
  }
  .green .circle {
    background-color: #fff;
    filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1));
  }
  ion-avatar img {
    object-fit: contain;
  }

  .medium img {
    width: 30px;
    height: 30px;
  }

  .small img {
    width: 20px;
    height: 20px;
  }
  .green img{
    filter: invert(60%) sepia(36%) saturate(485%) hue-rotate(36deg) brightness(96%) contrast(91%);
  }

  .simple .circle {
    border: 1px solid #fff;
    filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1));
  }
  .white-svg {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
  }
</style>