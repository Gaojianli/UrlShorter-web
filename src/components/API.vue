<template>
    <v-container>
        <VueMarkdown>{{mdContent}}</VueMarkdown>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import Apidoc from '@/assets/APIDoc.md';

@Component({
  components: {
    VueMarkdown,
  },
})
export default class API extends Vue {
    mdContent= Apidoc
}
</script>
