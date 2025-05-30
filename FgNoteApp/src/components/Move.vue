<script setup lang="ts">
    import { onMounted, onUnmounted, ref, type Ref } from 'vue';
    import { textToNotationImages } from '@/util/NotationTranslator';
    import { propertiesToImages } from '@/util/PropertieTranslator';
    import type { Move } from '../model/Move';
    import MoveInput from './MoveInput.vue';
    import { bus } from '../bus';

    interface Props{
        displayMove: Move
    }

    const notationImages = import.meta.glob('../assets/images/Notation/*.svg', {
        eager: true,
        import: 'default',
    }) as Record<string, string>;

    const propertiesImages = import.meta.glob('../assets/images/Properties/*.png', {
        eager: true,
        import: 'default',
    }) as Record<string, string>;

    const props = defineProps<Props>();
    const displayMove = ref<Move>(props.displayMove);
    const inputImages = ref<string[]>([]);
    const propertieImages = ref<string[]>([]);
    const editMode = ref(false);
    const inputEditMode = ref(false);
    const emptyMove: Move = {
        id: 0,
        inputs: '',
        height: '',
        frame: 0,
        frameBlock: 0,
        frameCounter: 0,
        frameHit: 0,
        properties: [],
    };

    const editMove = ref<Move>(emptyMove);

    const heightOptions = [
        { label: 'High', value: 'High' },
        { label: 'Mid', value: 'Mid' },
        { label: 'Low', value: 'Low' },
        { label: 'Special Mid', value: 'Special Mid' }
    ]

    const propertieOptions = [
        { label: 'Balcony break', value: 'balconybreak' },
        { label: 'Chip damage', value: 'chip' },
        { label: 'Floor blast', value: 'floorblast' },
        { label: 'Floor break', value: 'floorbreak' },
        { label: 'Force Crouch', value: 'forcecrouch' },
        { label: 'Heat engager', value: 'heat' },
        { label: 'Homing', value: 'homing' },
        { label: 'Powercrush', value: 'powercrush' },
        { label: 'Tornado', value: 'tornado' },
        { label: 'Wall blast', value: 'wallblast' },
        { label: 'Wall bound', value: 'wallbound' },
        { label: 'Wall break', value: 'wallbreak' },
    ]

    onMounted(() => {
        initialize();
    })

    function initialize(): void {
        mapInputToImages();
        mapPropertiesToImages();
    }

    function mapInputToImages(): void {
        const result = textToNotationImages(displayMove.value.inputs);
        result.forEach((img) => { inputImages.value.push(notationImages[img]) });
    }

    function mapPropertiesToImages(): void {
        propertieImages.value = [];
        const result = propertiesToImages(displayMove.value.properties);
        result.forEach((img) => { propertieImages.value.push(propertiesImages[img]) });
    }

    function getPropertieImageByPropertieString(propertie: string) {
        const propertieList: string[] = [propertie];
        const result = propertiesToImages(propertieList)
        return propertieList[0];
    }

    function toggleEditMode(): void {
        if(!editMode.value) {
            editMove.value = displayMove.value;
        }
        editMode.value = !editMode.value;
    }

    function saveEdit(): void {
        displayMove.value = editMove.value ?? displayMove.value;
        mapPropertiesToImages();
        editMode.value = false;
    }

    function enterInputEditMode(): void {
        inputEditMode.value = true;
    }

    bus.on('moveInputCancelled', () => {
        inputEditMode.value = false;
    })

    onUnmounted(() => {
        bus.off('moveInputCancelled')
    })
</script>

<template>
    <div v-if="inputEditMode" class="min-w-full min-h-full w-full h-full z-50 fixed inset-0">
        <MoveInput></MoveInput>
    </div>
    <div class="w-fit flex flex-row items-center mb-1">
        <div class="w-fit h-auto flex flex-row text-white rounded-md border-red-500 border-2 p-1 mr-2 custom-background">
            <!-- Move Height -->
            <div v-if="!editMode" class="mr-2">
                {{ displayMove.height }}
            </div>
            <div v-if="editMode" class="flex-shrink-0 mr-2">
                <select v-model="editMove.height" class="w-auto min-w-[80px] px-1">
                    <option v-for="option in heightOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>
            <!-- Move Properties -->
            <div v-if="!editMode" v-for="propertie in propertieImages" class="w-7 h-7">
                <img :src="propertie">
            </div>
            <div v-if="editMode" v-for="propertie in editMove.properties" class="flex-shrink-0 mr-2">
                <select v-model="editMove.properties[editMove.properties.indexOf(propertie)]" class="w-auto min-w-[80px] px-1 text-white custom-background">
                    <option v-for="option in propertieOptions" :key="option.value" :value="option.value" class="text-white custom-background">
                        {{ option.label }}
                    </option>
                </select>
            </div>
        </div>
        <!-- Edit Mode -->
        <div v-if="!editMode" @click="toggleEditMode()" class="w-fit h-full bg-red-500 p-1 rounded-md border-2 border-transparent cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">
            Edit Move
        </div>
        <div v-if="editMode" @click="saveEdit()" class="w-fit h-full bg-blue-500 p-1 mr-2 rounded-md border-2 border-transparent cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">
            Save Changes
        </div>
        <div v-if="editMode" @click="toggleEditMode()" class="w-fit h-full bg-blue-500 p-1 rounded-md border-2 border-transparent cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">
            Discard Changes
        </div>
    </div>

    <!-- Input Display -->
    <div class="static flex flex-row items-center justify-between w-4/5 h-full rounded-md border-red-500 border-2 p-3 mb-1 custom-background">
        <div v-for="image in inputImages">
            <img :src="image">
        </div>
        <div v-if="editMode" @click="enterInputEditMode()" class="rounded-md p-1 cursor-pointer border-2 border-red-500 custom-background hover:border-yellow-500"> 
            <img src="../assets/icons/edit.svg">
        </div>
    </div>

    <!-- Frame Display -->
    <div class="static flex flex-row items-center place-content-around min-w-[300px] w-fit h-4/5 rounded-md border-red-500 border-2 p-1 text-white custom-background">
        <div v-if="!editMode" class="mr-1">
            i{{ displayMove.frame }}
        </div>
        <div v-if="editMode" class="mr-1">
            i<input type="number" v-model="editMove.frame" class="w-12 px-1 py-0 text-sm text-white bg-transparent border border-red-500 rounded-sm">
        </div>

        <div v-if="!editMode" class="border-l border-red-500 mx-2 pl-2 py-1">
            Hit: {{ displayMove.frameHit }}
        </div>
        <div v-if="editMode" class="border-l border-red-500 mx-2 pl-2 py-1">
            Hit: <input type="number" v-model="editMove.frameHit" class="w-12 px-1 py-0 text-sm text-white bg-transparent border border-red-500 rounded-sm">
        </div>

        <div v-if="!editMode" class="border-l border-red-500 mx-2 pl-2 py-1">
            Block: {{ displayMove.frameBlock }}
        </div>
        <div v-if="editMode" class="border-l border-red-500 mx-2 pl-2 py-1">
            Block: <input type="number" v-model="editMove.frameBlock" class="w-12 px-1 py-0 text-sm text-white bg-transparent border border-red-500 rounded-sm">
        </div>

        <div v-if="!editMode" class="border-l border-red-500 mx-2 pl-2 py-1">
            Counter: {{ displayMove.frameCounter }}
        </div>
        <div v-if="editMode" class="border-l border-red-500 mx-2 pl-2 py-1">
            Counter: <input type="number" v-model="editMove.frameCounter" class="w-12 px-1 py-0 text-sm text-white bg-transparent border border-red-500 rounded-sm">
        </div>
    </div>
</template>

<style>
    .custom-background {
        background-color: #22232A;
    }
</style>