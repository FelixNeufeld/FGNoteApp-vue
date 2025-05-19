<script setup lang="ts">
    import { ref } from "vue";

    const fileList = ref(["test1", "test2", "test3", "test4", "test5", "test6", "test7"]);
</script>

<template>
    <div class="w-70 h-55 p-3 rounded-md custom-background overflow-scroll">
        <div v-for="file in fileList" class="rounded-md p-2 hover:bg-yellow-500">
            <p class="text-red-500 text-xl">{{ file }}</p>
        </div>
    </div>
</template>

<style>
    .custom-background{
        background-color: #22232A;
    }
</style>