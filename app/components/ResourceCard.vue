<template>
    <div class="card overflow-hidden flex flex-col">
        <div class="relative h-40">
            <img :src="image" :alt="title" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="p-5 flex-1 flex flex-col">
            <h5 class="font-semibold text-lg">{{ title }}</h5>
            <p class="text-mute text-sm mt-1 flex-1">{{ text }}</p>
            <button class="btn btn-dark mt-4 w-max">{{ cta }}</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    text: String,
    cta: String,
    image: String
})
</script>
