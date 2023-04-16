<script setup lang="ts">
import { Accessibility } from '@/interfaces/accessibility.interface';
import { Category } from '@/interfaces/category.interface';
import { usePlaceStore } from '@/stores';

const store = usePlaceStore();
const categories: Category[] = store.categories;
const accessibilities: Accessibility[] = store.accessibilities;
</script>

<template>
  <ion-page>
    <ion-content>
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="stacked">Image</ion-label>
          <ion-input
            type="file"
            placeholder="Choisir une image"
            :required="true"
            name="image"
            @change="getFile"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Titre</ion-label>
          <ion-input
            placeholder="Titre"
            :required="true"
            :value="form.title"
            name="title"
            @ionInput="onInput($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Description</ion-label>
          <ion-textarea
            placeholder="Description"
            :required="true"
            :value="form.description"
            name="description"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Histoire</ion-label>
          <ion-textarea
            placeholder="Histoire"
            :value="form.history"
            name="history"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Ville</ion-label>
          <ion-input
            type="text"
            placeholder="Ville"
            :value="form.town"
            name="town"
            @ionInput="onInput($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Catégorie</ion-label>
          <ion-select
            placeholder="Choisir une catégorie"
            :required="true"
            :value="form.categoriesId"
            name="categoriesId"
            @ionChange="onInput($event)">
            <ion-select-option v-for="category in categories" :key="category.id" 
              :value="category.id">
              {{ category.label }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Accessibilité</ion-label>
          <ion-radio-group
            :required="true"
            :value="form.accessibilitiesId"
            name="accessibilitiesId"
            @ionInput="onInput($event)">
            <ion-item v-for="accessibility in accessibilities" :key="accessibility.id">
              <ion-label>{{ accessibility.label }}</ion-label>
              <ion-radio slot="start" :value="accessibility.id"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mots-clés</ion-label>
          <ion-textarea
            placeholder="Mots-clés"
            :value="form.keyword"
            name="keyword"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-button type="submit" expand="block">Créer</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { ref } from 'vue';

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
    IonPage
  },
  data(){
    return {
      form : {
        title: "",
        description: "",
        history: "",
        town: "",
        categoriesId: "",
        accessibilitiesId: "",
        keyword: "",
        image: [],
        usersId: `${process.env.VUE_APP_USER_ID}`,
      },
    }
  },
  methods: {
    getFile(event: any){
        const fileInfo = ref<any>(null)
        console.log(event.target.files);
        fileInfo.value= event.target.files[0];
        this.form.image = fileInfo.value;
    },
    submitForm() {
      const data = new FormData();
      data.append('accessibilitiesId', "1");
      data.append('categoriesId', this.form.categoriesId);
      data.append('title', this.form.title);
      data.append('description', this.form.description);
      data.append('town', this.form.town);
      data.append('history', this.form.history);
      data.append('keyword', this.form.keyword);
      // data.append('pictures', this.form.image);
      for (let i = 0; i < this.form.image.length; i++) {
        data.append('pictures', this.form.image[i]);
      }
      data.append('usersId', this.form.usersId);

      fetch(`${process.env.VUE_APP_API_URL}/place/create`, {
        method: 'POST',
        body: data,
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // handle success
      })
      .catch(error => {
        console.error(error); // handle error
      });
    },
    onInput(event: any) {
      const name = event.target.name;
      const value = event.target.value;
      this.form = { ...this.form, [name]: value };
    },
  },
});

</script>

<style scoped>

ion-radio-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>