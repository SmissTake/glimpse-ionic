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
      <ion-content v-if="place" class="ion-padding-bottom">
        <div v-for="(picture, index) in place.picturePlaces" :key="index">
          <!-- <img v-if="picture.url" :src="picture.url" class="place-image"/> -->
          <ion-img src="https://picsum.photos/640/360" class="card-image"/>
        </div>
        <ion-card-content class="ion-margin-bottom">
          <PlaceModalToolBar />
          <ion-row class="place-data">
            <ion-col class="flex">
              <ion-icon :icon="accessibilityIcon"></ion-icon>
              <span>{{ place.accessibility }}</span>
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
                      {{ place.postedBy.pseudonym }}
                    </p>
                    <p class="posted-at">
                      {{ place.createdAt }}
                    </p>
                  </ion-col>
                  <ion-col class="flex">
                    <UserAvatar :userAvatar="place.postedBy.avatar" />
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
          </ion-row>
          <div class="description">
            <h2>Description</h2>
            <p>
              {{ place.description }}
            </p>
          </div>
          <div class="history">
            <h2>Histoire</h2>
            <p>
              {{ place.history }}
            </p>
          </div>
          <div class="keywords">
            <h2>Mots clés</h2>
            <p>
              {{ place.keyword }}
            </p>
          </div>
          <div class="comments">
            <h2>Commentaires</h2>
            <CommentInput :idPlace="placeId"/>
            <div v-if="place.comments">
              <p>
                {{ place.comments.length }} commentaire(s)
              </p>
              <div v-for="comment in place.comments" :key="comment.id">
                <CommentPlace :commentPlace="comment" />
              </div>
            </div>
            <div v-else>
              <p>
                Aucun commentaire pour le moment.
              </p>
            </div>
          </div>
        </ion-card-content>
      </ion-content>
      <ion-content v-else>
          <p>
            Aucun lieu trouvé.
          </p>
        </ion-content>
    </ion-modal>
  </template>
  
  <script lang="ts">
  import { IonModal, IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonButton, IonButtons } from '@ionic/vue';
  import { defineComponent, onMounted } from 'vue';
  import { closeOutline, heartOutline, accessibilityOutline, businessOutline, key } from 'ionicons/icons';
  import PlaceModalToolBar from './PlaceModalToolBar.vue';
  import CommentPlace from './CommentPlace.vue';
  import UserAvatar from './UserAvatar.vue';
  import CommentInput from './CommentInput.vue';
import { Place } from '@/interfaces/place.interface';
  
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
      isOpen: {
        type: Boolean,
        required: true,
      },
      placeId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        closeIcon: closeOutline,
        heartIcon: heartOutline,
        accessibilityIcon: accessibilityOutline,
        businessIcon: businessOutline,
        place: {} as Place,

      };
    },
    mounted(){
      fetch(`${process.env.VUE_APP_API_URL}/place/show/${this.placeId}`)
        .then((response) => response.json())
        .then((data) => {
          this.place = data;
          console.log(this.place.favoriteUsers);
        });
    }
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
  