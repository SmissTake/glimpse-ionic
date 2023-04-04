<template>
    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button @click="$emit('close')">
              <ion-icon slot="icon-only" :icon="closeIcon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding-bottom">
        <img :src="place.imageUrl" class="place-image"/>
        <ion-card-content class="ion-margin-bottom">
          <PlaceModalToolBar />
          <ion-row class="place-data">
            <ion-col class="flex">
              <ion-icon :icon="accessibilityIcon"></ion-icon>
              <span>{{ placeAPI.accessibility }}</span>
            </ion-col>
            <ion-col class="flex">
              <ion-icon :icon="businessIcon"></ion-icon>
              <span>{{ place.category }}</span>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <h1>{{ place.title }}</h1>
            </ion-col>
            <ion-col>
              <div class="posted-by">
                <ion-row>
                  <ion-col>
                    <p class="username">
                      {{ place.username }}
                    </p>
                    <p class="posted-at">
                      {{ placeAPI.postedAt }}
                    </p>
                  </ion-col>
                  <ion-col class="flex">
                    <UserAvatar :userAvatar="placeAPI.userAvatar" />
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
          </ion-row>
          <div class="description">
            <h2>Déscription</h2>
            <p>
              {{ placeAPI.description }}
            </p>
          </div>
          <div class="history">
            <h2>Histoire</h2>
            <p>
              {{ placeAPI.history }}
            </p>
          </div>
          <div class="keywords">
            <h2>Mots clés</h2>
            <p>
              {{ placeAPI.keywords }}
            </p>
          </div>
          <div class="comments">
            <h2>Commentaires</h2>
            <CommentInput/>
            <div v-if="placeAPI.comments.length > 0">
              <p>
                {{ placeAPI.comments.length }} commentaire(s)
              </p>
              <div v-for="comment in placeAPI.comments" :key="comment.id">
                <CommentPlace :comment="comment" />
              </div>
            </div>
            <div v-if="placeAPI.comments.length === 0">
              <p>
                Aucun commentaire pour le moment.
              </p>
            </div>
          </div>
        </ion-card-content>
      </ion-content>
    </ion-modal>
  </template>
  
  <script lang="ts">
  import { IonModal, IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonButton, IonButtons } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { closeOutline, heartOutline, accessibilityOutline, businessOutline } from 'ionicons/icons';
  import PlaceModalToolBar from './PlaceModalToolBar.vue';
  import CommentPlace from './CommentPlace.vue';
  import UserAvatar from './UserAvatar.vue';
import CommentInput from './CommentInput.vue';
  
  export default defineComponent({
    name: 'PlaceModal',
    components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCardContent,
    IonIcon,
    IonButton,
    IonButtons,
    PlaceModalToolBar,
    CommentPlace,
    UserAvatar,
    CommentInput
},
    props: {
      place: {
        type: Object,
        required: true,
      },
      isOpen: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        closeIcon: closeOutline,
        heartIcon: heartOutline,
        accessibilityIcon: accessibilityOutline,
        businessIcon: businessOutline,
        placeAPI : {
          description: 'Fonderie Abandonnée dans les alentours de Rennes. Lieu agréable mais protégé et parfois dangereux',
          history: 'Bâtie en 1908, la fonderie de savon était idéalement située, à la fois proche d’une ligne de chemin de fer et d’un lac. Après avoir résisté pendant les deux Guerres Mondiales, la fonderie passe en liquidation judiciaire en 1973 et l’ensemble de ses 120 employés sont licenciés. Elle est rachetée, mais au bout de 15 ans, en 1988, elle ferme définitivement. Depuis 10 ans, la fonderie appartient à L’Etat et est à l’abandon pour attendre sa dépollution (encore longtemps).',
          postedAt: '17/12/2023',
          userAvatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          accessibility: 'Moyen',
          keywords: "fonderie,abandonnée,rennes,savon,lac,dangereux, protege",
          comments: [{
            id: 0,
            username: "Jean",
            comment: "Superbe endroit, je recommande !",
            postedAt: "17/12/2023",
            userAvatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          },
          {
            id: 1,
            username: "Michel",
            comment: "J'y suis allé, c'est vraiment très beau !",
            postedAt: "17/12/2023",
            userAvatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
            images: ["https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"]
          }]
        }
      };
    },
  });
  </script>
  
  <style scoped>
  .username {
    font-weight: bold;
  }
  .posted-at {
    font-size: 0.8rem;
    color: #8c8c8c;
  }
  .posted-by p {
    text-align: end;
  }

  h1 {
    font-weight: bold;
    font-size: 1.2rem;
  }

  h2 {
    font-weight: bold;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  
  .likes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .description {
    margin-top: 10px;
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .place-data {
    border-top: #8c8c8c solid 1px;
  }

  .place-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  </style>
  