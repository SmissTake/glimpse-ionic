<!-- generic ionic input component -->
<template>
  <ion-item>
    <ion-label position="stacked">{{ label }}</ion-label>
    <ion-input
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
    ></ion-input>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  components: {
    IonItem,
    IonLabel,
    IonInput,
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