<template>
  <ion-page>
    <ion-content>
      <ion-img src="../public/assets/logo.png" class="logo"></ion-img>
      <form @submit.prevent="submitLogin">
        <ion-item class="custom">
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" v-model="loginForm.email"></ion-input>
        </ion-item>
        <ion-item class="custom">
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
    IonImg,
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
      IonImg
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
                localStorage.setItem("userId", data.id);
                localStorage.setItem("token", data.token);
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

<style scoped>
  ion-content {
    height: 100%;
    --background: linear-gradient(180deg, #90A855 10.42%, #1D1D1B 100%);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%;
    min-width: 300px;
    margin: auto;
  }
  ion-item {
    width: 100%;
  }
  ion-button {
    --color: #fff;
    margin-top: 2em; 
  }
</style>