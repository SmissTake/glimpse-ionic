<template>
  <ion-page>
    <ion-content>
      <ion-img src="assets/icon/icon.png" class="logo"></ion-img>
      <form @submit.prevent="submitLogin">
        <ion-item class="custom">
          <ion-label position="stacked">Nom d'utilisateur</ion-label>
          <ion-input type="text" v-model="loginForm.pseudonym"></ion-input>
        </ion-item>
        <ion-item class="custom">
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" v-model="loginForm.email"></ion-input>
        </ion-item>
        <ion-item class="custom">
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input type="password" v-model="loginForm.password"></ion-input>
        </ion-item>
        <ion-item class="custom">
          <ion-label position="stacked">Confirmez le mot de passe</ion-label>
          <ion-input type="password" v-model="checkPassword"></ion-input>
        </ion-item>
        <ion-button type="submit" :disabled="isSubmitting">
          <span v-if="!isSubmitting">En avant !</span>
          <ion-spinner v-if="isSubmitting"></ion-spinner>
        </ion-button>
      </form>
      <router-link to="/login" class="center">Vous connaissez déjà les lieux ? Connectez-vous</router-link>
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
    IonSpinner
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
      IonImg,
      IonSpinner
    },
    data() {
      return {
        loginForm: {
          pseudonym: "",
          email: "",
          password: "",
        },
        checkPassword: "",
        store,
        isSubmitting: false,
      };
    },
    methods: {
      submitLogin() {
        if(this.validForm()){
          this.isSubmitting = true;
          const data = {
            pseudonym: this.loginForm.pseudonym,
            mail: this.loginForm.email,
            password: this.loginForm.password,
          };

          fetch(`${process.env.VUE_APP_API_URL}/user/signin`, {
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
                //reset the error message after toast duration
                setTimeout(() => {
                  store.setFetchError("");
                }, 4000);
              } else {
                store.successMessage = "Vous êtes inscrit !";
                //reset the success message after toast duration
                setTimeout(() => {
                  store.setSuccessMessage("");
                }, 4000);
                this.$router.push({ path : '/login'});
              }
            })
            .catch((error) => {
              store.fetchError = error;
            })
            .finally(() => {
              this.isSubmitting = false;
            });
        }
      },
      validForm() {
        if(this.loginForm.pseudonym && this.loginForm.email && this.loginForm.password && this.checkPassword){
          if(this.loginForm.password == this.checkPassword){
            return true;
          }
          else {
            const passwordInput = document.querySelector('ion-input[type="password"]');
            if(passwordInput){
              passwordInput.setAttribute("color", "danger");
            }
            store.fetchError = "Les mots de passe ne correspondent pas";
            setTimeout(() => {
              store.setFetchError("");
            }, 4000);
            return false;
          }
        }
        else {
          store.fetchError = "Veuillez remplir tous les champs";
          setTimeout(() => {
            store.setFetchError("");
          }, 4000);
          return false;
        }
      }
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
    height: 60%;
    min-width: 300px;
    margin: auto;
  }
  .logo{
    width: 50%;
    margin: 25% auto auto auto; 
    display: block;
  }
  ion-item {
    width: 100%;
  }
  ion-button {
    --color: #fff;
    margin-top: 2em; 
  }
  .center {
    display: block;
    width: 100%;
    text-align: center;
  }
</style>