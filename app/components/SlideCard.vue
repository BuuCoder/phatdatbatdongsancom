<template>
    <div class="card overflow-hidden group shadow-none">
        <div class="relative h-48">
            <img :src="item.img" :alt="item.title"
                class="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.02] transition" />
        </div>
        <div class="p-4">
            <h5 class="font-semibold text-lg">{{ item.title }}</h5>
            <p class="text-mute text-xs mt-1">{{ item.address }}</p>
            <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-mute">{{ item.beds }}</span>
                <span class="text-sm font-semibold">{{ item.price }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    item: { type: Object, required: true }
})
</script>
