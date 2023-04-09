<template>
  <ion-content>
      <ion-item>
        <ion-label position="stacked">Image</ion-label>
        <ion-input
          type="file"
          placeholder="Choisir une image"
          :value="value"
          @input="onInput"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Titre</ion-label>
        <ion-input
          type="text"
          placeholder="Titre"
          :value="value"
          @input="onInput"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Description</ion-label>
        <ion-textarea
          placeholder="Description"
          :value="value"
          @input="onInput"
        ></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Histoire</ion-label>
        <ion-textarea
          placeholder="Histoire"
          :value="value"
          @input="onInput"
        ></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Ville</ion-label>
        <ion-input
          type="text"
          placeholder="Ville"
          :value="value"
          @input="onInput"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Catégorie</ion-label>
        <ion-select
          :value="value"
          @input="onInput"
          placeholder="Choisir une catégorie"
        >
          <ion-select-option value="1">Catégorie 1</ion-select-option>
          <ion-select-option value="2">Catégorie 2</ion-select-option>
          <ion-select-option value="3">Catégorie 3</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Accessibilité</ion-label>
        <ion-radio-group
          :value="value"
          @input="onInput
        "
        >
          <ion-item>
            <ion-label>Facile</ion-label>
            <ion-radio slot="start" value="1"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>Moyen</ion-label>
            <ion-radio slot="start" value="2"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>Difficile</ion-label>
            <ion-radio slot="start" value="3"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Mots-clés</ion-label>
        <ion-textarea
          placeholder="Mots-clés"
          :value="value"
          @input="onInput"
        ></ion-textarea>
      </ion-item>
      <ion-button expand="block">Créer</ion-button>
  </ion-content>
</template>

<script lang="ts">

import { IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddPage',
  components: {
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonButton,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  emits: ['update:value'],
  methods: {
    onInput(event: any) {
      this.$emit('update:value', event.target.value);
    },
  },
});


</script>

<style scoped>

ion-radio-group {
  display: flex;
  flex-direction: row;
}

</style>