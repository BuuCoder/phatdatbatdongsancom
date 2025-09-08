<template>
  <div class="block relative">
    <Listbox v-model="selectedValue" as="div" class="w-full">
      <ListboxLabel class="block text-xs text-mute mb-1">{{ label }}</ListboxLabel>

      <!-- Button -->
      <ListboxButton
        class="h-12 w-full rounded-xl2 bg-white border border-black/10 px-4 text-left
               focus:outline-none focus:ring-2 focus:ring-accent/40 flex items-center justify-between"
      >
        <span class="truncate">{{ selectedValue }}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" class="ml-3 shrink-0 opacity-70">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </ListboxButton>

      <!-- Options -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <ListboxOptions
          class="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl2 bg-white
                 py-1 text-sm shadow-soft ring-1 ring-black/5 focus:outline-none"
        >
          <ListboxOption
            v-for="opt in options"
            :key="opt"
            :value="opt"
            as="li"
            v-slot="{ active, selected }"
            class="relative cursor-default select-none py-2 pl-10 pr-4
                   data-[headlessui-state=active]:bg-accent/10
                   data-[headlessui-state=active]:text-black"
            :class="selected ? 'font-semibold' : 'font-normal'"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3" v-if="selected">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
            <span class="block truncate">{{ opt }}</span>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel
} from '@headlessui/vue'

const props = defineProps<{
  label: string
  options: string[]
  modelValue: string
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

// v-model bridge
const selectedValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})
</script>
