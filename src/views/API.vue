<template>
  <v-container class="flex-column">
    <API />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/components/API.vue'; // @ is an alias to /src

@Component({
  components: {
    API,
  },
})
export default class APIView extends Vue {}
</script>
