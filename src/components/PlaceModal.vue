<template>
    <ion-modal :is-open="isOpen" :presenting-element="presentingElement">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button @click="$emit('close')">
              <ion-icon slot="icon-only" :icon="closeIcon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content v-if="place" :fullscreen="true" class="ion-padding-bottom">
        <ion-col>
              <h1>{{ place.title }}</h1>
              <ion-text>
                <p class="place-town">
                  {{ place.town }}
                </p>
              </ion-text>
        </ion-col>
        <swiper class="place-swiper">
          <swiper-slide v-for="(picture, index) in place.PicturePlaces" :key="index">
            <ion-img v-if="imageSource+'/'+picture.url" :src="imageSource+'/'+picture.url" class="place-image" loading="lazy" />
          </swiper-slide>
        </swiper>
        <ion-card-content class="ion-margin-bottom">
          <ion-row class="posted-by">
                  <UserAvatar :userAvatar="imageSource+'/'+place.postedBy.avatar" />
                <ion-col>
                  <p class="username">
                    <router-link :to="{ name: 'user', params: { id: place.postedBy.id } }">{{ place.postedBy.pseudonym }}</router-link>
                  </p>
                  <p class="posted-at">
                    {{ placeDate }}
                  </p>
                </ion-col>
                <ion-col>
                  <LikeButton :placeId="place.id" :initialIsLiked="isFavorited(place.id)" :initialLikeCount="likeCount"></LikeButton>
                </ion-col>
          </ion-row>
          <hr>
          <ion-row class="place-data">
            <ion-col class="flex">
              <GlimpseButton />
            </ion-col>
            <ion-col class="flex">
              <ion-icon :icon="accessibilityIcon"></ion-icon>
              <span>{{ place.Accessibility.label }}</span>
            </ion-col>
            <ion-col class="flex">
              <ion-icon :icon="businessIcon"></ion-icon>
              <span>{{ place.Category.label }}</span>
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
            <KeywordPill v-for="keyword in keywords" :key="keyword" :keyword="keyword" />
          </div>
          <div class="share">
            <ShareButton :place="place" />
          </div>
          <hr>
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
  </template>
  
  <script lang="ts">
  import { IonModal, IonHeader, IonToolbar, IonContent, IonCardContent, IonIcon, IonButton, IonButtons, IonCol, IonRow, IonImg, IonText } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { closeOutline, heartOutline, accessibilityOutline, businessOutline } from 'ionicons/icons';
  import CommentPlace from './CommentPlace.vue';
  import UserAvatar from './UserAvatar.vue';
  import CommentInput from './CommentInput.vue';
  import KeywordPill from './KeywordPill.vue';
  import { Place } from '@/interfaces/place.interface';
  import 'swiper/css';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import ShareButton from './ShareButton.vue';
  import LikeButton from './LikeButton.vue';
  import GlimpseButton from './GlimpseButton.vue';
  import { usePlaceStore } from '@/stores';
  
  const store = usePlaceStore();

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
    CommentPlace,
    UserAvatar,
    CommentInput,
    KeywordPill,
    IonCol,
    IonRow,
    IonImg,
    Swiper,
    SwiperSlide,
    ShareButton,
    GlimpseButton,
    IonText,
    LikeButton
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
    watch: {
      isOpen(newVal) {
        if (newVal) {
          this.fetchPlace();
        }
      }
    },
    computed: {
      keywords() {
        return this.place.keyword.split(',');
      },
      placeDate() {
        const date = new Date(this.place.created_at);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
      likeCount() {
        if(this.place.FavoriteUsers) {
          return this.place.FavoriteUsers.length;
        }
        else {
          return 0;
        }
      }
    },
    methods: {
      isFavorited(placeId: number) {
        const connectedUser = store.getUser(Number(localStorage.userId));
        if(connectedUser?.FavoritePlaces?.find(place => place.id === placeId)){
          return true;
        }
        else {
          return false;
        }
      },
      fetchPlace(){
        fetch(`${process.env.VUE_APP_API_URL}/place/show/${this.placeId}`)
        .then((response) => response.json())
        .then((data) => {
          this.place = data;
          this.setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
      }
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
  .posted-by ion-col {
    margin-left: 1em;
  }

  .place-town {
    margin: 0 20px;
    font: var(--ion-title-small);
  }

  h1 {
    font: var(--ion-title-big);
    margin: 0 20px;
  }

  h2 {
    font: var(--ion-title-small);
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
  
  .swiper {
    margin : 0 20px;
    border-radius: 0.5em;
  }

  .likes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .description {
    margin-top: 10px;
    font: var(--ion-text-paragraph);
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .place-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .keywords {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2em;
  }

  .share {
    margin-top: 2em;
  }

  hr {
    background-color: var(--ion-color-primary);
    margin: 2em 0;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }

  ion-modal {
    --border-radius: 16px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  ion-modal::part(backdrop) {
    background: rgba(209, 213, 219);
    opacity: 1;
  }

  ion-modal ion-toolbar {
    --background: var(--ion-color-light);
    --color: var(--ion-color-primary);
  }
  </style>
  