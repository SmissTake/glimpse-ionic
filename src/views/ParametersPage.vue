<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Parameters</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user">
      <ion-row class="ion-justify-content-center dark">
        <ion-avatar class="user-avatar">
          <ion-img v-if="user.avatar" :src="imageSource + '/' + user.avatar" />
          <ion-img
            v-else
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </ion-avatar>
      </ion-row>
      <ion-row class="ion-justify-content-center ion-align-items-center dark">
        <ion-text>
          <h1>{{ user.pseudonym }}</h1>
        </ion-text>
      </ion-row>
      <ion-list>
        <ion-item v-for="parameter in parameters" :key="parameter.id">
          {{ parameter.name }}
        </ion-item>
      </ion-list>

      <ion-accordion-group>
        <ion-accordion>
          <ion-item slot="header" color="light">
            <ion-label>Mes lieux</ion-label>
          </ion-item>
          <ion-list slot="content">
            <PlaceItemManage
              v-for="place in user.posted"
              :placeId="place.id"
              :placeTitle="place.title"
              :key="place.id"
            />
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>

      <ion-button @click="logout" color="danger">Logout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonText,
    IonRow,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
  } from "@ionic/vue";
  import { defineComponent, ref } from "vue";
  import { usePlaceStore } from "@/stores";
  import PlaceItemManage from "@/components/PlaceItemManage.vue";
  import { Place } from "@/interfaces/place.interface";

  const store = usePlaceStore();

  export default defineComponent({
    name: "ParameterList",
    components: {
      IonButton,
      IonContent,
      IonHeader,
      IonItem,
      IonList,
      IonPage,
      IonTitle,
      IonToolbar,
      IonText,
      IonRow,
      IonImg,
      IonAvatar,
      IonLabel,
      IonAccordion,
      PlaceItemManage,
      IonAccordionGroup,
    },
    setup() {
      const parameters = ref([
        { id: 1, name: "Modifier mon profil", content: "Content 1" },
        { id: 2, name: "Gérer mes lieux", content: "Content 2" },
        { id: 3, name: "Conditions d'utilisation", content: "Content 3" },
        { id: 4, name: "Politique de confidentialité", content: "Content 4" },
        { id: 5, name: "A propos", content: "Content 5" },
      ]);

      const showModal = ref(false);
      const selectedParameter = ref(null);

      const openParameter = (parameter: any) => {
        selectedParameter.value = parameter;
        showModal.value = true;
      };

      const closeModal = () => {
        showModal.value = false;
      };

      const logout = () => {
        // Implement logout logic here
      };

      return {
        parameters,
        showModal,
        selectedParameter,
        openParameter,
        closeModal,
        logout,
        imageSource: process.env.VUE_APP_API_URL,
      };
    },
    //if user() is undefined, return to previous page:
    onBeforeMount() {
      if (!this.user) {
        this.$router.go(-1);
      }
    },
    computed: {
      user() {
        console.log(store.getUser(parseInt(localStorage.getItem("userId")!)))
        return store.getUser(parseInt(localStorage.getItem("userId")!));
      },
    },
  });
</script>
