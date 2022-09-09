<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { supabase } from '../lib/supabase'
import { Smoothie } from '../types'
import SmoothieCard from '../components/SmoothieCard.vue'

const fetchError = ref()
const orderBy = ref('id')
const ascending = ref(false)
const smoothies = ref<Array<Smoothie> | null | undefined>(null)

const fetchSmoothies = async () => {
  // Fetch all data from 'smoothies' table
  const { data, error } = await supabase
    .from('smoothies')
    .select()
    .order(orderBy.value, { ascending: ascending.value })

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

function setOrderBy(order: string) {
  if (orderBy.value === order) {
    ascending.value = !ascending.value
  }
  orderBy.value = order
}

onMounted(() => {
  fetchSmoothies()
})

watch(orderBy, async () => {
  await fetchSmoothies()
})

watch(ascending, async () => {
  await fetchSmoothies()
})

async function deleteSmoothie(id: string) {
  const { data, error } = await supabase.from('smoothies').delete().eq('id', id)

  if (error) {
    console.log(error)
    return
  }
  if (data) {
    smoothies.value = smoothies.value?.filter((smoothie) => {
      if (smoothie.id !== data[0].id) return smoothie
    })
  }
}
</script>
<template>
  <main class="content">
    <div class="order-by">
      <p>Order by:</p>
      <button type="button" @click="setOrderBy('created_at')">
        Time Created
      </button>
      <button type="button" @click="setOrderBy('title')">Title</button>
      <button type="button" @click="setOrderBy('rating')">Rating</button>
    </div>

    <div v-if="fetchError" class="error">
      <p>{{ fetchError }}</p>
    </div>

    <div v-else class="smoothies">
      <SmoothieCard
        v-for="smoothie in smoothies"
        :key="smoothie.id"
        :smoothie="smoothie"
        @delete-smoothie="deleteSmoothie"
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
.order-by {
  text-align: center;
}
.order-by button {
  background-color: hsl(var(--bg-medium));

  color: hsl(var(--accent));

  cursor: pointer;

  padding: var(--extra-small-size-fluid);

  margin: 0 var(--extra-small-size-fluid);

  border: none;
}
@media only screen and (min-width: 768px) {
  .smoothies {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
