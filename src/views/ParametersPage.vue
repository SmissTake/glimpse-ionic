<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>
            <router-link
              slot="start"
              link
              :to="{ name: 'user', params: { id: user!.id } }"
            >
              <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
            </router-link>
          </ion-button>
        </ion-buttons>
        <ion-title>Paramètres</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user">
      <ion-row class="ion-align-items-center ion-justify-content-center">
        <ion-avatar class="user-avatar" style="margin-top: 2em">
          <ion-img v-if="user.avatar" :src="imageSource + '/' + user.avatar" />
          <ion-img
            v-else
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </ion-avatar>
      </ion-row>
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-text>
          <h1>{{ user.pseudonym }}</h1>
        </ion-text>
      </ion-row>
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-button color="success" fill="outline" style="margin: auto"
          >Modifier mon profil</ion-button
        >
      </ion-row>
      <ion-list class="ion-justify-content-center" :inset="true">
        <ion-item v-for="parameter in parameters" :key="parameter.id">
          {{ parameter.name }}
        </ion-item>
      </ion-list>

      <ion-accordion-group>
        <ion-accordion v-if="user.posted!.length > 0">
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
        <ion-accordion v-else>
          <ion-item slot="header" color="light">
            <ion-label>Mes lieux</ion-label>
          </ion-item>
          <ion-list>
            <ion-item>
              <ion-label>Vous n'avez pas encore posté de lieu</ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-button @click="logout" color="danger" fill="outline"
          >Déconnexion</ion-button
        >
        <ion-button @click="deleteAccount" color="danger"
          >Supprimer mon compte</ion-button
        >
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonBackButton,
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
    IonButtons,
    IonIcon,
  } from "@ionic/vue";
  import { defineComponent, ref } from "vue";
  import { usePlaceStore } from "@/stores";
  import PlaceItemManage from "@/components/PlaceItemManage.vue";
  import { Place } from "@/interfaces/place.interface";
  import { arrowBackOutline } from "ionicons/icons";
  import { logout as logoutAction } from "@/utils/auth";

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
      IonButtons,
      IonIcon
    },
    setup() {
      const parameters = ref([
        { id: 1, name: "Conditions d'utilisation", content: "Content 3" },
        { id: 2, name: "Politique de confidentialité", content: "Content 4" },
        { id: 3, name: "A propos", content: "Content 5" },
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
        logoutAction();
      };

      const deleteAccount = () => {
        console.log("delete account");
      };

      return {
        parameters,
        showModal,
        selectedParameter,
        openParameter,
        closeModal,
        logout,
        deleteAccount,
        imageSource: process.env.VUE_APP_API_URL,
        arrowBackOutline,
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
        console.log(store.getUser(parseInt(localStorage.getItem("userId")!)));
        return store.getUser(parseInt(localStorage.getItem("userId")!));
      },
    },
  });
</script>
