<template>
  <v-app>
    <nav>
      <v-app-bar app color="#707C74" dark>
        <v-app-bar-nav-icon
          class="white--text"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <div>
          <span class="mr-2">URL Shorter</span>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer color="#707C74" v-model="drawer" app dark>
        <v-list dense nav class="py-0">
          <router-link v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </nav>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer
      padless
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >    Copyright©
        {{ new Date().getFullYear() }} — <strong><a href="https://blog.gaojianli.me" style="text-decoration: none;color:black">Gaojianli</a></strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
    drawer: false,
    items: [
      { title: 'Shorter', icon: 'mdi-content-cut', link: '/' },
      { title: 'Revoke', icon: 'mdi-delete', link: '/revoke' },
      { title: 'API', icon: 'mdi-api', link: '/api' },
      { title: 'About', icon: 'mdi-information', link: '/about' },
    ],
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
