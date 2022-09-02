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

    <form @submit.prevent="handleFormSubmit">
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

<style scoped>
form {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: var(--small-size-fluid);
}
.form-input {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  caret-color: hsl(var(--accent));
  color: hsl(var(--accent));

  background-color: hsl(var(--bg-lighter));

  padding: var(--extra-small-size-fluid);

  border: none;
  border-radius: 2px;

  width: 100%;
}

button {
  background-color: hsl(var(--accent3));

  border: none;
  border-radius: var(--border-radius);

  padding: var(--small-size-fluid) var(--extra-small-size-fluid);
}

@media only screen and (min-width: 768px) {
  form {
    align-items: flex-end;

    max-width: 560px;
  }
  .form-input {
    width: 100%;
  }
  button {
    width: fit-content;
  }
}
</style>
