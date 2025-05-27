<script setup lang="ts">
  import { ref } from 'vue';

  import Roster from '../components/Roster.vue';
  import GameList from '../components/GameList.vue';
  import FeatureList from '../components/FeatureList.vue';
  import CharacterPortrait from '../components/CharacterPortrait.vue';

  const defaultCharacter = ref("Alisa");
</script>

<template>
  <div class="min-h-screen w-min-screen p-6">
    <div class="grid items-start grid-layout">
      <div class="col-start-1 col-end-2 row-start-1 row-end-2">
          <GameList> </GameList>
      </div>

      <hr class="text-red-500 border-1 col-start-1 col-end-7 row-start-2 row-end-3">

      <div class="col-start-1 col-end-7 row-start-3 row-end-8">
          <FeatureList> </FeatureList>
      </div>

      <div class="col-start-8 col-end-10 row-start-1 row-end-9">
          <CharacterPortrait :character="defaultCharacter"></CharacterPortrait>
      </div>

      <div class="col-start-2 col-end-9 row-start-8 row-end-12">
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
    grid-template-rows: 10vh 2vh 10vh 10vh 10vh 10vh 10vh 10vh 10vh 8vh;
    grid-template-columns: 10vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw;
  }
</style>
