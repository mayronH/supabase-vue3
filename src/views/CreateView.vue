<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { Smoothie } from '../types'

const smoothie = ref<Smoothie>({
  id: '',
  title: '',
  method: '',
  rating: 0,
})

const formError = ref()

const router = useRouter()

async function handleFormSubmit() {
  if (smoothie.value.title === '' || smoothie.value.method === '') {
    formError.value = 'Please fill all fields'
    return
  }

  const { data, error } = await supabase.from('smoothies').insert([
    {
      title: smoothie.value.title,
      method: smoothie.value.method,
      rating: smoothie.value.rating,
    },
  ])

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
  <main class="content">
    <h2>Create New Smoothie</h2>

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

      <button type="submit">create 🥤</button>
    </form>
  </main>
</template>

<style scoped></style>
