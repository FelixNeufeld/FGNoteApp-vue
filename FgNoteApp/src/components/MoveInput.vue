<script setup lang="ts">
    import { ref, watch } from "vue";
    import { bus } from "../bus.ts";
    import { textToNotationImages } from "../util/NotationTranslator.ts";

    const notationImages = import.meta.glob('../assets/images/Notation/*.svg', {
        eager: true,
        import: 'default',
    }) as Record<string, string>;

    const movementButtons = ref([
        notationImages['../assets/images/Notation/ub.svg'],
        notationImages['../assets/images/Notation/u.svg'],
        notationImages['../assets/images/Notation/uf.svg'],
        notationImages['../assets/images/Notation/b.svg'],
        notationImages['../assets/images/Notation/n.svg'],
        notationImages['../assets/images/Notation/f.svg'],
        notationImages['../assets/images/Notation/db.svg'],
        notationImages['../assets/images/Notation/d.svg'],
        notationImages['../assets/images/Notation/df.svg'],
    ]);

    const holdMovementButtons = ref([
        notationImages['../assets/images/Notation/UB(hold).svg'],
        notationImages['../assets/images/Notation/U(hold).svg'],
        notationImages['../assets/images/Notation/UF(hold).svg'],
        notationImages['../assets/images/Notation/B(hold).svg'],
        notationImages['../assets/images/Notation/F(hold).svg'],
        notationImages['../assets/images/Notation/DB(hold).svg'],
        notationImages['../assets/images/Notation/D(hold).svg'],
        notationImages['../assets/images/Notation/DF(hold).svg'],
    ])

    const attackButtons = ref([
        notationImages['../assets/images/Notation/1.svg'],
        notationImages['../assets/images/Notation/2.svg'],
        notationImages['../assets/images/Notation/3.svg'],
        notationImages['../assets/images/Notation/4.svg'],
        notationImages['../assets/images/Notation/1+2.svg'],
        notationImages['../assets/images/Notation/1+3.svg'],
        notationImages['../assets/images/Notation/1+4.svg'],
        notationImages['../assets/images/Notation/2+3.svg'],
        notationImages['../assets/images/Notation/2+4.svg'],
        notationImages['../assets/images/Notation/3+4.svg'],
        notationImages['../assets/images/Notation/1+2+3.svg'],
        notationImages['../assets/images/Notation/1+2+4.svg'],
        notationImages['../assets/images/Notation/1+3+4.svg'],
        notationImages['../assets/images/Notation/2+3+4.svg'],
        notationImages['../assets/images/Notation/1+2+3+4.svg'],
    ]);

    const miscButtons = ref([
        notationImages['../assets/images/Notation/,.svg'],
        notationImages['../assets/images/Notation/~.svg'],
        notationImages['../assets/images/Notation/BT.svg'],
        notationImages['../assets/images/Notation/CH.svg'],
        notationImages['../assets/images/Notation/SS.svg'],
        notationImages['../assets/images/Notation/SSL.svg'],
        notationImages['../assets/images/Notation/SSR.svg'],
        notationImages['../assets/images/Notation/ws.svg'],
    ]);

    const inputDisplay = ref<string[]>([]);
    const holdMovementActive = ref(false);
    const textInput = ref("");

    function cancelInput(): void {
        bus.emit('moveInputCancelled');
    }

    function confirmInput(): void {

    }

    function addMoveToTextInput(move: string): void {
        textInput.value = textInput.value.concat(move);
    }

    function backspaceDisplay(): void {
        textInput.value = textInput.value.slice(0, -1);
    }

    //TODO: Confirm Dialog
    function clearDisplay(): void {
        textInput.value = "";
    }

    function toggleHoldMovement(): void {
        holdMovementActive.value = !holdMovementActive.value;
    }

    function refreshDisplay(): void {
        const result = textToNotationImages(textInput.value);
        const images = [];
        for(let i = 0; i < result.length; i++) {
            images.push(notationImages[result[i]]);
        }
        inputDisplay.value = images;
    }

    watch(textInput, () => {
        refreshDisplay();
    });
</script>

<template>
    <div class="fixed w-full h-full grid component-grid-layout z-10">
        <!-- Display and Textinput -->
         <div class="flex flex-row col-start-2 col-end-8 row-start-2 row-end-3">
            <div class="w-full rounded-md p-1 mr-1 flex flex-row items-center overflow-x-scroll custom-background">
                <div v-for="input in inputDisplay">
                    <img :src="input">
                </div>
            </div>
            <div class="flex flex-col justify-center items-center">
                <div @click="backspaceDisplay()" class="w-fit custom-background rounded-md p-1 mb-1 border-2 border-transparent cursor-pointer hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500">
                    <img src="../assets/icons/backspace.svg">
                </div>
                <div @click="clearDisplay()" class="w-fit custom-background rounded-md p-1 border-2 border-transparent cursor-pointer hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500">
                    <img src="../assets/icons/delete.svg">
                </div>
            </div>
         </div>
         <input type="text" v-model="textInput" class="col-start-2 col-end-8 row-start-4 row-end-5 w-full custom-background border-red-500 text-red-500 rounded-md border-2 mr-2 p-1 outline-0 focus:border-yellow-500 focus:text-yellow-500">

        <!-- Movementbuttons -->
         <div class="col-start-3 col-end-4 row-start-6 row-end-7">
            <div v-if="!holdMovementActive" class="grid movement-grid-layout">
                <div @click="addMoveToTextInput('ub')" class="col-start-1 col-end-2 row-start-1 row-end-2 input-button">
                    <img :src="movementButtons[0]">
                </div>
                <div @click="addMoveToTextInput('u')" class="col-start-2 col-end-3 row-start-1 row-end-2 input-button">
                    <img :src="movementButtons[1]">
                </div>
                <div @click="addMoveToTextInput('uf')" class="col-start-3 col-end-4 row-start-1 row-end-2 input-button">
                    <img :src="movementButtons[2]">
                </div>
                <div @click="addMoveToTextInput('b')" class="col-start-1 col-end-2 row-start-2 row-end-3 input-button">
                    <img :src="movementButtons[3]">
                </div>
                <div @click="addMoveToTextInput('n')" class="col-start-2 col-end-3 row-start-2 row-end-3 input-button">
                    <img :src="movementButtons[4]">
                </div>
                <div @click="addMoveToTextInput('f')" class="col-start-3 col-end-4 row-start-2 row-end-3 input-button">
                    <img :src="movementButtons[5]">
                </div>
                <div @click="addMoveToTextInput('db')" class="col-start-1 col-end-2 row-start-3 row-end-4 input-button">
                    <img :src="movementButtons[6]">
                </div>
                <div @click="addMoveToTextInput('d')" class="col-start-2 col-end-3 row-start-3 row-end-4 input-button">
                    <img :src="movementButtons[7]">
                </div>
                <div @click="addMoveToTextInput('df')" class="col-start-3 col-end-4 row-start-3 row-end-4 input-button">
                    <img :src="movementButtons[8]">
                </div>
            </div>
            <div v-if="holdMovementActive" class="grid movement-grid-layout">
                <div @click="addMoveToTextInput('UB')" class="col-start-1 col-end-2 row-start-1 row-end-2 input-button">
                    <img :src="holdMovementButtons[0]">
                </div>
                <div @click="addMoveToTextInput('U')" class="col-start-2 col-end-3 row-start-1 row-end-2 input-button">
                    <img :src="holdMovementButtons[1]">
                </div>
                <div @click="addMoveToTextInput('UF')" class="col-start-3 col-end-4 row-start-1 row-end-2 input-button">
                    <img :src="holdMovementButtons[2]">
                </div>
                <div @click="addMoveToTextInput('B')" class="col-start-1 col-end-2 row-start-2 row-end-3 input-button">
                    <img :src="holdMovementButtons[3]">
                </div>
                <div @click="addMoveToTextInput('n')" class="col-start-2 col-end-3 row-start-2 row-end-3 input-button">
                    <img :src="movementButtons[4]">
                </div>
                <div @click="addMoveToTextInput('F')" class="col-start-3 col-end-4 row-start-2 row-end-3 input-button">
                    <img :src="holdMovementButtons[4]">
                </div>
                <div @click="addMoveToTextInput('DB')" class="col-start-1 col-end-2 row-start-3 row-end-4 input-button">
                    <img :src="holdMovementButtons[5]">
                </div>
                <div @click="addMoveToTextInput('D')" class="col-start-2 col-end-3 row-start-3 row-end-4 input-button">
                    <img :src="holdMovementButtons[6]">
                </div>
                <div @click="addMoveToTextInput('DF')" class="col-start-3 col-end-4 row-start-3 row-end-4 input-button">
                    <img :src="holdMovementButtons[7]">
                </div>
            </div>
            <div @click="toggleHoldMovement()" class="w-full input-button text-white">
                Hold
            </div>
         </div>

         <!-- AttackButtons -->
          <div class="col-start-5 col-end-6 row-start-6 row-end-7">
            <div class="grid attack-grid-layout">
                <div @click="addMoveToTextInput('1')" class="col-start-1 col-end-2 row-start-1 row-end-2 input-button">
                    <img :src="attackButtons[0]">
                </div>
                <div @click="addMoveToTextInput('2')" class="col-start-2 col-end-3 row-start-1 row-end-2 input-button">
                    <img :src="attackButtons[1]">
                </div>
                <div @click="addMoveToTextInput('3')" class="col-start-1 col-end-2 row-start-2 row-end-3 input-button">
                    <img :src="attackButtons[2]">
                </div>
                <div @click="addMoveToTextInput('4')" class="col-start-2 col-end-3 row-start-2 row-end-3 input-button">
                    <img :src="attackButtons[3]">
                </div>
                <div @click="addMoveToTextInput('1+2')" class="col-start-4 col-end-5 row-start-1 row-end-2 input-button">
                    <img :src="attackButtons[4]">
                </div>
                <div @click="addMoveToTextInput('1+3')" class="col-start-5 col-end-6 row-start-1 row-end-2 input-button">
                    <img :src="attackButtons[5]">
                </div>
                <div @click="addMoveToTextInput('1+4')" class="col-start-6 col-end-7 row-start-1 row-end-2 input-button">
                    <img :src="attackButtons[6]">
                </div>
                <div @click="addMoveToTextInput('2+3')" class="col-start-7 col-end-8 row-start-1 row-end-2 input-button">
                    <img :src="attackButtons[7]">
                </div>
                <div @click="addMoveToTextInput('2+4')" class="col-start-4 col-end-5 row-start-2 row-end-3 input-button">
                    <img :src="attackButtons[8]">
                </div>
                <div @click="addMoveToTextInput('3+4')" class="col-start-5 col-end-6 row-start-2 row-end-3 input-button">
                    <img :src="attackButtons[9]">
                </div>
                <div @click="addMoveToTextInput('1+2+3')" class="col-start-6 col-end-7 row-start-2 row-end-3 input-button">
                    <img :src="attackButtons[10]">
                </div>
                <div @click="addMoveToTextInput('1+2+4')" class="col-start-7 col-end-8 row-start-2 row-end-3 input-button">
                    <img :src="attackButtons[11]">
                </div>
                <div @click="addMoveToTextInput('1+3+4')" class="col-start-4 col-end-5 row-start-3 row-end-4 input-button">
                    <img :src="attackButtons[12]">
                </div>
                <div @click="addMoveToTextInput('2+3+4')" class="col-start-5 col-end-6 row-start-3 row-end-4 input-button">
                    <img :src="attackButtons[13]">
                </div>
                <div @click="addMoveToTextInput('1+2+3+4')" class="col-start-6 col-end-7 row-start-3 row-end-4 input-button">
                    <img :src="attackButtons[14]">
                </div>
            </div>
          </div>

         <!-- Misc. Buttons -->
          <div class="col-start-7 col-end-8 row-start-6 row-end-7">
            <div class="grid misc-grid-layout">
                <div @click="addMoveToTextInput(',')" class="col-start-1 col-end-2 row-start-1 row-end-2 input-button">
                    <img :src="miscButtons[0]">
                </div>
                <div @click="addMoveToTextInput('~')" class="col-start-2 col-end-3 row-start-1 row-end-2 input-button">
                    <img :src="miscButtons[1]">
                </div>
                <div @click="addMoveToTextInput('CH')" class="col-start-1 col-end-2 row-start-2 row-end-3 input-button">
                    <img :src="miscButtons[3]">
                </div>
                <div @click="addMoveToTextInput('BT')" class="col-start-2 col-end-3 row-start-2 row-end-3 input-button">
                    <img :src="miscButtons[2]">
                </div>
                <div @click="addMoveToTextInput('SS')" class="col-start-1 col-end-2 row-start-3 row-end-4 input-button">
                    <img :src="miscButtons[4]">
                </div>
                <div @click="addMoveToTextInput('SSL')" class="col-start-2 col-end-3 row-start-3 row-end-4 input-button">
                    <img :src="miscButtons[5]">
                </div>
                <div @click="addMoveToTextInput('SSR')" class="col-start-3 col-end-4 row-start-3 row-end-4 input-button">
                    <img :src="miscButtons[6]">
                </div>
                <div @click="addMoveToTextInput('ws')" class="col-start-1 col-end-2 row-start-4 row-end-5 input-button">
                    <img :src="miscButtons[7]">
                </div>
            </div>
          </div>

         <!-- Confirm&Cancel Buttons -->
        <div class="flex flex-row justify-between col-start-5 col-end-6 row-start-7 row-end-8">
            <div @click="confirmInput()" class="w-1/3 flex justify-center items-center text-white bg-blue-500 rounded-md p-1 border-2 border-transparent cursor-pointer hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500">
                Confirm
            </div>
            <div @click="cancelInput()" class="w-1/3 flex justify-center items-center text-white bg-red-500 rounded-md p-1 border-2 border-transparent cursor-pointer hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500">
                Cancel
            </div>
        </div>
    </div>
    <div class="fixed w-full h-full z-0 dark-transparent-background">

    </div>
</template>

<style>
    .component-grid-layout {
        grid-template-columns: 5vw 5vw 13vw 15vw 23vw 15vw 15vw 7vw;
        grid-template-rows: 5vh 18vh 2vh 10vh 3vh 40vh 10vh 10vh;
    }

    .movement-grid-layout {
        grid-template-rows: 10vh 10vh 10vh;
        grid-template-columns: 10vh 10vh 10vh;
    }

    .attack-grid-layout {
        grid-template-columns: 10vh 10vh 2vw 10vh 10vh 10vh 10vh;
        grid-template-rows: 10vh 10vh 10vh;
    }

    .misc-grid-layout {
        grid-template-columns: 10vh 10vh 10vh;
        grid-template-rows: 10vh 10vh 10vh 10vh;
    }

    .input-button {
        background-color: #22232A;
        border-width: 2px;
        border-color: transparent;
        border-radius: 0.375rem;
        border-style: solid;
        display: flex;
        justify-content: center;
        padding: 0.25rem;
        margin-bottom: 0.25rem;
        margin-right: 0.25rem;
        cursor: pointer;
    }

    .input-button:hover {
        border-color: #F59E0B;
    }

    .custom-background {
        background-color: #22232A;
    }

    .dark-transparent-background {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>