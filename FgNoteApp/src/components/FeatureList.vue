<script setup lang="ts">
    interface Props{
        features: string[]
    }

    const props = defineProps<Props>();
</script>

<template>
    <div class="w-fit h-55 p-2 flex flex-col rounded-md place-content-between custom-background">
        <div v-for="feature in features" class="rounded-md p-1 hover:bg-yellow-400 cursor-pointer">
            <p class="text-red-500 text-xl">{{ feature }}</p>
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }   
</style>