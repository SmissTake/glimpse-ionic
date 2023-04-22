<template>
    <ion-modal :is-open="isOpen" :presenting-element="presentingElement" v-if="loaded">
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
        <swiper>
          <swiper-slide v-for="(picture, index) in place.PicturePlaces" :key="index">
            <img v-if="imageSource+'/'+picture.url" :src="imageSource+'/'+picture.url" class="place-image" loading="lazy" />
          </swiper-slide>
        </swiper>
        <ion-card-content class="ion-margin-bottom">
          <PlaceModalToolBar />
          <ion-row class="place-data">
            <ion-col class="flex">
              <ion-icon :icon="accessibilityIcon"></ion-icon>
              <span>{{ place.Accessibility.label }}</span>
            </ion-col>
            <ion-col class="flex">
              <ion-icon :icon="businessIcon"></ion-icon>
              <span>{{ place.Category.label }}</span>
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
                      <router-link :to="{ name: 'user', params: { id: place.postedBy.id } }">{{ place.postedBy.pseudonym }}</router-link>
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
            <div v-if="place.Comments">
              <p>
                {{ place.Comments.length }} commentaire(s)
              </p>
              <div v-for="comment in place.Comments" :key="comment.id">
                <CommentPlace :CommentPlace="comment" />
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
    <ion-modal v-else>
      <ion-header>
        <ion-toolbar :idPlace="placeId">
          <ion-buttons slot="end">
            <ion-button @click="$emit('close')">
              <ion-icon slot="icon-only" :icon="closeIcon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content v-if="place" class="ion-padding-bottom">
        <div v-for="(picture, index) in place.PicturePlaces" :key="index">
          <!-- <img v-if="picture.url" :src="picture.url" class="place-image"/> -->
          <ion-img src="https://picsum.photos/640/360" class="card-image"/>
        </div>
        <ion-card-content class="ion-margin-bottom">
          <PlaceModalToolBar />
          <ion-row class="place-data">
            <ion-col class="flex">
              <ion-icon :icon="accessibilityIcon"></ion-icon>
              <span>{{ place.Accessibility.label }}</span>
            </ion-col>
            <ion-col class="flex">
              <ion-icon :icon="businessIcon"></ion-icon>
              <span>{{ place.Category.label }}</span>
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
            <div v-if="place.Comments">
              <p>
                {{ place.Comments.length }} commentaire(s)
              </p>
              <div v-for="comment in place.Comments" :key="comment.id">
                <CommentPlace :CommentPlace="comment" />
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
        <div>
          <!-- <img v-if="picture.url" :src="picture.url" class="place-image"/> -->
          <ion-img class="card-image">
            <ion-skeleton-text :animated="true" />
          </ion-img>
        </div>
        <ion-card-content class="ion-margin-bottom">
          <PlaceModalToolBar />
          <ion-row class="place-data">
            <ion-col class="flex">
              <ion-icon :icon="accessibilityIcon"></ion-icon>
              <span>
                <ion-skeleton-text :animated="true" width="70px" />
              </span>
            </ion-col>
            <ion-col class="flex">
              <ion-icon :icon="businessIcon"></ion-icon>
              <span>
                <ion-skeleton-text :animated="true" width="70px" />
              </span>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <h1>
                <ion-skeleton-text :animated="true" width="80%" />
              </h1>
            </ion-col>
            <ion-col>
              <div class="posted-by">
                <ion-row>
                  <ion-col>
                    <p class="username">
                      <ion-skeleton-text :animated="true" width="70px" />
                    </p>
                    <p class="posted-at">
                      <ion-skeleton-text :animated="true" width="50px" />
                    </p>
                  </ion-col>
                  <ion-col class="flex">
                    <ion-thumbnail slot="start">
                      <ion-skeleton-text :animated="true"/>
                    </ion-thumbnail>
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
          </ion-row>
          <div class="description">
            <h2>
              <ion-skeleton-text :animated="true" width="100px" />
            </h2>
            <p>
              <ion-skeleton-text :animated="true" width="100%" />
              <ion-skeleton-text :animated="true" width="80%" />
              <ion-skeleton-text :animated="true" width="90%" />
              <ion-skeleton-text :animated="true" width="70%" />
            </p>
          </div>
          <div class="history">
            <h2>
              <ion-skeleton-text :animated="true" width="100px" />
            </h2>
            <p>
              <ion-skeleton-text :animated="true" width="100%" />
              <ion-skeleton-text :animated="true" width="80%" />
              <ion-skeleton-text :animated="true" width="90%" />
              <ion-skeleton-text :animated="true" width="70%" />
            </p>
          </div>
          <div class="keywords">
            <h2>
              <ion-skeleton-text :animated="true" width="100px" />
            </h2>
            <p>
              <ion-skeleton-text :animated="true" width="100%" />
              <ion-skeleton-text :animated="true" width="80%" />
            </p>
          </div>
          <div class="comments">
            <h2>
              <ion-skeleton-text :animated="true" width="100px" />
            </h2>
            <CommentInput :idPlace="placeId"/>
            <div v-if="place.Comments">
              <p>
                <ion-skeleton-text :animated="true" width="70px" />
              </p>
            </div>
          </div>
        </ion-card-content>
      </ion-content>
    </ion-modal>
  </template>
  
  <script lang="ts">
  import { IonModal, IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonButton, IonButtons, IonSkeletonText, IonThumbnail, IonCol, IonRow, IonImg } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { closeOutline, heartOutline, accessibilityOutline, businessOutline, key } from 'ionicons/icons';
  import PlaceModalToolBar from './PlaceModalToolBar.vue';
  import CommentPlace from './CommentPlace.vue';
  import UserAvatar from './UserAvatar.vue';
  import CommentInput from './CommentInput.vue';
  import { Place } from '@/interfaces/place.interface';
  import 'swiper/css';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  
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
    CommentInput,
    IonSkeletonText,
    IonThumbnail,
    IonCol,
    IonRow,
    IonImg,
    Swiper,
    SwiperSlide
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
      presentingElement: null
    },
    setup(){
      const loaded = ref(false);
      const setLoaded = (state: boolean) => loaded.value = state;
      return { loaded, setLoaded };
    },
    data() {
      return {
        closeIcon: closeOutline,
        heartIcon: heartOutline,
        accessibilityIcon: accessibilityOutline,
        businessIcon: businessOutline,
        place: {} as Place,
        imageSource : process.env.VUE_APP_API_URL,
      };
    },
    mounted(){
      fetch(`${process.env.VUE_APP_API_URL}/place/show/${this.placeId}`)
        .then((response) => response.json())
        .then((data) => {
          this.place = data;
          this.setLoaded(true);
          console.log(this.place);
        })
        .catch((error) => {
          console.error(error);
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
  