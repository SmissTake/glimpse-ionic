<template>
  <ion-page>
    <ion-content>
      <div class="example-content">
        <PlaceCard :place="places[0]" />
        <PlaceCard :place="places[1]" />
        <PlaceCard :place="places[2]" />
        <!-- ... -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PlaceCard from '@/components/PlaceCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  components: {
    PlaceCard,
  },
  data() {
    return {
      places: [
        {
          id: 0,
          title: 'Beach',
          category: 'Outdoor',
          imageUrl: 'https://via.placeholder.com/500x300',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
        {
          id: 1,
          title: 'Beach',
          category: 'Outdoor',
          imageUrl: 'https://via.placeholder.com/500x300',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
        {
          id: 2,
          title: 'Beach',
          category: 'Outdoor',
          imageUrl: 'https://via.placeholder.com/500x300',
          userId: 1,
          username: 'John Doe',
          likes: 10,
        },
      ],
    };
  },
});
</script>