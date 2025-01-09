<script lang="ts" setup>
import { NResult, NButton } from 'naive-ui';
</script>

<template>
    <div class="w-full h-full flex items-center justify-center">
        <NResult status="404" title="404 你什么也找不到" description="生活总归带点荒谬">
            <template #footer>
                <NButton @click="$router.replace('/')">看看别的</NButton>
            </template>
        </NResult>
    </div>
</template>

<style></style>
