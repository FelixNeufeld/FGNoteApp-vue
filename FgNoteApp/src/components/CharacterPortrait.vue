<script setup lang="ts">
    import { computed } from 'vue'

    interface Props{
        character: string
    }

    const props = defineProps<Props>();
    const characterPortrait = computed(() => new URL(
        `../assets/images/Character Renders/${props.character}.png`,
        import.meta.url
        ).href
    )
</script>

<template>
    <div class="w-53 h-70 flex flex-col items-center">
        <p class="text-red-500 text-4xl"> {{ character }}</p>
        <div class="w-full h-full rounded-md border-red-500 border-3 overflow-hidden custom-background">
            <img :src="characterPortrait">
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
</style>