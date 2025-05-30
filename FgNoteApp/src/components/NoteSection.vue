<script setup lang="ts">
    import { onUnmounted, ref, type Ref } from 'vue'
    import MoveInput from './MoveInput.vue'
    import { bus } from "../bus.ts";
    import Move from './Move.vue';
    import type { Move as MoveModel } from '../model/Move';


    const sectionHeaders = ref(["First Section"]);
    //const sectionMovesMap = ref<Map<string, Move[]>>(new Map());
    const headerInput = ref('');
    const headerInputWarningActive = ref(false);
    const headerInputWarning = ref('Warning not set');
    const editMode = ref(false);
    const editingHeader = ref('');
    const editHeaderInput = ref('');
    const headerEditWarningActive = ref(false);
    const headerEditWarning = ref('Warning not set');
    const moveInputActive = ref(false);

    const exampleMove: MoveModel = {
        id: 1,
        inputs: "1",
        height: "High",
        frame: 10,
        frameBlock: +1,
        frameCounter: +8,
        frameHit: +8,
        properties: ["heat", "floorbreak"]
    };

    function addHeader(): void {
        if (headerInputWarningActive.value) {
            return;
        }

        sectionHeaders.value.push(headerInput.value);
        headerInput.value = '';
    }

    function checkForInputWarning(): void {
        if(headerInput.value === '') {
            headerInputWarning.value = "You have to name the section you want to add";
            headerInputWarningActive.value = true;
            return;
        }

        const foundHeader = sectionHeaders.value.find( (header) => header === headerInput.value);
        if(foundHeader) {
            headerInputWarning.value = "Section name already exists";
            headerInputWarningActive.value = true;
            return;
        }

        headerInputWarningActive.value = false;
    }

    function checkForEditWarning(): void {
        if(editHeaderInput.value === '') {
            headerEditWarning.value = "You have to name the section you want to edit";
            headerEditWarningActive.value = true;
            return;
        }

        const foundHeader = sectionHeaders.value.find( (header) => header === editHeaderInput.value);
        if(foundHeader) {
            headerEditWarning.value = "Section name already exists";
            headerEditWarningActive.value = true;
            return;
        }

        headerEditWarningActive.value = false;
    }

    function enterEditMode(header: string): void {
        editingHeader.value = header;
        editHeaderInput.value = header;
        editMode.value = true;
    }

    function confirmEdit(oldHeader: string): void {
        const index = sectionHeaders.value.findIndex(header => header === oldHeader);

        if(index !== -1 && !headerEditWarningActive) {
            sectionHeaders.value[index] = editHeaderInput.value;
            cancelEdit();
        }
    }

    function cancelEdit(): void {
        editMode.value = false;
        editingHeader.value = "";
    }

    function activateMoveInput(): void {
        moveInputActive.value = true;
    }

    bus.on('moveInputCancelled', () => {
        moveInputActive.value = false;
    })

    onUnmounted(() => {
        bus.off('moveInputCancelled')
    })
</script>

<template>
    <div v-if="moveInputActive" class="min-w-full min-h-full w-full h-full z-50 fixed inset-0">
        <MoveInput></MoveInput>
    </div>
    <div>
        <!-- Sections -->
        <div v-for="header in sectionHeaders" class="mb-5">
            <!-- Header -->
            <div class="flex flex-row items-center mb-1">
                <h1 v-if="!editMode || header !== editingHeader" class="text-red-500 mb-0.5 mr-2">{{ header }}</h1>
                <input v-if="editMode && header === editingHeader" v-model="editHeaderInput" @input="checkForEditWarning()" type="text" class="custom-background border-2 border-red-500 rounded-md mr-1 mb-1 p-1 text-red-500 outline-0 focus:border-yellow-500 focus:text-yellow-500">

                <div v-if="editMode && header === editingHeader" @click="confirmEdit(header)" class="rounded-md p-1 cursor-pointer border-2 border-transparent custom-background hover:border-yellow-500"> 
                    <img src="../assets/icons/check.svg">
                </div>
                <div v-if="editMode && header === editingHeader" @click="cancelEdit()" class="rounded-md p-1 cursor-pointer border-2 border-transparent custom-background hover:border-yellow-500"> 
                    <img src="../assets/icons/close.svg">
                </div>

                <div v-if="!editMode" @click="enterEditMode(header)" class="rounded-md p-1 cursor-pointer border-2 border-transparent custom-background hover:border-yellow-500"> 
                    <img src="../assets/icons/edit.svg">
                </div>

                <p v-if="headerEditWarningActive && header === editingHeader" class="text-red-500">{{ headerEditWarning }}</p>
            </div>
            <hr class="text-red-500 mb-5">
            <!-- Moves -->
             <Move :display-move="exampleMove"></Move>
            <div @click="activateMoveInput()" class="w-fit bg-red-500 p-1 mb-2 mt-2 rounded-md border-2 border-transparent cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">Add Move/Combo</div>
            <hr class="text-red-500 mb-5">
        </div>

        <!-- Adding Sections -->
        <div class="flex flex-col">
            <div class="flex flex-row">
                <input @input="checkForInputWarning()" v-model="headerInput" type="text" placeholder="Enter a new section" class="custom-background border-red-500 text-red-500 rounded-md border-2 mr-2 p-1 outline-0 focus:border-yellow-500 focus:text-yellow-500">
                <div @click="addHeader()" class="w-fit bg-red-500 p-1 rounded-md border-2 border-transparent cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">Create</div>
            </div>
            <p v-if="headerInputWarningActive" class="text-red-500">{{ headerInputWarning }}</p>
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
</style>