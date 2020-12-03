<template>
    <v-container>
        <VueMarkdown :source="mdContent"></VueMarkdown>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown-render';
import Apidoc from '@/assets/APIDoc.md';
import Prism from 'prismjs';

Prism.highlightAll();

@Component({
  components: {
    VueMarkdown,
  },
})
export default class API extends Vue {
    mdContent= Apidoc
}
</script>
