<template>
  <div>
    <div v-if="mountain === undefined">no mountain</div>
    <div v-else>
      {{ mountain }}
    </div>
  </div>
</template>
<script lang="ts">
import { useRoute, useLazyAsyncData } from "#imports";

export default defineComponent({
  fetchKey: "mountain",
  async asyncData({ route }) {
    const params = route.params;
    const res = await fetch("https://api.nuxtjs.dev/mountains");
    const mountains = await res.json();

    const mountain = mountains.find((mountain: any) => {
      return mountain.slug === params.id;
    });

    return {
      mountain,
    };
  },
});
</script>
