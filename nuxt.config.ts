import { defineNuxtConfig } from "@nuxt/bridge";

export default defineNuxtConfig({
  bridge: {
    capi: true,
    meta: true,
    nitro: true,
  },
  nitro: {
    devProxy: {
      "/api": "https://pokeapi.co/api/",
    },
  },
  head: {
    title: "Nuxt Bridge",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "test" },
    ],
  },
  // plugins: ["~/plugins/route.ts"],
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }
      const res = await fetch("https://api.nuxtjs.dev/mountains");
      const data = await res.json();

      if (nitroConfig.prerender?.routes === undefined) {
        return;
      }

      nitroConfig.prerender.routes = data.map((mount: any) => {
        return `/mountains/${mount.slug}`;
      });
    },
  },
  experimental: {
    payloadExtraction: true,
  },
});
