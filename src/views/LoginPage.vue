<template>
  <ion-page>
    <ion-content>
      <form @submit.prevent="submitLogin">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" v-model="loginForm.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input type="password" v-model="loginForm.password"></ion-input>
        </ion-item>
        <ion-button type="submit">Se connecter</ion-button>
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
  import {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToast,
  } from "@ionic/vue";
  import { defineComponent } from "vue";
  import { usePlaceStore } from "@/stores";

  const store = usePlaceStore();

  export default defineComponent({
    name: "LoginPage",
    components: {
      IonPage,
      IonContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonToast,
    },
    data() {
      return {
        loginForm: {
          email: "",
          password: "",
        },
        store,
      };
    },
    methods: {
      submitLogin() {
        const data = {
          mail: this.loginForm.email,
          password: this.loginForm.password,
        };

        fetch(`${process.env.VUE_APP_API_URL}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              store.fetchError = data.error;
              //reset the success message after toast duration
              setTimeout(() => {
                store.setFetchError("");
              }, 4000);
            } else {
              if (data.token) {
                store.successMessage = "Vous êtes connecté !";
                //reset the success message after toast duration
                setTimeout(() => {
                  store.setSuccessMessage("");
                }, 4000);
                store.connectedUserId = data.id;
                store.token = data.token;
                this.$router.push({ path : '/home'});
              } else {
                store.fetchError = "Identifiants incorrects";
                //reset the success message after toast duration
                setTimeout(() => {
                  store.setFetchError("");
                }, 4000);
              }
            }
          })
          .catch((error) => {
            store.fetchError = error;
          });
      },
    },
  });
</script>
