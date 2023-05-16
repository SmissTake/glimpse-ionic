<template>
  <ion-img
    v-if="category.Place && category.Place.PicturePlaces.length > 0"
    :src="imageSource + '/' + category.Place.PicturePlaces[0].url">
  </ion-img>
  <ion-label v-if="label"
    >{{ category.label }}
    <span 
    v-if="category.numberPlaces > 1">
      - {{ category.numberPlaces }} lieux
    </span>
    <span
    v-else>
      - {{ category.numberPlaces }} lieu
    </span>
  </ion-label>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Category } from "@/interfaces/category.interface";
  import { IonImg, IonLabel } from "@ionic/vue";

  export default defineComponent({
    props: {
      category: {
        type: Object as () => Category,
        required: true,
      },
      label: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      IonImg,
      IonLabel,
    },
    data() {
      return {
        imageSource: `${process.env.VUE_APP_API_URL}`,
      };
    },
  });
</script>

<style scoped>
  ion-img {
    border-radius: 0.5em !important;
    overflow: hidden;
    width: 80vw;
    height: 200px;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  ion-label {
    font: var(--ion-text-label);
    font-size: 1em;
    margin-top: 1em;
  }

  ion-label span {
    font-size: 0.8em;
    color: var(--ion-color-medium);
  }
</style>
