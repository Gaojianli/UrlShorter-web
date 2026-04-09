<template>
  <v-app>
    <v-app-bar color="#707C74">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer" />
      <v-app-bar-title class="text-white">URL Shorter</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="#707C74" temporary>
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.link"
          color="white"
          active-color="white"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="surface-light" elevation="4" style="min-height:unset">
      <div class="w-100 text-center font-weight-medium py-2">
        Copyright&copy; {{ new Date().getFullYear() }} —
        <strong>
          <a href="https://blog.gaojianli.me" style="text-decoration:none;color:inherit">Gaojianli</a>
        </strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);

const items = [
  { title: 'Shorter', icon: 'mdi-content-cut', link: '/' },
  { title: 'Revoke',  icon: 'mdi-delete',      link: '/revoke' },
  { title: 'API',     icon: 'mdi-api',          link: '/api' },
  { title: 'About',   icon: 'mdi-information',  link: '/about' },
];
</script>

<style>
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
