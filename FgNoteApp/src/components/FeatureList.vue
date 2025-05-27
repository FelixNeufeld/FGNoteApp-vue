<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const fileList = ref(["test1", "test2", "test3", "test4", "test5", "test6", "test7"]);
    const fileListActive = ref(false);

    //TODO: Load Filelist depending on feature
    function activateFileList(feature: string) {
        fileListActive.value = true;
    }

    function deactivateFileList() {
        fileListActive.value = false;
    }

    //TODO: Make dynamic
    function goToCreateRoute() {
        router.push({ name: 'new', params: { character: "Alica" } });
    }

    //TODO: Make dynamic
    function goToNoteView() {
        router.push({ name: 'noteView', params: { id: "1" } });
    }
</script>

<template>
    <div class="flex flex-row">
        <div class="w-fit h-55 p-2 mr-4 flex flex-col rounded-md place-content-between custom-background">
            <div @click="goToCreateRoute()" class="rounded-md p-1 hover:bg-yellow-400 cursor-pointer">
                <p class="text-red-500 text-xl">Create Note</p>
            </div>
            <div @click="activateFileList('my')" class="rounded-md p-1 hover:bg-yellow-400 cursor-pointer">
                <p class="text-red-500 text-xl">My Notes</p>
            </div>
            <div @click="activateFileList('browse')" class="rounded-md p-1 hover:bg-yellow-400 cursor-pointer">
                <p class="text-red-500 text-xl">Browse Notes</p>
            </div>
        </div>
        <div class="w-150 h-55 p-3 rounded-md custom-background overflow-scroll">
            <div v-if="fileListActive">
                <div @click="goToNoteView" v-for="file in fileList" class="rounded-md p-2 hover:bg-yellow-500">
                    <p class="text-red-500 text-xl">{{ file }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }   
</style>