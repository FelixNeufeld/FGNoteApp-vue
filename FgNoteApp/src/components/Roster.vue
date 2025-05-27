<script setup lang="ts">
    import CharacterTile from './CharacterTile.vue';
    import { ref } from "vue";

    //TODO: Make dynamic
    const characterList= ["Alisa", "Anna", "Asuka", "Azucena", "Bryan", "Claudio", "Clive", "Devil-Jin", "Dragunov", "Eddy", "Feng", "Heihachi", "Hwoarang", "Jack-8", "Jin", "Jun", "Kazuya", "King", "Kuma", "Lars", "Law", "Lee", "Leo", "Leroy", "Lidia", "Lili", "Nina", "Panda", "Paul", "Raven", "Reina", "Shaheen", "Steve", "Victor", "Xiaoyu", "Yoshimitsu", "Zafina"];
    const characterAmount: number = 37;
    const rowSize: number = 12;
    const columnSize: number = 2;
    const pageSize: number = rowSize * columnSize;
    const pages: number = Math.ceil(characterAmount/pageSize);
    let activePage = ref(1);

    function pageIncrease(): void {
        if(activePage.value + 1 <= pages) {
            activePage.value++;
        }
    }

    function pageDecrease(): void {
        if(activePage.value - 1 > 0) {
            activePage.value--;
        }
    }
</script>

<template>
    <div class="flex flex-row">
        <div>
            <div v-for="i in columnSize" class="flex flex-row mb-1">
                <CharacterTile v-for="j in rowSize" :character="characterList[((i-1)*rowSize) + (j-1) + ((activePage-1)*pageSize)]" class="mr-1">
                </CharacterTile>
            </div>
        </div>
        <div class="flex flex-row items-center">
            <div class="mr-1">
                <div @click="pageDecrease()" class="w-9 h-9 mb-1 flex rounded-md justify-center border-2 border-transparent hover:border-red-500 cursor-pointer custom-background">
                    <img v-if="activePage-1 > 0" src="../assets/icons/arrow-up.svg" class="w-2/3">
                </div>
                <div @click="pageIncrease()" class="w-9 h-9 flex rounded-md justify-center border-2 border-transparent hover:border-red-500 cursor-pointer custom-background">
                    <img v-if="activePage+1 <= pages" src="../assets/icons/arrow-down.svg" class="w-2/3">
                </div>
            </div>
            <div class="flex flex-col items-center">
                <div v-for="i in pages" class="flex flex-row items-center">
                    <!-- Center dot with number -->
                    <div v-if="i === activePage" class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div v-else class="w-3 h-3 rounded-full custom-background"></div>

                    <div v-if="i === activePage" class="text-red-500">{{ i }}</div>
                    <div v-else class="custom-text">{{ i }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
    .custom-text{
        color: #22232A;
    }
</style>