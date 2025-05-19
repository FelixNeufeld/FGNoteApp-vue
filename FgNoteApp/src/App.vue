<script setup lang="ts">
  import { ref } from 'vue';

  import Roster from './components/Roster.vue';
  import GameList from './components/GameList.vue';
  import FeatureList from './components/FeatureList.vue';
  import CharacterPortrait from './components/CharacterPortrait.vue';
  import NoteList from './components/NoteList.vue';

  const firstFeatureList = ref(["Create Note", "My Notes", "Browse Notes"]);
  const defaultCharacter = ref("Alisa");
</script>

<template>
  <div class="min-h-screen w-min-screen p-6">
    <div class="grid items-start grid-layout">
      <div class="col-start-1 col-end-1 row-start-1 row-end-1">
          <GameList> </GameList>
      </div>

      <hr class="text-red-500 border-1 col-start-1 col-end-7 row-start-2 row-end-2">

      <div class="col-start-1 col-end-4 row-start-3 row-end-3">
          <FeatureList :features="firstFeatureList"> </FeatureList>
      </div>

      <div class="col-start-5 col-end-6 row-start-3 row-end-3">
        <NoteList> </NoteList>
      </div>

      <div class="col-start-8 col-end-8 row-start-1 row-end-3">
          <CharacterPortrait :character="defaultCharacter"></CharacterPortrait>
      </div>

      <div class="col-start-3 col-end-8 row-start-5 row-end-5">
          <Roster> </Roster>
      </div>
    </div>
  </div>
</template>

<style>
  html, body, #app {
    background-color: #15161A;
  }

  .grid-layout {
    grid-template-rows: 8vh 3vh 28vh 22vh;
    grid-template-columns: 7vw 3vw 3vw 3vw 21vw 30vw 5vw 10vw;
  }
</style>
