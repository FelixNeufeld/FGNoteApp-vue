<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { bus } from "../bus.ts";

    interface Props {
        character: string
    }

    const props = defineProps<Props>();
    const characterIcon = computed(() => new URL(
        `../assets/images/Character Icons/${props.character}-Icon.png`,
        import.meta.url
        ).href
    )
    const imgFound = ref(true);

    watch(characterIcon, () => {
        imgFound.value = true;
    })

    function onImgError() {
        imgFound.value = false;
    }

    function emitBus() {
        bus.emit('characterSelected', props.character);
    }
</script>

<template>
    <div @click="emitBus" class="w-15 h-20 border-3 rounded-md border-red-500 hover:border-yellow-400 cursor-pointer custom-background">
        <img v-if="imgFound" :src="characterIcon" @error="onImgError()" class="w-full">
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
</style>