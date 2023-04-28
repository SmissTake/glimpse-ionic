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
          <ion-label position="floating">Image</ion-label>
          <ion-input
            type="file"
            placeholder="Choisir une image"
            :required="true"
            name="image"
            @change="getFile"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Titre</ion-label>
          <ion-input
            placeholder="Batiment abondonné"
            :required="true"
            :value="form.title"
            name="title"
            maxlength="50"
            :counter="true"
            @ionInput="onInput($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea
            placeholder="Un batiment abandonné dans la ville de Lyon"
            :required="true"
            :value="form.description"
            name="description"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Histoire</ion-label>
          <ion-textarea
            placeholder="Ce batiment a été construit en 1900 par l'architecte ..."
            :value="form.history"
            name="history"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Ville</ion-label>
          <ion-input
            type="text"
            placeholder="Lyon"
            :value="form.town"
            name="town"
            @ionInput="onInput($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Catégorie</ion-label>
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
          <ion-label position="floating">Accessibilité</ion-label>
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
          <ion-label position="floating">Mots-clés</ion-label>
          <ion-textarea
            placeholder="Mots-clés séparés par des virgules. Ex : batiment, abandonné, Lyon"
            :value="form.keyword"
            name="keyword"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-button type="submit" expand="block" v-if="!store.fetchError">Créer</ion-button>
        <ion-button type="submit" expand="block" v-if="store.fetchError" disabled onClick="presentErrorToast">Créer</ion-button>
      </form>
      <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError = null"
      v-if="store.fetchError"
    ></ion-toast>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonButton, IonToast } from '@ionic/vue';
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
    IonPage,
    IonToast
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
    async presentSuccessToast() {
      const toast = document.createElement('ion-toast');
      toast.message = 'Votre lieu a bien été ajouté';
      toast.duration = 2000;
      toast.color = "success";
      toast.position = "bottom";
      document.body.appendChild(toast);
      return toast.present();
    },
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
        this.presentSuccessToast();
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