<script setup lang="ts">
    import { computed } from 'vue';
    const games: string[] = ["Tekken", "Street Fighter"];
    
    const gameIcons = computed<string[]>(() => games.map(name =>
        new URL(
            `../assets/images/Games/${name}.png`,
            import.meta.url
            ).href
        )
    )
</script>

<template>
    <div class="flex flex-row">
        <div v-for="i in games.length" class="w-8 h-8 rounded-md flex mr-1 border-transparent border-2 hover:border-yellow-400 cursor-pointer custom-background">
            <img :src="gameIcons[i-1]">
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
</style>