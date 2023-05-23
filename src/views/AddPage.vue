<script setup lang="ts">
import { Accessibility } from '@/interfaces/accessibility.interface';
import { Category } from '@/interfaces/category.interface';

const categories: Category[] = store.categories;
const accessibilities: Accessibility[] = store.accessibilities;
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ajouter un lieu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="submitForm">
        <ion-item>
          <div v-if="filePreview" >
            <div class="dropper">
              <div v-for="(preview, index) in filePreview" :key="index" class="preview">
                <ion-img :src="preview" class="preview-image"  alt="fileName" style="max-height: 256px"></ion-img>
                <ion-icon :icon="closeCircle" class="preview-remove" @click="removeFile(index)"></ion-icon>
              </div>
            </div>
          </div>
          <div class="add-image">
            <input
              id="file-input"
              class="hide-file-input"
              type="file"
              placeholder="Choisir une image"
              required="true"
              accept="image/*"
              multiple
              name="image"
              @change="getFile"/>
            <label class="file-label" for="file-input" aria-label="Choisir une image">
              <ion-icon :icon="addOutline"></ion-icon>
            </label>
            <ion-note>{{ filePreview.length }} /8</ion-note>
          </div>
        </ion-item>
        <ion-item class="custom" :counter="true">
          <ion-label position="floating">Titre</ion-label>
          <ion-input
            placeholder="Batiment abondonné"
            :required="true"
            :value="form.title"
            name="title"
            :maxlength="50"
            @ionInput="onInput($event)"
            class="custom"
          ></ion-input>
        </ion-item>
        <ion-item class="custom">
          <ion-label position="floating">Description</ion-label>
          <ion-textarea
            placeholder="Un batiment abandonné dans la ville de Lyon"
            :required="true"
            :value="form.description"
            name="description"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-item class="custom">
          <ion-label position="floating">Histoire</ion-label>
          <ion-textarea
            placeholder="Ce batiment a été construit en 1900 par l'architecte ..."
            :value="form.history"
            name="history"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-item class="custom" :counter="true">
          <ion-label position="floating">Ville</ion-label>
          <ion-input
            type="text"
            placeholder="Lyon"
            :value="form.town"
            name="town"
            :maxlength="50"
            @ionInput="onInput($event)"
          ></ion-input>
        </ion-item>
        <ion-item class="custom">
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
        <ion-item class="custom">
          <ion-label position="floating">Accessibilité</ion-label>
          <ion-select
            placeholder="Choisir une catégorie"
            :required="true"
            :value="form.accessibilitiesId"
            name="accessibilitiesId"
            @ionChange="onInput($event)">
            <ion-select-option v-for="accessibility in accessibilities" :key="accessibility.id" 
              :value="accessibility.id">
              {{ accessibility.label }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="custom" :counter="true">
          <ion-label position="floating">Mots-clés</ion-label>
          <ion-textarea
            placeholder="Mots-clés séparés par des virgules. Ex : batiment, abandonné, Lyon"
            :value="form.keyword"
            name="keyword"
            :maxlength="255"
            @ionInput="onInput($event)"
          ></ion-textarea>
        </ion-item>
        <ion-button type="submit" expand="block" v-if="!store.fetchError">Publier</ion-button>
        <ion-button type="submit" expand="block" v-if="store.fetchError || canSubmit" disabled onClick="presentErrorToast">Publier</ion-button>
      </form>
      <ion-toast
      :message="store.fetchError"
      position="bottom"
      color="danger"
      :duration="4000"
      @ionToastDidDismiss="store.fetchError == null"
      v-if="store.fetchError"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton, IonToast, IonImg, IonNote, IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addOutline, accessibilityOutline, closeCircle } from 'ionicons/icons';
import { usePlaceStore } from '@/stores';
import { logout } from '@/utils/auth';

interface CustomFile extends File {
  previewBase64: string;
}

const store = usePlaceStore();

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
    IonButton,
    IonPage,
    IonToast,
    IonImg,
    IonNote,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon
  },
  data(){
    return {
      form : {
        title: "",
        description: "",
        history: "",
        town: "",
        categoriesId: '',
        accessibilitiesId: '',
        keyword: "",
        image: [] as File[],
        usersId: `${process.env.VUE_APP_USER_ID}`,
      },
      fileName: '',
      filePreview: [] as string[],
      addOutline,
      accessibilityOutline,
      closeCircle,
      canSubmit : false,
    }
  },
  methods: {
    getFile(event: any){
      const files: CustomFile[] = event.target.files;
      if (files.length > 8 || this.form.image.length > 8) {
        store.fetchError = 'Vous ne pouvez pas ajouter plus de 8 images';
        setTimeout(() => {
          store.setFetchError("");
        }, 4000);
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const file: CustomFile = files[i];
        const reader: FileReader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onload = () => {
            // Set a new property on the captured `file` and set it to the converted base64 image
            (file as any).previewBase64 = reader.result;
            // Push the new file into the filePreview array
            this.filePreview.push(file.previewBase64);
            // Emit the file with the new previewBase64 property on it
            this.form.image.push(file);
          };
          reader.onerror = (error) => {
            console.log('Error ', error);
          };
        }
      }
    },
    removeFile(index:any) {
      this.filePreview.splice(index, 1);
      this.form.image.splice(index, 1);
    },
    submitForm() {
      const data = new FormData();
      data.append('accessibilitiesId', this.form.accessibilitiesId);
      data.append('categoriesId', this.form.categoriesId);
      data.append('title', this.form.title);
      data.append('description', this.form.description);
      data.append('town', this.form.town);
      data.append('history', this.form.history);
      data.append('keyword', this.form.keyword);
      for (let i = 0; i < this.form.image.length; i++) {
        data.append('pictures', this.form.image[i]);
      }

      const token = localStorage.getItem('token');

      //console log data values
      for (const value of data.values()) {
        console.log(value);
      }

      // fetch(`${process.env.VUE_APP_API_URL}/place/create`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: data,
      // })
      // .then(response => {
      //   if (response.status === 401) {
      //     throw new Error('Unauthorized');
      //   }
      //   return response.json();
      // })
      // .then(data => {
      //   console.log(data); // handle success
      //   store.setSuccessMessage("Votre lieu a bien été ajouté !");
      //   //reset the success message after toast duration
      //   setTimeout(() => {
      //     store.setSuccessMessage("");
      //   }, 4000);
      //   this.$router.push({ path: '/user' });
      // })
      // .catch(error => {
      //   console.error(error); // handle error
      //   if (error.message === 'Unauthorized') {
      //     store.setFetchError("Vous devez être connecté pour ajouter un lieu");
      //     //reset the error message after toast duration
      //     setTimeout(() => {
      //       store.setFetchError("");
      //     }, 4000);
      //     logout();
      //   } else {
      //     store.setFetchError("Une erreur est survenue lors de l'ajout de votre lieu");
      //     //reset the error message after toast duration
      //     setTimeout(() => {
      //       store.setFetchError("");
      //     }, 4000);
      //   }
      // });
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

form {
  padding: 0.5em;
  overflow: visible;
}

ion-radio-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.hide-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border-width: 0;
  opacity: 0;
  cursor: pointer;
}
.file-label {
  color: #fff;
  background-color: var(--ion-color-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

#file-input {
  width: 100%;
  height: 100%;
}

.dropper {
  display: flex;
  flex-wrap: wrap;
  max-height: 230px;
  overflow-y: auto;
}

.preview-remove {
  position: relative;
  bottom: 80%;
  left: 0;
  font-size: 24px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
}
.add-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

ion-img {
  margin: 0.5rem;
  border-radius: 0.25rem;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

ion-item.accessibility::part(native) {
  --border-style: none;
  margin-top: 1em;
}

.accessibility .choices {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

ion-label {
  --border-style: none !important;
}
</style>