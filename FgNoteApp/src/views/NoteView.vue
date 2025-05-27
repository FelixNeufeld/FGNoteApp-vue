<script setup lang="ts">
    import { ref } from 'vue';
    import CharacterPortrait from '@/components/CharacterPortrait.vue';
    import NoteSection from '@/components/NoteSection.vue';

    const defaultCharacter = ref("Alisa");
</script>

<template>
    <!-- <CharacterPortrait :character="defaultCharacter"></CharacterPortrait> -->
    <NoteSection></NoteSection>
</template>

<style>

</style>