<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { Smoothie } from '../types'

const smoothie = ref<Smoothie | null>(null)
const route = useRoute()
const smoothieId = computed(() => route.params.id)

async function fetchSmoothie() {
  const { data, error } = await supabase
    .from('smoothies')
    .select()
    .eq('id', smoothieId.value)
    .single()

  if (error) {
    fetchError.value = 'Could not fetch the smoothies'
    smoothie.value = null
    console.log(error)
    return
  }
  if (data) {
    smoothie.value = data
    fetchError.value = null
  }
}
onMounted(() => {
  fetchSmoothie()
})

const router = useRouter()
const fetchError = ref()
const formError = ref()
async function handleFormSubmit() {
  if (smoothie.value === null) {
    return
  }
  if (smoothie.value.title === '' || smoothie.value.method === '') {
    formError.value = 'Please fill all fields'
    return
  }

  const { data, error } = await supabase
    .from('smoothies')
    .update([
      {
        title: smoothie.value.title,
        method: smoothie.value.method,
        rating: smoothie.value.rating,
      },
    ])
    .eq('id', smoothieId.value)
  // In Supabase v2 the API doesn't return the record, we need to pass .select() at the end to retrieve the record to the data const

  if (error) {
    console.log(error)
    formError.value = 'Something went wrong, try again later'
  }

  if (data) {
    console.log(data)
    formError.value = null

    router.push('/')
  }
}
</script>

<template>
  <main v-if="smoothie" class="content">
    <h2>Edit Smoothie</h2>

    <p v-if="formError" class="error">{{ formError }}</p>

    <form class="form" @submit.prevent="handleFormSubmit">
      <div class="form-input">
        <label for="title">Title</label>
        <input id="title" v-model="smoothie.title" type="text" />
      </div>

      <div class="form-input">
        <label for="method">Method</label>
        <textarea id="method" v-model="smoothie.method"></textarea>
      </div>

      <div class="form-input">
        <label for="rating">Rating</label>
        <input id="rating" v-model="smoothie.rating" type="number" max="10" />
      </div>

      <button type="submit">save 🥤</button>
    </form>
  </main>
  <main v-else class="content error">
    <p>{{ fetchError }}</p>
    <RouterLink to="/">Return to HomePage</RouterLink>
  </main>
</template>

<style scoped></style>
