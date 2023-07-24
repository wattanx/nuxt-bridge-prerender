<script setup lang="ts">
const { data: mountains } = useLazyAsyncData('mountains', async () => {
  const res = await fetch('https://api.nuxtjs.dev/mountains')
  const _data = await res.json()
  return _data
})
</script>

<template>
  <ul>
    <li v-for="mountain in mountains">
      <NuxtLink :to="`/mountains/${mountain.slug}`">
        {{ mountain.slug }}
      </NuxtLink>
    </li>
  </ul>
</template>

