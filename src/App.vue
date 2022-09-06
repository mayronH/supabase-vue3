<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />
  <RouterView />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
}

main.content {
  flex: 1;

  width: 100%;

  display: grid;
  place-items: center;

  padding-block: var(--small-size-fluid);
  padding-inline: var(--medium-size-fluid);
}

.form {
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

.form button {
  background-color: hsl(var(--accent3));

  border: none;
  border-radius: var(--border-radius);

  padding: var(--small-size-fluid) var(--extra-small-size-fluid);
}

@media only screen and (min-width: 768px) {
  .form {
    align-items: flex-end;

    max-width: 560px;
  }
  .form-input {
    width: 100%;
  }
  .form button {
    width: fit-content;
  }
}
</style>
