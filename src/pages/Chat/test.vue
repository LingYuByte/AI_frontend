<script setup lang="ts">
import {render} from '@/utils/MarkdownIt/markdown'
let x = ref(``)
</script>
<template>
    <div style="width: 40vw;height: 50vh;" v-html="render(x)">

    </div>
    <textarea v-model="x">

    </textarea>
</template>