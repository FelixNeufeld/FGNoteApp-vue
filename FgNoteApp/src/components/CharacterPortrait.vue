<script setup lang="ts">
    import { computed, onUnmounted, ref } from 'vue';
    import { bus } from "../bus.ts";

    interface Props{
        character: string
    }

    const props = defineProps<Props>();
    const characterPortrait = ref<string>( makeUrl(props.character) )
    const characterName = ref<string>(props.character);

    function makeUrl(character:string) {
        return new URL(
            `../assets/images/Character Renders/${character}.png`,
            import.meta.url
        ).href
    }

    function changePortrait(character: string) {
        console.log('changed →', character)
        characterPortrait.value = makeUrl(character)
        characterName.value = character;
    }

    bus.on('characterSelected', changePortrait);

    onUnmounted(() => {
        bus.off('characterSelected', changePortrait)
    })
</script>

<template>
    <div class="w-53 h-70 flex flex-col items-center">
        <p class="text-red-500 text-4xl"> {{ characterName }}</p>
        <div class="w-full h-full rounded-md border-red-500 border-3 overflow-hidden custom-background">
            <img :src="characterPortrait" @characterSelected="changePortrait">
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
</style>