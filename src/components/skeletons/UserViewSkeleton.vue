<template>
    <ion-page>
      <ion-content>
        <div class="header">
        <ion-row class="banner ion-justify-content-end" >
          <ion-col size="2">
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-avatar class="user-avatar">
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
          </ion-avatar>
        </ion-row>
        <ion-row class="ion-justify-content-center ion-align-items-center">
          <ion-text>
            <h1>
                <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
            </h1>
          </ion-text>
        </ion-row>
        <ion-row>
          <ion-col>
            <span>
                <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
            </span>
          </ion-col>
          <ion-col>
            <span>
                <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
            </span>
          </ion-col>
          <ion-col>
            <span>
                <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
            </span>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text>
              <p class="biography">
                <ion-skeleton-text :animated="true" width="100%" />
                <ion-skeleton-text :animated="true" width="80%" />
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </div>
      <div class="body">
        <ion-row>
          <h2>
            <ion-skeleton-text animated style="width: 100%; height: 20px;"></ion-skeleton-text>
          </h2>
          <swiper
          :freemode="true"
          :modules="modules">
          <swiper-slide v-for="n in 5" :key="n" >
            <PlaceCardSkeleton/>
          </swiper-slide>
          </swiper>
        </ion-row>
        <ion-row>
          <h2>
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
          </h2>
          <swiper
          :freemode="true"
          :modules="modules">
          <swiper-slide v-for="n in 5" :key="n" >
            <PlaceCardSkeleton/>
          </swiper-slide>
          </swiper>
        </ion-row>
        <ion-row>
          <h2>
            <ion-skeleton-text animated style="width: 100%; height: 100%;"></ion-skeleton-text>
          </h2>
          <swiper
          :freemode="true"
          :modules="modules">
          <swiper-slide v-for="n in 5" :key="n" >
            <PlaceCardSkeleton/>
          </swiper-slide>
          </swiper>
        </ion-row>
      </div>
      </ion-content>
    </ion-page>
  </template>

<script lang="ts">
import { IonContent, IonPage, IonRow, IonCol, IonAvatar, IonSkeletonText, IonText } from '@ionic/vue';
import PlaceCardSkeleton from '@/components/skeletons/PlaceCardSkeleton.vue';
import { Swiper,SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { defineComponent } from 'vue';

import 'swiper/css/free-mode';

export default defineComponent ({
  name: 'UserViewSkeleton',
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonAvatar,
    Swiper,
    SwiperSlide,
    IonSkeletonText,
    IonText,
    PlaceCardSkeleton
  },
    data() {
        return {
        modules: [FreeMode]
        }
    }
});
</script>