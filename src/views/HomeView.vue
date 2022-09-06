<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'
import { Smoothie } from '../types'
import SmoothieCard from '../components/SmoothieCard.vue'

const fetchError = ref()
const smoothies = ref<Array<Smoothie> | null>(null)

const fetchSmoothies = async () => {
  // Fetch all data from 'smoothies' table
  const { data, error } = await supabase.from('smoothies').select().order('id')

  if (error) {
    fetchError.value = 'Could not fetch the smoothies'
    smoothies.value = null
    console.log(error)
    return
  }
  if (data) {
    smoothies.value = data
    fetchError.value = null
  }
}

onMounted(() => {
  fetchSmoothies()
})
</script>
<template>
  <main class="content">
    <div v-if="fetchError" class="error">
      <p>{{ fetchError }}</p>
    </div>
    <div v-else class="smoothies">
      <SmoothieCard
        v-for="smoothie in smoothies"
        :key="smoothie.id"
        :smoothie="smoothie"
      ></SmoothieCard>
    </div>
  </main>
</template>

<style scoped>
.smoothies {
  display: flex;
  flex-direction: column;
  gap: var(--medium-size-fluid);

  margin: var(--medium-size-fluid) 0;

  width: 100%;
}
@media only screen and (min-width: 768px) {
  .smoothies {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
