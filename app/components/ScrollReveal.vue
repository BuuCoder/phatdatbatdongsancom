<template>
  <div ref="el" :class="['transition-all duration-700', visible ? enterClass : initialClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  initialClass?: string
  enterClass?: string
}>()

const el = ref<HTMLElement | null>(null)
const visible = ref(false)

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.1 })

  if (el.value) observer.observe(el.value)
})

onUnmounted(() => observer?.disconnect())
</script>
