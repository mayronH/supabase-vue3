<script setup lang="ts">
import { PropType } from 'vue'
import { Smoothie } from '../types'

defineProps({
  smoothie: {
    type: Object as PropType<Smoothie>,
    required: true,
  },
})
</script>

<template>
  <div class="smoothie">
    <span class="badge">{{ smoothie.rating }}</span>

    <h3>{{ smoothie.title }}</h3>
    {{ smoothie.method }}
    <RouterLink
      :to="{ name: 'Update', params: { id: smoothie.id } }"
      class="btn"
      >🥤 Edit</RouterLink
    >
  </div>
</template>

<style scoped>
.smoothie {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--extra-small-size-fluid);

  text-align: justify;

  background-color: hsl(var(--bg-medium));

  padding: var(--small-size-fluid);

  box-shadow: var(--box-shadow);
}

.badge {
  position: absolute;
  top: 0;
  right: 0;

  transform: translateY(-50%) translateX(50%);

  background-color: hsl(var(--accent2));

  padding: var(--extra-small-size-fluid) var(--small-size-fluid);
}

.btn {
  text-decoration: none;
  color: hsl(var(--white));

  display: flex;
  align-items: center;

  width: max-content;

  background-color: hsl(var(--accent3));

  padding: var(--extra-small-size-fluid) var(--small-size-fluid);
}
</style>
